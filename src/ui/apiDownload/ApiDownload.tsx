import {layout} from "../layout";

export const ApiDownload = function () {
    return {
        view: () => layout.free(
            <>
                <h1>Download PHP API</h1>
                <p>Read the docs before you install it...</p>
                <a className="btn btn-link" href="https://drive.google.com/drive/folders/12JpRt_BjRs9XEiaMWhrekR8g0IzvRtvj?usp=sharing">Download</a>
                <a className="btn btn-link" href="https://github.com/kacperfaber/mitrhil-sql-presentation/blob/master/api/api.txt">Documentation</a>
            </>
        )
    }
}