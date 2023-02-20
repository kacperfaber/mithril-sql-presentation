import {chapter, chapterSection} from "../utils/ChapterSection";
import {Vnode} from "mithril";

export const SqlUsage = function () {
    return {
        view: () => chapter((
            (<>{section_zastosowanie()}</>)
        ), "Zastosowanie języka SQL")
    }
}

function section_zastosowanie(): Vnode {
    return chapterSection((<>
        <p>SQL znajduje szerokie zastosowanie na stronach
            internetowych, jest w zasadzie najbardziej domyślną formą zapisywania danych w postaci
            relacyjnej. W tabelach relacyjnej bazy danych wykorzystując SQL można zapisać np. <ul>
                <li>Liste użytkowników</li>
                <li>Liste zamówień na sklepie internetowym</li>

                <li>Stan magazynowy produktów</li>
                <li>Zarządzanie firmą poprzez dane pracowników, historie wynagrodzeń</li>
            </ul>
        </p>
        <p>Z bardziej natywnych rzeczy, możemy wspomnieć że SQL w sposób kompletny pozwala zarządzać bazą danych.
            Poprzez: <ul>
                <li>Wysyłanie rekordów</li>
                <li>Tworzenie raportów</li>
                <li>Usuwanie danych</li>
                <li>Tworzenie baz danych</li>
                <li>Zarządzanie istniejącymi bazami danych</li>
                <li>Zarządzanie ustawieniami bazy, użytkownikami etc...</li>
            </ul></p>
    </>), "Zastosowanie na stronach", "section-zastosowanie-sql-na-stronach")
}