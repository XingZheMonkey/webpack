1. webpack 5.0 使用 html-webpack-plugin时 要使用高版本 html-webpack-plugin
2. webpack 5.0 使用 mini-css-extract-plugin 有冲突，需要把webpack降级到 4.44.2

3. webpack 打包css背景图片 引用路径错误，解决方案：在miniCssExtractPlugin的 options里配置 publicPath:"../"，使其作用范围仅在css中

4. webpack高版本 使用 postcss-loader 配置 options 
```
{
    loader:"postcss-loader",
    options:{
        postcssOptions:{
            plugins:[require("postcss-preset-env")]
        }
    }
}
```

4. webpack-dev-server 使用时与 webpack-cli 版本冲突，解决方案

    + 安装 低版本 webpack-cli:  $ npm i webpack-cli@3.1.2 -d

    + 安装 高版本 webpack-dev-server:  $ npm i webpack-dev-server@3.1.4

    + 或者 在 webpack-cli 4.0 版本以上 执行命令 npx webpack serve