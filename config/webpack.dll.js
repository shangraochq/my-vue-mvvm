const path = require('path');
const webpack = require('webpack');
module.exports = {
    // 多入口打包，打包成多个文件，适合用在非SPA的多页面场景
    entry: {
        thirdBundle: ["vue"]
        // mvvm: "./src/mvvm.js"
    },
    // 写成数组的方式就可以打包多入口文件，不过打包后的文件会合成了一个
    // entry: [
    //     "./src/index.js", "./src/mvvm.js"
    // ],
    // dev情况下由于devServer帮我们把文件放到内存中了，
    // 所以并不会输出打包后的build文件夹
    output: {
        // [name] 就可以将出口文件名和入口文件名一一对应
        filename: "dll/[name].[hash:8].dll.js",
        path: path.join(__dirname, '../build') // 打包后的目录，必须是绝对路径
    },
    mode: 'production',
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../build/dll', '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        })
    ]
}

