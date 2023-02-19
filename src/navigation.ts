import route from "mithril/route";

export class Navigation {
    apiOptions() {
        route.set("/api-options");
    }
}

export const navigation = new Navigation();