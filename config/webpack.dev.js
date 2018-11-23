const HtmlWebPackPlugin = require("html-webpack-plugin");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
module.exports = merge(baseConfig, {
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    // style-loader将css文件是以行内样式style的标签写进打包后的html页面中
                    'style-loader',
                    'css-loader', // 将css模块处理成webpack的模块
                    'postcss-loader', // 为样式属性添加浏览器前缀
                ]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader', // Adds CSS to the DOM by injecting a <style> tag
                    'css-loader', // 将css模块处理成webpack的模块
                    'postcss-loader', // 为样式属性添加浏览器前缀
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        host: 'localhost', // 默认是localhost
        port: 3000, // 端口
        open: false, // 自动打开浏览器
        hot: true, // 开启热更新
        stats: 'minimal',
        // inline: true // 当监听到文件变动时，刷新浏览器页面
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        // 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，
        // 防止引用缓存的外部文件问题
        new HtmlWebPackPlugin({
            title: "my-vue",
            template: "./examples/reactive/index.html", // 使用某个页面当模板来用，不设置插件会使用默认模板
            filename: "index.html",
            hash: true, // 会在打包好的bundle.js后面加上hash串
            isDev: true
        })
    ]
})

// dev情况下由于devServer帮我们把文件放到内存中了，
// 所以并不会输出打包后的build文件夹

