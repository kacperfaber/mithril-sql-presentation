import {SqlConsoleState} from "../../state/SqlConsoleState";
import {redraw, Vnode} from "mithril";
import m from "mithril/hyperscript";

export type SchemaButtonPreset = {text: string, query: string, schema: string};

export function schemaButtonFor(tState: SqlConsoleState, text: string, query: string, schema: string) {
    function clicked() {
        tState.query = query;
        tState.schema = schema;
        redraw();
    }
    return m("button.btn.btn-secondary.schema-preset", {onclick: clicked}, text);
}

export function schemaButtonsFrom(tState: SqlConsoleState, preset: Array<SchemaButtonPreset>): Vnode {
    return m("div", preset.map(x => schemaButtonFor(tState, x.text, x.query, x.schema)))
}