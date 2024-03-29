import {layout} from "../layout";
import {SqlBasics} from "../chapter-basics/SqlBasics";
import {History} from "../chapter-history/History";
import {SqlUsage} from "../chapter-usage/SqlUsage";
import {SqlFetch} from "../sqlFetch/SqlFetch";
import {WhereClause} from "../whereClause/WhereClause";
import {GroupBy} from "../groupBy/GroupBy";
import {Presentation_Ending} from "./Presentation_Ending";
import {Presentation_Heading} from "./Presentation_Heading";

export const Presentation = function () {
    return {
        view: () => layout.free(
            <>
                <Presentation_Heading/>
                <div id="presentation-container" className="container animate-in" style="background-color: #222;">
                    <SqlBasics/>
                    <History/>
                    <SqlUsage/>
                    <SqlFetch/>
                    <WhereClause/>
                    <GroupBy/>
                </div>
                <Presentation_Ending/>
            </>
        )
    }
}