import route from "mithril/route"
import {Routes} from "./routes";
import {ApiSettings} from "./api/ApiSettings";

ApiSettings.startValidation(() => {}, () => {});
// ApiSettings.runLiveValidations(10, () => {}, () => {});

route(document.body, "/presentation", Routes)