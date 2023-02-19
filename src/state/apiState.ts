import {storage} from "../storage";

type ApiValidation = "success" | "failed" | "no_validation";

export class ApiState {
    constructor(public queryUrl: string | null, public validation: ApiValidation, public isValidating: boolean) {
    }
}

export const apiState = new ApiState(storage.getQueryUrl(), "no_validation", false);