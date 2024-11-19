const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractWebpackPlugin = require("mini-css-extract-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

console.log(process.env.NODE_ENV);

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "./"),
  entry: {
    index: {
      import: "./src/index.ts",
      runtime: "common-runtime",
    },
    // main: {
    //   import: "./src/main.ts",
    //   runtime: "common-runtime",
    // },
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle-[name]-[id].js",
    chunkFilename: "chunk-[name]-[id]-[chunkhash:8].js",
    clean: true,
    // library: {
    //   type: "module",
    // },
  },

  // experiments: {
  //   // use esModule
  //   outputModule: true,
  // },

  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    mainFiles: ["index"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },

    modules: ["node_modules"],
    descriptionFiles: ["package.json"],
    mainFields: ["main"],
  },

  module: {
    rules: [
      {
        test: /\.ts|js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.less/,
        use: [
          MiniCssExtractWebpackPlugin.loader,
          // 'style-loader',
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
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: true,
        parallel: true,
      }),
      new CssMinimizerWebpackPlugin({
        parallel: true,
      }),
    ],
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: "./template.html",
      minify: process.env.NODE_ENV === "development" ? false : true,
    }),
    /** 抽取css文件 */
    new MiniCssExtractWebpackPlugin({
      filename: "css/[name]-[contenthash:8].css",
      chunkFilename: "css/[name]-[id].css",
    }),
    /** 处理gzip http压缩 */
    // new CompressionWebpackPlugin({
    //   test: /\.js|css/,
    //   algorithm: "gzip",
    //   minRatio: 0.5,
    // }),
    /** 定义环境变量 */
    new DefinePlugin({
      // "process.env.NODE_ENV": JSON.stringify( process.env.NODE_ENV),
      API_PERFIX: JSON.stringify("/api"),
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
  ],

  devServer: {
    host: "0.0.0.0",
    port: "8081",
    open: true, // 自动打开浏览器
    compress: true, //压缩文件 gzip压缩
    static: ["public"],
  },
};
