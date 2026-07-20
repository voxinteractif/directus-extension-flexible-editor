// VOX fork: central registry for house editor styles (PATCHES.md vox.2).
//
// One entry here = one tool in every editor (tools default to the full
// registry; narrow per field via the standard Tools option). The visual
// meaning of each key lives in the consuming site's stylesheet — the
// frontend renderer emits `prose-style--<key>` / `prose-callout--<variant>`
// classes. Constrained lists by design: free-form class input is forbidden
// (a class without site CSS is invisible and unstylable fleet-wide).

export interface EditorStyleEntry {
    /** Stable token stored in content JSON. Never rename — content references it. */
    key: string;
    /** Toolbar label (plain string — upstream custom messages are not locale-switched). */
    label: string;
}

/** Inline text styles — applied via the `styledSpan` mark. */
export const INLINE_STYLES: EditorStyleEntry[] = [
    { key: "lead", label: "Lead" },
    { key: "fine-print", label: "Fine print" },
    { key: "highlight", label: "Highlight" },
];

/** Block decoratives — applied via the `callout` node. */
export const BLOCK_VARIANTS: EditorStyleEntry[] = [
    { key: "info", label: "Callout — Info" },
    { key: "warning", label: "Callout — Warning" },
    { key: "pull-quote", label: "Pull quote" },
];
