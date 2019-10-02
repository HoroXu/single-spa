const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  // entry: "./src/index.js",
  entry: "./single-spa.config.js",
  output: {
    filename: "[name].bundle-[hash].js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  devServer: {
    contentBase: "./dist",
    hot: true,
    disableHostCheck: true,
    inline: true,
    port: 8080,
    proxy: {
      "/": {
        target: "http://47.100.245.81:80", //pre环境
        secure: true,
        changeOrigin: true
      }
    },
    stats: {
      entrypoints: false,
      children: false,
      colors: true,
      env: true,
      performance: true
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          comments: true
        }
        // sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    runtimeChunk: {
      name: "manifest"
    }
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader?cacheDirectory"
        },
        exclude: /node_modules/,
        // include: path.resolve(__dirname, "src") // 精确指定要处理的目录
      },
      {
        test: /\.(sa|sc|le)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer"),
                autoprefixer({
                  flexbox: "no-2009"
                })
              ],
              javascriptEnabled: true
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000, //这里要足够大这样所有的字体图标都会打包到css中
            name: "images/[name].[ext]"
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "/src"),
      react: path.resolve("./node_modules/react")
    }
  }
};
