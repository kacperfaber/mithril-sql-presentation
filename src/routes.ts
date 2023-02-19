import {Welcome} from "./ui/welcome/Welcome";
import {SqlBasics} from "./ui/chapter-basics/SqlBasics";
import {ApiOptions} from "./ui/apiOptions/ApiOptions";
import {History} from "./ui/chapter-history/History";

export const Routes = {
    "/welcome": Welcome,
    "/sql-basics": SqlBasics,
    "/api-options": ApiOptions,
    "/history":History
}