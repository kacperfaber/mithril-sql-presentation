import {layout} from "../layout";
import {SqlBasics} from "../chapter-basics/SqlBasics";
import {History} from "../chapter-history/History";
import {SqlUsage} from "../chapter-usage/SqlUsage";
import {SqlFetch} from "../sqlFetch/SqlFetch";

export const Presentation = function () {
    return {
        view: () => layout.free(
            <>
                <div className="container">
                    <SqlBasics/>
                    <History/>
                    <SqlUsage/>
                    <SqlFetch/>
                </div>
            </>
        )
    }
}