/**
 * Created by easterCat on 2017/10/30.
 */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(['style-loader', 'css-loader']),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }]
                })
            },
            {
                test: /index\.html/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name (file) {
                            return '[name].[ext]'
                        }
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true, // don't contain embedded styles
        }),
        //加入js压缩的实例
        new UglifyJsPlugin({
            mangle: {
                mangle: false
            },
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: false,
                if_return: true,
                join_vars: true,
                drop_console: false,
                warnings: false
            },
        }),
        new CleanWebpackPlugin(['dist', 'dist.zip', 'dist.rar']),
    ],
});