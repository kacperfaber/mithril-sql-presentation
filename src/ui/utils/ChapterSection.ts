import {Vnode} from "mithril";
import m from "mithril/hyperscript";

function defaultHeader(text: string): Vnode {
    return m("h3.chapter-section-header", text);
}

export function chapterSection(node: Vnode, header: string | Vnode, id: string | null): Vnode {
    const headerElement = typeof header == "string" ? defaultHeader(header) : header;
    return m(id != null ? `div#${id}.chapter-section` : "div.chapter-section", {}, [headerElement, node]);
}