import {Vnode} from "mithril";
import {Navbar} from "./navbar/Navbar";
import m from "mithril/hyperscript"

export class Layout {
    free(node: Vnode): Vnode {
        return m("div#view", m(Navbar), node);
    }
}