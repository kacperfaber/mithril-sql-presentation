import route from "mithril/route"
import {Routes} from "./routes";
import {ApiSettings} from "./api/ApiSettings";

ApiSettings.startValidation(() => {}, () => {});

route(document.body, "/welcome", Routes)