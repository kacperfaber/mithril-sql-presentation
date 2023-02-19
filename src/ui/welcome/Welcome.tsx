import {layout} from "../layout";

export const Welcome = function () {
    return {view: () => layout.free(<h1>Hello World!</h1>)}
}