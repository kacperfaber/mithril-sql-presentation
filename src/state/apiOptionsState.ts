export class ApiOptionsState {
    validation: ApiOptionsState_Validation = "none";
}

export type ApiOptionsState_Validation = "pending_validation" | "validation_ok" | "validation_failed" | "none";

export const apiOptionsState = new ApiOptionsState();

