import {storage} from "../storage";
import {api} from "./Api";
import {apiState} from "../state/apiState";
import {redraw} from "mithril/redraw"

export class ApiSettings {
    private static validationSuccess(success: () => void) {
        apiState.validation = "success";
        apiState.isValidating = true;
        success();
        redraw();
    }

    private static validationFailed(failed: () => void) {
        apiState.validation = "failed";
        apiState.isValidating = false;
        failed();
        redraw();
    }

    private static startValidation(success: () => void, failed: () => void){
        apiState.isValidating = true;
        apiState.validation = "no_validation";
        redraw();

        api.testApi(() => ApiSettings.validationSuccess(success), () => ApiSettings.validationFailed(failed));
    }

    private static updateQueryUrlInState(url: string) {
        apiState.queryUrl = url;
        apiState.validation = "no_validation";
    }

    updateQueryUrl(url: string, success: () => void, failed: () => void) {
        storage.saveQueryUrl(url);
        ApiSettings.updateQueryUrlInState(url);
        ApiSettings.startValidation(success, failed);
    }
}

export const apiSettings = new ApiSettings();