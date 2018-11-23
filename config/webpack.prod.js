const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const path = require('path');
const buildPath = path.resolve(__dirname, '../build');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = merge(baseConfig, {
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'initial'
                }
            }
        }
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new CleanWebpackPlugin('../build'),
        // 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，
        // 防止引用缓存的外部文件问题
        new HtmlWebPackPlugin({
            title: "my-vue",
            template: "./examples/reactive/index.html", // 使用某个页面当模板来用，不设置插件会使用默认模板
            filename: "index.html",
            hash: true, // 会在打包好的bundle.js后面加上hash串
            isDev: true
        })
        // 配置多页面
        // new HtmlWebPackPlugin({
        //     title: "my-vue-mvvm",
        //     template: "index.ejs", // 使用某个页面当模板来用，不设置插件会使用默认模板
        //     filename: "mvvm.html",
        //     chunks: ["mvvm"]
        // }),
    ]
})
