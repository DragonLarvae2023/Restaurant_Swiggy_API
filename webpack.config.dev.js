const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "http://localhost:1234/",
  },
  devServer: {
    port: 1234,
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    devMiddleware: {
      index: "index.html",
     writeToDisk:true,
    },
  },
  mode: "development",
  optimization:{
    splitChunks:{
      chunks:'all',
      minSize:3000,
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude:path.resolve(__dirname,"node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        ],
      },
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:"index.html",
      title:'Restaturant App',
      description:"this app uses swiggy api to get the realtime data "
    }),
    new CleanWebpackPlugin({
      cleanBeforeEveryBuildPatterns:[path.resolve(process.cwd(),'dist/**/*')]
    })
  ]
};
