import {request, Vnode} from "mithril";
import {SqlConsoleState} from "../../state/SqlConsoleState";
import {apiState} from "../../state/apiState";
import m from "mithril/hyperscript";
import {api, QueryResponse, Result} from "../../api/Api";
import {redraw} from "mithril";

export const SqlConsole = function (v: Vnode) {
    return {
        view: () => (
            <>{renderSqlConsole(v.attrs.state)}</>
        )
    }
}

function getSchemaTextAreaId(state: SqlConsoleState): string {
    return "schema-" + state.id;
}

function getQueryTextAreaId(state: SqlConsoleState): string {
    return "query-" + state.id;
}

function readQuery(state: SqlConsoleState): string {
    return (document.getElementById(getQueryTextAreaId(state)) as HTMLInputElement).value;
}

function readSchema(state: SqlConsoleState): string {
    return (document.getElementById(getSchemaTextAreaId(state)) as HTMLInputElement).value;
}

function renderExecuteButton(state: SqlConsoleState): Vnode {
    function executeSuccess(qr: QueryResponse) {
        state.isWorking = false;
        state.result = qr;
        redraw();
    }

    function executeQueryButtonClicked() {
        state.isWorking = true;
        let schema = readSchema(state);
        let query = readQuery(state);
        state.query = query;
        state.schema = schema;
        api.query(schema, query, executeSuccess, () => alert("err"));
        redraw();
    }

    if (state.isWorking) {
        return m("button.btn.btn-secondary", {disabled: true}, m("div.spinner-border", {
            role: "status",
            style: {width: "10px", height: "10px"}
        }));
    } else {
        return m("button.btn.btn-success", {onclick: executeQueryButtonClicked}, [m("i.icon-ok"), m("Wykonaj")]);
    }
}


function renderTable(result: Result): Vnode {
    function renderHeadersList() {
        return result.headers.map((x) => m("th", x));
    }

    function renderThead() {
        return m("thead", renderHeadersList());
    }

    function renderRow(row: Array<String>) {
        return m("tr", row.map(x => m("td", x)))
    }

    function renderRows() {
        return result.rows.map(r => renderRow(r));
    }

    function renderTbody() {
        return m("tbody", renderRows());
    }

    return (<table className="table-dark table table-striped">
        {renderThead()}
        {renderTbody()}
    </table>)
}

function renderResetButton(state: SqlConsoleState) {
    function resetButtonClicked() {
        state.result = null;
    }

    if (state.withResetButton) {
        return m("button.btn.btn-danger", {onclick: resetButtonClicked}, "Wyczyść");
    }
    return (<></>)
}

function renderResult(state: SqlConsoleState): Vnode {
    if (state.result == null) {
        return (<h3>Brak rezultatów</h3>)
    }
    return m("div.container", m("div.row", state.result.map(x => m("div.col", renderTable(x)))));
}

function renderSchemaTextArea(state: SqlConsoleState) {
    let schemaTextAreaId = getSchemaTextAreaId(state);
    return (<>
        <div className="form-group">
            <label htmlFor={schemaTextAreaId}>Schemat: </label>
            {textAreaFor(schemaTextAreaId, "3", state.schema)}
        </div>
        <br></br>{state.schemaButtons}</>)
}

function textAreaFor(id: string, rows: string, value: string | null): Vnode {
    if (value == null) {
        return (<textarea className="form-control" id={id} rows={rows}/>);
    }

    return (<textarea className="form-control" id={id} rows={rows} value={value}/>);
}

function renderQueryTextArea(state: SqlConsoleState) {
    let queryTextAreaId = getQueryTextAreaId(state);
    return (<div>
        <div className="form-group">
            <label htmlFor={queryTextAreaId}>Zapytanie: </label>
            {textAreaFor(queryTextAreaId, "3", state.query)}
        </div>
        <br></br>{renderExecuteButton(state)}{renderResetButton(state)}</div>)
}

function renderConsole(state: SqlConsoleState) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    {renderSchemaTextArea(state)}
                </div>

                <div className="col-6">
                    {renderQueryTextArea(state)}
                </div>
            </div>

            <div className="row">
                {renderResult(state)}
            </div>
        </div>
    )
}

function renderSqlConsole(state: SqlConsoleState): Vnode {
    if (apiState.queryUrl != null && apiState.validation != "failed") {
        return renderConsole(state);
    }
    return renderApiDisabled();
}

function renderApiDisabled(): Vnode {
    return (<h4 className="text-red">Do użycia konsoli wymagane jest połączenie z API.</h4>);
}