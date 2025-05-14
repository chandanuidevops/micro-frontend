const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
dotenv.config()
module.exports = {
    entry: "./src/index.js",
    mode: "development",
    devServer: {
        port: process.env.PORT,
        static: "./dist",
        liveReload: true,
    },
    output: {
        publicPath: "auto",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "container",
            filename: "remoteEntry.js", // optional in container
            remotes: {
                app1: `app1@${process.env.APP1_URL}`,
            },
            shared: {
                react: { singleton: true, requiredVersion: "18.2.0" },
                "react-dom": { singleton: true, requiredVersion: "18.2.0" },
            },
        }),

        ,
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
    ],
};
