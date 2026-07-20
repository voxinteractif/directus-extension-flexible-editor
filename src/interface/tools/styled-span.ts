// VOX fork (PATCHES.md vox.2): inline house styles via a single `styledSpan`
// mark with a constrained `style` attribute from the styles registry.
// Serializes as `<span data-style="…">`; the site renderer maps it to
// `prose-style--<key>` classes.

import { StyledSpan } from "../../../shared/vox-styles";
import { defineTool } from "../lib";
import type { Editor } from "@tiptap/core";
import type { EditorStyleEntry } from "../styles-registry";

export default (entry: EditorStyleEntry) =>
    defineTool({
        key: `style-${entry.key}`,
        name: entry.label,
        display: entry.label,
        extension: [StyledSpan],
        groups: ["format"],
        action: (editor: Editor) =>
            editor
                .chain()
                .focus()
                .toggleMark("styledSpan", { style: entry.key })
                .run(),
        disabled: (editor: Editor) =>
            !editor
                .can()
                .chain()
                .focus()
                .toggleMark("styledSpan", { style: entry.key })
                .run(),
        active: (editor: Editor) =>
            editor.isActive("styledSpan", { style: entry.key }),
    });
