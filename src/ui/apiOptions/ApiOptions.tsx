import {layout} from "../layout";
import {Vnode} from "mithril";
import {apiState} from "../../state/apiState";
import {apiOptionsState} from "../../state/apiOptionsState";
import m from "mithril/hyperscript";
import {apiSettings} from "../../api/ApiSettings";
import {redraw} from "mithril"
import {ApiOptions_ApiState} from "./ApiOptions_ApiState";

export const ApiOptions = function () {
    return {
        view: () => layout.free((
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="form">
                            <div className="form-group">
                                <label className="form-label" htmlFor="apiOptions_queryUrl">Adres API: </label>
                                {queryUrlInput()}
                            </div>

                            {saveButton()}

                            <ApiOptions_ApiState/>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }
}

function queryUrlInput(): Vnode {
    return m("input[type=text]#apiOptions_queryUrl.form-control", {value: apiState.queryUrl});
}

function saveButton(): Vnode {
    function validationSuccess() {
        apiOptionsState.validation = "validation_ok";
        redraw();
    }

    function validationFailed() {
        apiOptionsState.validation = "validation_failed";
        redraw();
    }

    function saveButtonClicked() {
        const newUrl = (document.getElementById("apiOptions_queryUrl") as HTMLInputElement).value;
        apiOptionsState.validation = "pending_validation";
        redraw();
        apiSettings.updateQueryUrl(newUrl, validationSuccess, validationFailed);
    }

    switch (apiOptionsState.validation) {
        case "none":
            return m("button.btn.btn-primary", {onclick: saveButtonClicked}, m("i.icon-ok"), "ZAPISZ");
        case "pending_validation":
            return m("button.btn.btn-primary", {disabled: true}, [
                (<div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>), "ZAPISZ"]);

        case "validation_failed":
            return m("button.btn.btn-danger", {onclick: saveButtonClicked}, "ZAPISZ");

        case "validation_ok":
            return m("button.btn.btn-success", {onclick: saveButtonClicked}, "ZAPISZ");
    }

}