import {request} from "mithril/request"
import {apiState} from "../state/apiState";

type QueryResponse = { headers: Array<string>, rows: Array<Array<String>> }

export class Api {
    query(schema: string, query: string, success: (r: QueryResponse) => void, failed: () => void) {
        if (apiState.queryUrl == null) {
            failed();
            return;
        }

        request({method: "GET", url: apiState.queryUrl})
            .then((r) => success(r as QueryResponse))
            .catch(failed);
    }

    testApi(success: () => void, failed: () => void) {
        this.query(
            "CREATE TABLE user(ID INT AUTO_INCREMENT PRIMARY KEY); INSERT INTO user(ID) VALUES(5);",
            "SELECT * FROM user;",
            success,
            failed);
    }
}

export const api = new Api();