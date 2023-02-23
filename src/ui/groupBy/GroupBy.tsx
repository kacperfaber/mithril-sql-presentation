import {chapter} from "../utils/ChapterSection";
import {SchemaButtonPreset, schemaButtonsFrom} from "../sqlConsole/SchemaButtons";
import {SqlConsoleState} from "../../state/SqlConsoleState";
import m from "mithril/hyperscript";
import {SqlConsole} from "../sqlConsole/SqlConsole";

const presets: Array<SchemaButtonPreset> = [
    {
        query: "SELECT COUNT(ID) FROM kot GROUP BY COL;",
        schema: "CREATE TABLE kot(ID INT PRIMARY KEY, COL TEXT); INSERT INTO kot(ID, COL) VALUES(1, 'RUDY'); INSERT INTO kot(ID, COL) VALUES(2, 'RUDY'); INSERT INTO kot(ID, COL) VALUES(4, 'BLOND'); INSERT INTO kot(ID, COL) VALUES(3, 'BLOND')",
        text: "Koty/Kolor"
    }
];

const groupBy_SqlConsoleState: SqlConsoleState = {
    withResetButton: false,
    id: "groupby",
    query: "",
    schema: "",
    result: null,
    isWorking: false,
    schemaButtons: m("div"),
    isActive: false
}

groupBy_SqlConsoleState.schemaButtons = schemaButtonsFrom(groupBy_SqlConsoleState, presets);

export const GroupBy = function () {
    return {
        view: () => chapter(<><p>GROUP BY to klauzula języka SQL, która służy do grupowania wierszy zwróconych przez
                zapytanie SELECT na podstawie jednej lub kilku kolumn. Używa się jej, aby obliczyć wartości grupowe, takie
                jak suma, średnia lub liczba wierszy w każdej grupie.</p>

                <p>Załóżmy, że mamy tabelę "orders" z danymi dotyczącymi zamówień, w tym nazwisko klienta, datę zamówienia i
                    kwotę zamówienia. Aby wyświetlić sumę zamówień dla każdego klienta, możemy użyć zapytania SQL z klauzulą
                    GROUP: <br/><br/><strong>SELECT customer_name, SUM(order_amount)<br/>
                        FROM orders<br/>
                        GROUP BY customer_name;<br/></strong></p>
            <p>Klauzula GROUP BY może być użyta z innymi klauzulami, takimi jak HAVING i ORDER BY, aby dodać filtry lub uporządkować wyniki. Na przykład, można dodać HAVING, aby wyświetlić tylko nazwiska klientów, którzy złożyli zamówienia o wartości większej niż 1000, w ten sposób:</p>
            <SqlConsole state={groupBy_SqlConsoleState}/>
            </>,
            "Co to jest GROUP BY?"
        )
    }
}