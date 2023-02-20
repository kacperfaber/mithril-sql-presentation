import {Welcome} from "./ui/welcome/Welcome";
import {SqlBasics} from "./ui/chapter-basics/SqlBasics";
import {ApiOptions} from "./ui/apiOptions/ApiOptions";
import {History} from "./ui/chapter-history/History";
import {ApiDownload} from "./ui/apiDownload/ApiDownload";
import {Presentation} from "./ui/presentation/Presentation";

export const Routes = {
    "/welcome": Welcome,
    "/sql-basics": SqlBasics,
    "/api-options": ApiOptions,
    "/history":History,
    "/api-download": ApiDownload,
    "/presentation": Presentation
}