const path = require('path');
module.exports = {
    // 多入口打包，打包成多个文件，适合用在非SPA的多页面场景
    entry: {
        index: "./examples/reactive/index.js"
        // mvvm: "./src/mvvm.js"
    },
    // 写成数组的方式就可以打包多入口文件，不过打包后的文件会合成了一个
    // entry: [
    //     "./src/index.js", "./src/mvvm.js"
    // ],
    output: {
        // [name] 就可以将出口文件名和入口文件名一一对应
        filename: "js/[name].[hash:8].js",
        chunkFilename: "js/[name].[hash:8].js",
        path: path.join(__dirname, '../build') // 打包后的目录，必须是绝对路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: ['url-loader'],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    limit: 10000 // 小于10K的图片自动转成base64格式，并且不会存在实体图片
                }
            }
        ]
    },
    resolve: {
        // 引入时不需要带后缀
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
        // 配置别名
        alias: {
        }
    },
}

