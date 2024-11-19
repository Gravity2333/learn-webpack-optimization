const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    // index: {
    //   import: "./src/index.ts",
    //   runtime: "common-runtime",
    // },
    main: {
      import: "./src/main.tsx",
      runtime: "common-runtime",
    },
  },

  // experiments: { outputModule: true },

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle-[name]-[id].js",
    chunkFilename: "chunk-[name]-[id]-[chunkhash:8].js",
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    mainFiles: ["index"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
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
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./template.html",
      inject: "body",
      minify: process.env.NODE_ENV === "development" ? false : true,
      // scriptLoading: 'module', // 设置 script 标签为 module 类型
    }),
    /** 定义环境变量 */
    new DefinePlugin({
      // "process.env.NODE_ENV": JSON.stringify( process.env.NODE_ENV),
      API_PERFIX: JSON.stringify("/api"),
    }),
  ],
  externalsType: "var",
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
