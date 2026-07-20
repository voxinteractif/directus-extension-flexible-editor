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

### vox.1 — Fork bootstrap (no functional change)

- `package.json`: renamed to `@voxinteractif/directus-extension-flexible-editor`,
  version `1.8.4-vox.1`, repository URL updated, `publishConfig` →
  GitHub Packages. Interface/display ids (`flexible-editor-interface`,
  `flexible-editor-display`) and all option keys are UNCHANGED — existing
  fields migrate with zero schema or content changes.
- Added this `PATCHES.md`.

