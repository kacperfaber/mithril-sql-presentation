import route from "mithril/route";

export class Navigation {
    apiOptions() {
        route.set("/api-options");
    }

    apiDownload() {
        route.set("/api-download");
    }
}

export const navigation = new Navigation();