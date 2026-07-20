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

### vox.5 — Link tools hidden by default (SUPERSEDES vox.4 — do not deploy vox.4)

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

### vox.4 — Remove link tools (house links come from component_link)

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

