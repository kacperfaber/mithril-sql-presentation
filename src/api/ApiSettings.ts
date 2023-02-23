import {storage} from "../storage";
import {api, ErrorResponse} from "./Api";
import {apiState} from "../state/apiState";
import {redraw} from "mithril"

export class ApiSettings {
    private static validationSuccess(success: () => void) {
        apiState.validation = "success";
        apiState.isValidating = false;
        success();
        redraw();
    }

    private static validationFailed(error: ErrorResponse | null, failed: (error: ErrorResponse | null) => void) {
        apiState.validation = "failed";
        apiState.isValidating = false;
        failed(error);
        redraw();
    }

    public static startValidation(success: () => void, failed: (e: ErrorResponse | null) => void) {
        apiState.isValidating = true;
        apiState.validation = "no_validation";
        redraw();

        api.testApi(() => ApiSettings.validationSuccess(success), (e: ErrorResponse | null) => ApiSettings.validationFailed(e, failed));
    }

    public static runLiveValidations(seconds: number, success: () => void, failed: () => void) {
        setInterval(() => {
            ApiSettings.startValidation(success, failed);
        }, seconds * 1000);
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