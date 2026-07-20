// VOX fork (PATCHES.md vox.2): block decoratives via a single `callout` node
// with a constrained `variant` attribute from the styles registry.
// Serializes as `<aside data-variant="…">`; the site renderer maps it to
// `prose-callout prose-callout--<variant>` classes.

import { Callout } from "../../../shared/vox-styles";
import { defineTool } from "../lib";
import type { Editor } from "@tiptap/core";
import type { EditorStyleEntry } from "../styles-registry";

export default (entry: EditorStyleEntry) =>
    defineTool({
        key: `callout-${entry.key}`,
        name: entry.label,
        display: entry.label,
        extension: [Callout],
        groups: ["format"],
        action: (editor: Editor) =>
            editor
                .chain()
                .focus()
                .toggleWrap("callout", { variant: entry.key })
                .run(),
        disabled: (editor: Editor) =>
            !editor
                .can()
                .chain()
                .focus()
                .toggleWrap("callout", { variant: entry.key })
                .run(),
        active: (editor: Editor) =>
            editor.isActive("callout", { variant: entry.key }),
    });
