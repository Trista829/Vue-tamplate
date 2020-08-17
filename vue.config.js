// vue.config.js
const path = require("path");

const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/site/vue-demo/" : "/", // 公共路径
  indexPath: "index.html", // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "static", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  // lintOnSave: process.env.NODE_ENV !== "production", // 在生产环境禁止使用eslint-loader
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本，设置为true则可以在组件中使用template选项，应用增加10kb左右
  productionSourceMap: !IS_PROD, // 生产环境的 source map，避免源代码暴露
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  // parallel: require("os").cpus().length > 1,
  // pwa: {}, // 向 PWA 插件传递选项。
  chainWebpack: config => {
    // chainWebpack 允许对内部的 webpack 配置进行更细粒度的修改。
    config.resolve.symlinks(true); // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      return args;
    });
    config.resolve.alias // 添加别名
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@store", resolve("src/store"));
    // 压缩图片
    // 需要 npm i -D image-webpack-loader
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
        webp: {
          quality: 75
        }
      });
    // 打包分析
    // 打包之后自动生成一个名叫report.html文件(可忽视)
    if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [{
        analyzerMode: "static"
      }]);
    }
  },
  configureWebpack: config => {
    // configureWebpack 该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    // 开启 gzip 压缩
    // 需要 npm i -D compression-webpack-plugin
    const plugins = [];
    if (IS_PROD) {
      // 为生产环境配置
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  css: {
    extract: IS_PROD, // 提取 CSS 在开发环境模式下是默认不开启的，因为它和 CSS 热重载不兼容。生产环境下是 true，开发环境下是 false
    requireModuleExtension: false, // 去掉文件名中的 .module
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // `globalVars` 定义全局对象，可加入全局变量
        globalVars: {
          primary: "#333"
        }
      }
    }
  },
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。可以使用proxy
    proxy: "http://localhost:8080" // 配置跨域处理,只有一个代理
    // proxy: { //配置多个跨域
    //   "/api": {
    //     target: "http://172.11.11.11:7071",
    //     changeOrigin: true,
    //     // ws: true,//websocket支持
    //     secure: false,
    //     pathRewrite: {
    //       "^/api": "/"
    //     }
    //   },
    //   "/api2": {
    //     target: "http://172.12.12.12:2018",
    //     changeOrigin: true,
    //     //ws: true,//websocket支持
    //     secure: false,
    //     pathRewrite: {
    //       "^/api2": "/"
    //     }
    //   },
    // }
  }
};
