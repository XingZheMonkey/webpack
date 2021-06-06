const path  = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
module.exports = {
    entry:{
        game:"./src/js/game.js",
        index:'./src/js/index.js'
    },
    output:{
        filename:"js/[name].[contenthash:10].js",
        // path 必须是绝对路径
        path:path.resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {
                        loader:miniCssExtractPlugin.loader,
                        options:{
                            // 处理 css中引入图片路径问题
                            publicPath:"../"
                        }
                    },
                    
                    'css-loader',
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[require("postcss-preset-env")]
                            }
                        }
                    }
                ]
            },
            {
                test:/\.(jpg|png|gif|svg)$/,
                loader:'url-loader',
                options:{
                    limit: 8 * 1024,
                    name:'[hash:10].[ext]',
                    outputPath:"imgs/"
                }
            },
            {
                test:/\.html$/,
                loader:"html-loader"
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:"babel-loader",
                options:{
                    // 开启babel缓存
                    // 第二次构建时，会读取之前的缓存
                    cacheDirectory:true
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            // 复制一个同样结构的文件，并自动引入打包输出的所有资源
            template:'./src/index.html',
            // 压缩html
            minify:{
                // 移除空格
                collapseWhitespace:true,
                // 移除注释
                removeComments:true
            }
        }),
        new miniCssExtractPlugin({
            filename:"css/[name].[contenthash:10].css"
        }),
        new optimizeCssAssetsWebpackPlugin()
    ],
    mode:"development",
    devServer:{
        contentBase:path.resolve(__dirname,'build'),
        // 启动gzip压缩
        compress:true,
        // 启动devServer 指令为 ： npx webpack serve
        port:3000
    },
    devtool:"source-map"

}
