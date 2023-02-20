import {layout} from "../layout";
import {SqlBasics} from "../chapter-basics/SqlBasics";
import {History} from "../chapter-history/History";

export const Presentation = function () {
    return {
        view: () => layout.free(
            <>
                <div className="container">
                    <SqlBasics/>
                    <History/>
                </div>
            </>
        )
    }
}