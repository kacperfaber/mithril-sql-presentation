import {Vnode} from "mithril";
import m from "mithril/hyperscript";

function defaultChapterSectionHeader(text: string): Vnode {
    return m("h3.chapter-section-header", text);
}

export function chapterSection(node: Vnode, header: string | Vnode, id: string | null): Vnode {
    const headerElement = typeof header == "string" ? defaultChapterSectionHeader(header) : header;
    return m(id != null ? `div#${id}.chapter-section` : "div.chapter-section", {}, [headerElement, node]);
}

function defaultChapterHeader(text: string): Vnode {
    return m("h1.chapter-header", text);
}

function getChapterHeader(header: string | null | Vnode): Vnode {
    if (header == null) {
        return m("div")
    }
    switch (typeof header) {
        case "string":
            return defaultChapterHeader(header);
    }
    return header;
}

export function chapter(vnode: Vnode, header: string | null | Vnode): Vnode {
    return m("div.row", m("div.col-10.offset-1", m("div.chapter", getChapterHeader(header), vnode)));
}