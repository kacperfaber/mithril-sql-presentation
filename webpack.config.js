//webpack.config.js
const path = require('path');
const webpack = require("webpack");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new webpack.ProvidePlugin({
            m: "mithril",
        }),
    ],
    entry: {
        main: "./src/main.ts",
    },
    output: {
        path: path.resolve(__dirname, './www/dist/js'),
        filename: "app-bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "babel-loader"
            }
        ]
    }
};