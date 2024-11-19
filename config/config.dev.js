const defaultConfig = require("./config.default.js");
const { merge } = require("webpack-merge");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const path = require('path')

module.exports = merge(defaultConfig, {
  mode: 'development',
  devtool: "source-map",
  output: { publicPath: "/demo" },
  module: {
    rules: [
      {
        test: /\.less/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // 启用CSS Modules
              esModule: false, // 强制使用 ES6 模块导出
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  optimization: {
    chunkIds: "deterministic",
    splitChunks: {
      chunks: "all",
      maxAsyncRequests: Infinity, // 确保所有动态加载模块都被考虑进来
      maxInitialRequests: Infinity,
      //   minChunks: 1, // 至少被一个 chunk 引用
      //   enforceSizeThreshold: 1,
      //   minSize: 200,
      //   automaticNameDelimiter: "~",
      cacheGroups: {
        // add: {
        //   test: /\/add/,
        //   chunks: "all",
        //   minSize: 1,
        //   name: "add",
        //   reuseExistingChunk: true,
        //   enforce: true,
        // },
        // sub: {
        //   test: /\/sub/,
        //   chunks: "all",
        //   minSize: 1,
        //   name: "sub",
        //   reuseExistingChunk: true,
        //   enforce: true,
        // },
        // default: {
        //   priority: 222,
        //   automaticNameDelimiter: "~",
        //   reuseExistingChunk: true,
        //   enforce: true,
        // },
      },
    },
    minimize: false,
  },

  plugins: [
    new CompressionWebpackPlugin({
      test: /\.js|css/,
      algorithm: "gzip",
      minRatio: 0.5,
    }),
  ],

  devServer: {
    host: "0.0.0.0",
    port: "8081",
    open: '/demo', // 自动打开浏览器
    compress: true, //压缩文件 gzip压缩、
    static: [{
      directory: path.resolve(__dirname,'../public'),
      publicPath: '/demo/public'
    }]
  },
});
