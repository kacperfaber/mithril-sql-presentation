import {SqlConsole} from "../sqlConsole/SqlConsole";
import {chapter} from "../utils/ChapterSection";
import {SchemaButtonPreset, schemaButtonsFrom} from "../sqlConsole/SchemaButtons";
import {SqlConsoleState} from "../../state/SqlConsoleState";
import m from "mithril/hyperscript";

const presets: Array<SchemaButtonPreset> = [
    {
        query: "SELECT * FROM user;",
        schema: "CREATE TABLE user(ID INT PRIMARY KEY, NAME TEXT); INSERT INTO user(ID, NAME) VALUES(1, 'Kacper'); INSERT INTO user(ID, NAME) VALUES(2, 'Kacper#2');",
        text: "Lista userów"
    },
    {
        query: "SELECT * FROM kot WHERE TRUE;",
        schema: "CREATE TABLE kot(ID INT PRIMARY KEY, NAME TEXT); INSERT INTO kot(ID, NAME) VALUES(1, 'Puszek'); INSERT INTO kot(ID, NAME) VALUES(2, 'Mruczek'); INSERT INTO kot(ID, NAME) VALUES(3, 'Kot we butach'); INSERT INTO kot(ID, NAME) VALUES(4, 'Sofia'); INSERT INTO kot(ID, NAME) VALUES(5, 'Klara');",
        text: "Koty"
    }
];

const sqlFetch_SqlConsoleState: SqlConsoleState = {
    withResetButton: true,
    id: "sql-fetch",
    query: "SELECT * FROM user;",
    schema: "CREATE TABLE USER(ID INT PRIMARY KEY, NAME TEXT); INSERT INTO USER(ID, NAME) VALUES(1, 'Kacper');",
    result: null,
    isWorking: false,
    schemaButtons: m("div"),
    isActive: false
}

sqlFetch_SqlConsoleState.schemaButtons = schemaButtons();

function schemaButtons() {
    return schemaButtonsFrom(sqlFetch_SqlConsoleState, presets);
}

export const SqlFetch = function () {
    return {
        view: () => chapter((
            <>
                <p>Pobieranie danych z bazy jest możliwe głównie poprzez polecenie <strong>select</strong> (ang.
                    Wybierz).</p>
                <p>Pozwala ono wybrać dane z wybranych przez nas kolumn i nieco je zmodyfikować</p>
                <p><strong>SQL nie wybiera tylko danych</strong>, pozwala na wykonanie operacji na pobranych danych
                    <ul>
                        <li>
                            Działania na liczbach:
                            <ul>
                                <li>SUM - służy do sumowania wartości numerycznych w kolumnie. Dla przykładu, zapytanie
                                    "SELECT SUM(quantity) FROM orders" zwróci sumę wartości w kolumnie "quantity" tabeli
                                    "orders".
                                </li>
                                <li>AVG - służy do obliczania średniej arytmetycznej wartości numerycznych w kolumnie.
                                    Dla przykładu, zapytanie "SELECT AVG(price) FROM products" zwróci średnią wartość w
                                    kolumnie "price" tabeli "products".
                                </li>
                                <li>MAX - służy do znajdowania największej wartości w kolumnie. Dla przykładu, zapytanie
                                    "SELECT MAX(price) FROM products" zwróci największą wartość w kolumnie "price"
                                    tabeli "products".
                                </li>
                                <li>MIN - służy do znajdowania najmniejszej wartości w kolumnie. Dla przykładu,
                                    zapytanie "SELECT MIN(price) FROM products" zwróci najmniejszą wartość w kolumnie
                                    "price" tabeli "products".
                                </li>
                                <li>COUNT DISTINCT - służy do zliczania unikalnych wartości w kolumnie. Dla przykładu,
                                    zapytanie "SELECT COUNT(DISTINCT category) FROM products" zwróci liczbę unikalnych
                                    wartości w kolumnie "category" tabeli "products".
                                </li>
                            </ul>
                        </li>
                    </ul>
                </p>
                <p>
                    <h5>Przykład polecenia <strong>SELECT</strong></h5>
                    <p>
                        <SqlConsole state={sqlFetch_SqlConsoleState}/>
                    </p>
                </p>
            </>), "Pobieranie danych z bazy")
    }
}