import {layout} from "../layout";
import {Vnode} from "mithril";
import {chapterSection} from "../utils/ChapterSection";

export const SqlBasics = function () {
    return {
        view: () => layout.free(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-10 offset-1">
                        <h1 className="chapter-header">Podstawy języka SQL</h1>

                        {section_coToJestDoCzegoSluzy()}

                        {section_kategorieSql()}
                    </div>
                </div>
            </div>
        )
    }
}

function section_kategorieSql(): Vnode {
    const element = (<>
            <h5>DDL - Data Defintion Language</h5>
            <p>Komendy powiązane z tworzeniem struktury bazy danych</p>
            <h5>DML - Data Modification Language</h5>
            <p>Zarządzanie danymi</p>
            <h5>DCL - Data Control Language</h5>
            <p>Zarządzanie uprawnieniami, użytkownikami etc.</p>
            <h5>TCL - ang. Transaction Control Language</h5>
            <p>Obsługa transakcji danych</p>
            <h5>DQL - ang. Data Querying Language</h5>
            <p>Pobieranie danych np. poprzez SELECT</p></>
    )
    return chapterSection(element, "Język SQL, a raczej polecenia w nim zostały pogrupowane na: ", "section-kategorie-sql");
}

function section_coToJestDoCzegoSluzy(): Vnode {
    const element = (<>
        <p>SQL - ang. Structured Query Language czyli strukturalny język zapytań to język służący do
            porozumiewania się z bazą danych
            <ul>
                <li>Tworzenie baz danych</li>
                <li>Tworzenie tabel</li>
                <li>Wysyłanie/Zapisywanie rekordów</li>
                <li>Pobieranie danych</li>
                <li>Zarządzanie użytkownikami bazy danych</li>
            </ul>
        </p>
    </>)
    return chapterSection(element, "Co to jest SQL i do czego służy?", "section-co-to-jest-do-czego-sluzy");
}