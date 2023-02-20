import {QueryResponse} from "../api/Api";

export class SqlConsoleState {
    query: string = "";
    schema: string = "";
    result: QueryResponse | null = null;
    id: string = "";
    isWorking: boolean = false;
    withResetButton: boolean = false;
}