import {Vnode} from "mithril";
import {apiState} from "../../state/apiState";
import {navigation} from "../../navigation";
import m from "mithril/hyperscript";

export const Navbar_ApiState = function () {
    return {
        view: () => (<div>
            {renderLabel()}
            {renderCurrentStatus()}
            {renderSettingsButton()}
        </div>)
    }
}

function renderSettingsButton() {
    function navigateToOptions() {
        navigation.apiOptions();
    }

    return m("button.btn", {onclick: navigateToOptions}, m("i.icon-cog"));
}

function renderCurrentStatus() {
    if (apiState.queryUrl == null) return renderNoUrl();
    if (apiState.isValidating) return renderPendingValidation();
    switch (apiState.validation) {
        case "failed":
            return renderTestFailed();
        case "success":
            return renderOk();
        case "no_validation":
            return renderNoValidation();
    }
}

function renderNoValidation() {
    return (<span className="text-red">Nie zweryfikowano</span>)
}

function renderLabel() {
    return (<span>Status API: </span>);
}

function renderOk(): Vnode {
    return (<span className="text-green">OK</span>);
}

function renderTestFailed(): Vnode {
    return (<span className="text-red">Testy negatywne</span>);
}

function renderNoUrl(): Vnode {
    return (<span className="text-red">Brak API</span>);
}

function renderPendingValidation(): Vnode {
    return (<div style="height: 15px; width: 15px;" class="spinner-border" role="status"/>);
}