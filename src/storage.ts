export class Storage {
    queryUrlKey: string = "_query"

    getQueryUrl(): string | null {
        return window.localStorage.getItem(this.queryUrlKey)
    }

    saveQueryUrl(queryUrl: string) {
        window.localStorage.setItem(this.queryUrlKey, queryUrl);
    }

    removeQueryUrl() {
        window.localStorage.removeItem(this.queryUrlKey);
    }
}

export const storage = new Storage();