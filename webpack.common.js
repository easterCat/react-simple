/**
 * Created by easterCat on 2017/10/30.
 */
const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "Monika"),
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")]
  },
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "pine_dist"), //打包的文件夹
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"],
            plugins: [require("babel-plugin-transform-object-rest-spread")]
          }
        }
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "images/[name].[ext]"
            }
          },
          {
            loader: "image-webpack-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: false
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: "./Monika", //为一个目录下的文件提供本地服务器，在这里设置其所在目录
    historyApiFallback: true, //跳转将指向index.html
    port: 3333 //设置监听端口3333
  }
};
