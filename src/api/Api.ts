import {request} from "mithril/request"
import {apiState} from "../state/apiState";

export type QueryResponse = Array<Result>;
export type Result = { headers: Array<string>, rows: Array<Array<String>> };
export type ErrorResponse = {err: string}

export class Api {
    query(schema: string, query: string, success: (r: QueryResponse) => void, failed: (e: ErrorResponse | null) => void) {
        if (apiState.queryUrl == null) {
            failed(null);
            return;
        }

        request({headers: {"Content-Type": "application/json"}, body: {query: query, schema: schema}, method: "POST", url: apiState.queryUrl})
            .then((response: any) => {
                if (response.ise) {
                    failed(response as ErrorResponse);
                }

                else {
                    success(response as QueryResponse);
                }
            })
            .catch(() => failed(null));
    }

    testApi(success: () => void, failed: (e: ErrorResponse | null) => void) {
        this.query(
            "CREATE TABLE x(ID INT PRIMARY KEY); INSERT INTO x(ID) VALUES(5);",
            "SELECT * FROM x;",
            success,
            failed);
    }
}

export const api = new Api();