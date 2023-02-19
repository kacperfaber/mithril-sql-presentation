import {apiState} from "../../state/apiState";
import {Vnode} from "mithril";

export const ApiOptions_ApiState = function () {
    return {
        view: () => (
            <div>
                {renderLabel()}
                {renderCurrentState()}
            </div>
        )
    }
}

function renderLabel(): Vnode {
    return <span>Status API: </span>
}

function renderCurrentState(): Vnode {
    if (apiState.isValidating) {
        return ((<div style="height: 25px; width: 25px;" class="spinner-border" role="status"/>))
    } else if (apiState.validation == "success") {
        return <span className="text-green">OK</span>
    } else if (apiState.validation == "failed") {
        return <span className="text-red">Weryfikacja przebiegła negatywnie</span>
    } else if (apiState.validation == "no_validation") {
        return <span>Brak weryfikacji</span>
    }
    return <span>Nothing to show...</span>
}