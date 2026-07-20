// VOX fork (PATCHES.md vox.2): the two house style primitives, defined in
// /shared so both the interface (src/) and the rendering surfaces (content/,
// src/display) can register them — /src is not part of the published package.
//
// - `styledSpan` mark: inline house styles, constrained `style` attribute.
//   Serializes as `<span data-style="…">`.
// - `callout` node: block decoratives, constrained `variant` attribute.
//   Serializes as `<aside data-variant="…">`.
//
// The attribute VALUES come from src/interface/styles-registry.ts (toolbar)
// and are mapped to site CSS classes by the consuming frontend renderer.

import { Mark, Node, mergeAttributes } from "@tiptap/core";

export const StyledSpan = Mark.create({
    name: "styledSpan",

    addAttributes() {
        return {
            style: {
                default: null,
                parseHTML: (element: HTMLElement) =>
                    element.getAttribute("data-style"),
                renderHTML: (attributes: Record<string, any>) =>
                    attributes.style ? { "data-style": attributes.style } : {},
            },
        };
    },

    parseHTML() {
        return [{ tag: "span[data-style]" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["span", mergeAttributes(HTMLAttributes), 0];
    },
});

export const Callout = Node.create({
    name: "callout",
    group: "block",
    content: "block+",
    defining: true,

    addAttributes() {
        return {
            variant: {
                default: "info",
                parseHTML: (element: HTMLElement) =>
                    element.getAttribute("data-variant"),
                renderHTML: (attributes: Record<string, any>) => ({
                    "data-variant": attributes.variant,
                }),
            },
        };
    },

    parseHTML() {
        return [{ tag: "aside[data-variant]" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["aside", mergeAttributes(HTMLAttributes), 0];
    },
});
