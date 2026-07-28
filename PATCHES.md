# PATCHES — Vox Interactif fork divergence manifest

Fork of [formfcw/directus-extension-flexible-editor](https://github.com/formfcw/directus-extension-flexible-editor)
at upstream tag `v1.8.4`. License stays **GPL-3.0**; upstream author notices
are preserved. Versioning: `1.8.4-vox.N` (upstream base + fork revision).

Discipline (mirrors the voxinteractif/directus core fork): every divergence
from upstream is listed here, one entry per patch, newest first. Upstream
fixes are cherry-picked deliberately — upstream tracks newer Directus hosts
while this fork serves the frozen `11.17.2-vox` line.

**Boundary rule:** this repo never imports from, and is never imported by,
`directus-vox-bundle` (GPL/proprietary separation). Interaction happens only
through the Directus extension runtime.

## Patches

### vox.6 — Fix blank Interface tab; link tools back on by default

Two changes, unrelated to each other.

**1. Upstream bug: `options()` throws, blanking the whole Interface tab.**

- `src/interface/index.ts`, `getRelatedAnyCollections()`: the guard
  `if (!relationNodesValues.length) return;` dereferences the result of a
  `.find()`, which is `undefined` when no relation on the m2a field has a
  non-empty `one_allowed_collections`. The `TypeError` escapes `options()`,
  so the App cannot build the options form and the **entire Interface tab of
  the field detail drawer renders blank** — no interface picker, no options,
  nothing. Fixed by optional-chaining the guard (`relationNodesValues?.length`),
  matching every other "not configured" branch in that function: return early
  and simply omit the relation-node options.
- Trigger: a field with `meta.options.m2aField` pointing at an m2a alias whose
  relation has `one_allowed_collections = null`. Verified on the finfo
  instance, where all 19 `editor_nodes` relations are in that state. Dormant
  until a provisioner hook began writing `m2aField` onto fields — the crash
  needs `m2aField` set AND the allowed-collections list empty.
- **Untouched upstream code** (`git diff 0cee9fb..HEAD` never included this
  file). Reported upstream as well; keep this patch until it lands there.

**2. Link tools are default-ON again — REVERTS the vox.5/vox.4 default.**

- `src/interface/tools/index.ts`: `interfaceOptionsDefault` is back to the
  upstream form — every optional tool, `link` / `removeLink` / `autolink`
  included. The `HIDDEN_BY_DEFAULT` list is gone.
- Why the vox.4/vox.5 premise was wrong: `component_link` resolves **internal**
  targets. It has never covered external URLs, `mailto:`, or in-page anchors.
  So hiding the link tools did not steer operators toward the house pattern —
  it deleted a capability with no replacement, on every site, house ones
  included.
- Why not per-field re-enabling instead: writing an explicit `tools` array
  **freezes** that field's toolset — tools added by later fork revisions (the
  vox.2 styles, anything after) never appear on it, and every newly created
  field starts from the default again. Under vox.5 that cost fell on the site
  with a functional need and recurred forever; a site is 40+ fields. Under
  vox.6 it falls only on sites choosing to enforce a stylistic preference.
- The house preference for `component_link` stands as **guidance, not a
  toolbar lockout**. A site that wants it enforced sets `tools` explicitly per
  field, accepting the freeze knowingly.
- `src/interface/interface.vue`: vox.5's conditional base-Link registration is
  **kept** and now carries a comment explaining its narrowed role — it fires
  only for fields that opted out explicitly (including any field patched during
  the vox.4/vox.5 window), keeping their existing links intact through edits.
- Content safety: no content migration either way. Documents keep their `link`
  marks regardless of toolset, and the Vox frontend renderer registers Link
  independently.

### vox.5 — Link tools hidden by default (SUPERSEDED BY vox.6 — default reverted)

- vox.4 removed the link tools from the registry outright; that force-strips
  link authoring from every field fleet-wide, including legacy sites whose
  fields explicitly enable them. Corrected approach:
- `src/interface/tools/index.ts`: all three link tools (`link`,
  `removeLink`, `autolink`) restored as-is; they are only excluded from
  `interfaceOptionsDefault` — hidden on every field that uses the default
  toolset, still listed in the Tools option so legacy sites re-enable per
  field with full behavior.
- `src/interface/interface.vue`: when a field's toolset excludes the link
  tools, the Link mark is registered as a base extension
  (`openOnClick: false, autolink: false`) so legacy content keeps its links
  intact through edits; fields WITH link tools get the tool-configured Link
  (no double registration).

### vox.4 — Remove link tools (SUPERSEDED — do not deploy; see vox.5, then vox.6)

- `src/interface/tools/index.ts`: the three link tools (`add`, `remove`,
  `auto`) are removed from the registry — raw editor links confuse operators
  when the house pattern is the `component_link` inline component (resolved
  targets, per-language URLs, variants). They also disappear from the Tools
  option list.
- `src/interface/interface.vue`: the Link mark stays registered as a BASE
  extension (`openOnClick: false, autolink: false`) so legacy content keeps
  its links intact through edits and continues to render — there is simply no
  UI to author new ones.

### vox.3 — Toolbar: guard optional shortcut in the Formats dropdown

- `src/interface/components/Toolbar.vue`: `tool.shortcut` is optional per the
  Tool type, but the Formats dropdown called `translateShortcut(tool.shortcut)`
  unconditionally (`keys.map` on undefined) — opening the dropdown crashed the
  field for any format-group tool without a shortcut. Latent upstream bug
  exposed by the vox.2 style tools (which deliberately ship no shortcuts).
  Fixed with `v-if="tool.shortcut?.length"` on the hint.

### vox.2 — House style primitives (styledSpan mark + callout node)

- `shared/vox-styles.ts`: two TipTap extensions — `styledSpan` mark
  (inline, `data-style` attr) and `callout` node (block, `data-variant`
  attr, `content: block+`). Defined in `/shared` so the display and the
  published `/content` subpath render them too (registered in
  `shared/extensions.ts`).
- `src/interface/styles-registry.ts`: the constrained style lists (inline:
  lead / fine-print / highlight; block: info / warning / pull-quote). One
  entry = one toolbar tool everywhere; narrow per field via the standard
  Tools option. Free-form class input is deliberately not offered.
- `src/interface/tools/styled-span.ts` + `callout.ts`: tool factories
  (`groups: ["format"]` → they appear in the native Formats dropdown).
  Registered in `src/interface/tools/index.ts`.
- `src/interface/interface.vue`: approximate admin preview styles on
  Directus theme variables; site CSS owns the real visuals
  (`prose-style--<key>` / `prose-callout--<variant>` classes emitted by the
  Vox frontend renderer).
- Adding a future style = one registry entry (+ site CSS). Keys are stored
  in content JSON — never rename existing keys.

### vox.1 — Fork bootstrap (no functional change)

- `package.json`: renamed to `@voxinteractif/directus-extension-flexible-editor`,
  version `1.8.4-vox.1`, repository URL updated, `publishConfig` →
  GitHub Packages. Interface/display ids (`flexible-editor-interface`,
  `flexible-editor-display`) and all option keys are UNCHANGED — existing
  fields migrate with zero schema or content changes.
- Added this `PATCHES.md`.

