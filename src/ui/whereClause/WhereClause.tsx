import {chapter} from "../utils/ChapterSection";
import {SchemaButtonPreset, schemaButtonsFrom} from "../sqlConsole/SchemaButtons";
import {SqlConsoleState} from "../../state/SqlConsoleState";
import m from "mithril/hyperscript";
import {SqlConsole} from "../sqlConsole/SqlConsole";

const presets: Array<SchemaButtonPreset> = [
    {
        query: "SELECT * FROM u WHERE age > 18;",
        schema: "CREATE TABLE u(ID INT PRIMARY KEY, NAME TEXT, AGE INT); INSERT INTO u(ID, NAME, AGE) VALUES(0, 'Kacper', 20); INSERT INTO u(ID, NAME, AGE) VALUES(0, 'Mateusz', 15); INSERT INTO u(ID, NAME, AGE) VALUES(3, 'Oskar', 13); INSERT INTO u(ID, NAME, AGE) VALUES(2, 'Karolina', 17);",
        text: "Pełnoletni użytkownicy"
    },
    {
        query: "SELECT * FROM kot WHERE NAME IS NOT NULL;",
        schema: "CREATE TABLE kot(ID INT PRIMARY KEY, NAME TEXT); INSERT INTO kot(ID, NAME) VALUES(1, 'Puszek'); INSERT INTO kot(ID, NAME) VALUES(2, NULL); INSERT INTO kot(ID, NAME) VALUES(3, 'Kot we butach')",
        text: "Podane imie / OR NULL"
    }
];
const whereClause_SqlConsoleState: SqlConsoleState = {
    withResetButton: false,
    id: "where",
    query: "SELECT * FROM user WHERE age > 18;",
    schema: "CREATE TABLE user(ID INT PRIMARY KEY, NAME TEXT, AGE INT); INSERT INTO user(ID, NAME, TEXT) VALUES(0, 'Kacper', 20); INSERT INTO user(ID, NAME, TEXT) VALUES(0, 'Mateusz', 15);",
    result: null,
    isWorking: false,
    schemaButtons: m("div"),
    isActive: false
}

whereClause_SqlConsoleState.schemaButtons = schemaButtonsFrom(whereClause_SqlConsoleState, presets);

export const WhereClause = function () {
    return {
        view: () => chapter(<>
            <p>
                WHERE to klauzula języka SQL, która pozwala na określenie warunków, jakie muszą być spełnione przez
                wiersze zwracane przez zapytanie SELECT.</p>
            <p>
                Można użyć WHERE, aby filtrować wyniki zapytania i wyświetlać tylko te wiersze, które spełniają
                określone kryteria. Na przykład, jeśli chcesz wyświetlić tylko wiersze z tabeli, które mają wartość w
                kolumnie 'name' równą 'Kacper', wpiszesz "SELECT * FROM user WHERE name = 'Kacper'";
            </p>
            <p>WHERE jest często używane wraz z innymi klauzulami, takimi jak ORDER BY lub GROUP BY, aby uporządkować i
                ograniczyć wyniki zapytania.</p>
            <br></br>
            <h3>Przyklady: </h3>
            <SqlConsole state={whereClause_SqlConsoleState}/>
        </>, "Klauzula WHERE")
    }
}