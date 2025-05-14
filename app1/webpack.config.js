
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
        // hot: false,               // ✅ Enables hot reloading
        liveReload: true,        // ✅ Enables live reload fallback
        // open: true,              // optional: auto open browser
        // historyApiFallback: true
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"), // 👈 THIS IS CRITICAL
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
            name: "app1",
            filename: "remoteEntry.js",
            exposes: {
                "./App": "./src/App",
            },
            shared: {
                react: { singleton: true, requiredVersion: "18.2.0" },
                "react-dom": { singleton: true, requiredVersion: "18.2.0" },
            },
        }),

        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env),
        }),
    ],
};
