/**
 * Created by easterCat on 2017/10/30.
 */
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              outputStyle: "expanded",
              sourceMapContents: true
            }
          }
        ]
      },
      {
        test: /index\.html/,
        use: [
          {
            loader: "file-loader",
            options: {
              name(file) {
                return "index.[ext]";
              }
            }
          }
        ]
      }
    ]
  }
});
