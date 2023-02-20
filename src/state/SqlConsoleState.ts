import {QueryResponse} from "../api/Api";
import {Vnode} from "mithril";
import m from "mithril/hyperscript";

export class SqlConsoleState {
    query: string = "";
    schema: string = "";
    result: QueryResponse | null = null;
    id: string = "";
    isWorking: boolean = false;
    withResetButton: boolean = false;
    schemaButtons: Vnode = m("div");
    isActive: boolean = false;
}