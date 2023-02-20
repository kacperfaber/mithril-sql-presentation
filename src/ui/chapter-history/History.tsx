import {Vnode} from "mithril";
import {chapter, chapterSection} from "../utils/ChapterSection";

/* TODO przyszlosc jezyka */

export const History = function () {
    return {
        view: () => chapter((<>
            {section_sequel()}
            {section_dialekty()}
        </>), "Historia języka SQL")
    }
}

function section_sequel(): Vnode {
    return chapterSection((
        <><p>Pierwszym oficjalnym językiem baz danych byl <strong>SEQUEL</strong> (ang. Structured English Query
            Language
            powstały w latach 70-tych. Wykorzystano go w pierwszym silniku bazodanowym nazywanym SYSTEM-R.
            SEQUEL był przyjazny dla użytkownika, był to w sumie bardzo logiczny język angielski.
        </p><p>Po pewnym czasie okazało się jednak że nazwa SEQUEL była wcześniej zarejestrowaną firmą, dlatego nazwa
            została zmieniona na SQL.</p></>), "SEQUEL", "section-sequel")
}

function section_dialekty(): Vnode {
    return chapterSection((
        <><p>W 1986r. powstał pierwszy uznany dialekt opracowany przez ANSI nazywany <strong>SQL:86</strong>
            Jednak pomimo istnienia różnych dialektów, podstawowe funkcje są spójne i różnice są zauważalne dopiero na
            wyższym poziomie zaawansowania.</p>
            <p>Reszta dialektów to np. <ul>
                <li>Transact-SQL (T-SQL)</li>
                <li>PL/SQL</li>
                <li>MySQL</li>
                <li>SQL/PSM</li>
                <li>SQL-92</li>
                <li>SQL:1999</li>
                <li>SQL:2003</li>
            </ul></p>
        </>), "Pierwsze dialekty języka", "section-historyczne-dialekty");
}