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

