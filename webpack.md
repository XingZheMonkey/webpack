1. 安装命令
$ npm i webpack webpack-cli

2. loader配置
    
    + 处理图片时，需要下载两个loader，url-loader 和 file-loader，但代码里不需要引入 file-loader

    + 处理html里的img标签中的图片资源时，需要下载 html-loader

    + 处理css时，需要下载两个loader，css-loader 和 style-loader，需要注意引入顺序

    + 处理less时，在css基础上添加一个less-loader

    + 处理其他资源时，用file-loader

3. plugins 配置

    + 输出html文件，下载插件 html-webpack-plugin 插件

    ```
    new HtmlWebpackPlugin({
        // 复制一个同样结构的文件，并自动引入打包输出的所有资源
        template:'./index.html',
        // 压缩html
        minify:{
            // 移除空格
            collapseWhitespace:true,
            // 移除注释
            removeComments:true
        }
    })
    ```

    + 提取css文件，需要下载 mini-css-extract-plugin ，并 用 MiniCssExtractPlugin.loader 替代 style-loader ，在plugins中使用插件

    ```
    new MiniCssExtractPlugin({
        filename:'css/built.css'
    }),
    ```

    + 压缩css文件，需要下载 optimize-css-assets-webpack-plugin 插件

4. 生产环境优化

    + 提取css文件，需要下载 mini-css-extract-plugin ，并 用 MiniCssExtractPlugin.loader 替代 style-loader

    + 处理css兼容性，需要下载  postcss-loader  postcss-preset-env 

        > postcss-preset-env 会帮postcss找到package.json中browerslist里面的配置，通过配置加载指定的css兼容性样式
        > postcss默认会按照生产环境执行，如果需要测试开发环境，需要在config.js中设置   process.env.NODE_ENV = 'development'

        ```
        "browserslist":{
            "development":[
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
            ],
            "production":[
            ">0.2%",
            "not dead",
            "not op_mini all"
            ]
        }
        ```

    + 压缩js文件，生产模式下自动压缩

    + 压缩html文件，需要在插件 HtmlWebpackPlugin 中配置 minify


# 优化

## 开发环境优化

1. HMR ： hot moudle replacement 热模块替换 / 模块热更新

> 作用 : 一个模块发生变化，只会重新打包这一个模块（而不是打包所有文件，提升构建速度）
> 只能处理非入口文件


