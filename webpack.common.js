/**
 * Created by easterCat on 2017/10/30.
 */
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    entry: ["babel-polyfill", "./index.js"],
    output: {
        path: path.resolve(__dirname, 'dist'), //打包的文件夹
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]
                    }
                }
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[name].[ext]'
                    }
                }, {
                    loader: 'image-webpack-loader'
                }]
            },
        ]
    },
    devServer: {
        contentBase: './dist',//为一个目录下的文件提供本地服务器，在这里设置其所在目录
        historyApiFallback: true,//跳转将指向index.html
        // inline: true,//开启自动刷新页面
        port: 1323,//设置监听端口1323
        //hot: true,//开启热替换
    },
};