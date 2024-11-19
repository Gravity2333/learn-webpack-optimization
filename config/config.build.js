const defaultConfig = require("./config.default.js");
const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractWebpackPlugin = require("mini-css-extract-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(defaultConfig, {
  mode: "production",
  output: {
    publicPath: "/demo",
    // library: {
    //   type: "module",
    // },
  },

  // experiments: {
  //   // use esModule
  //   outputModule: true,
  // },

  module: {
    rules: [
      {
        test: /\.less/,
        use: [
          MiniCssExtractWebpackPlugin.loader,
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
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: true,
        parallel: true,
      }),
      new CssMinimizerWebpackPlugin({
        parallel: true,
      }),
    ],
    usedExports: true,
  },

  plugins: [
    ...process.env.ANALYZE == "1" ? [new BundleAnalyzerPlugin()] : [],
    /** 处理gzip http压缩 */
    new CompressionWebpackPlugin({
      test: /\.js|css/,
      algorithm: "gzip",
      minRatio: 0.5,
      threshold: 100, // 设置压缩的文件大小阈值
      minRatio: 0.8, // 设置最小压缩比
      deleteOriginalAssets: false, // 不删除原始文件，只生成压缩文件
    }),
    /** 拷贝文件 */
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public",
          to: "./public",
        },
      ],
    }),
    /** mini css */
    new MiniCssExtractWebpackPlugin({
      filename: "css/[name]-[contenthash:8].css",
      chunkFilename: "css/[name]-[id].css",
    }),
  ],
});
