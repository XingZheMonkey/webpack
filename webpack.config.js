const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

// process.env.NODE_ENV = 'development'
module.exports = {
    // 入口文件
    entry:"./index.js",
    // 输出路径
    output:{
        filename:"built.js",
        path:path.resolve(__dirname,'build')
    },
    module:{
        rules:[
            // loader的 配置
            {
                // 处理less资源
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',

                    // 处理css兼容性问题,postcss-preset-env 会帮postcss找到package.json中browerslist里面的配置，通过配置加载指定的css兼容性样式

                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[require("postcss-preset-env")]
                            }
                        }
                    },

                    // 将less文件编译成css文件,需要下载less和less-loader
                    'less-loader'
                ]
            }, 
            // optimize-css-assets-webpack-plugin 压缩css文件，生产环境会自动压缩js

            {
                // 处理css资源，use中的执行顺序是从下到上，从右到左
                test:/\.css$/,
                use:[
                    // 2.1 取代style标签，创建css文件
                    {
                        loader:miniCssExtractPlugin.loader,
                        options:{
                            // 设置css里引入图片的路径
                            publicPath:"../"
                        }
                    },
                    // 2. 创建style标签，将js中的样式资源插入并添加到header中生效
                    // 'style-loader',
                    
                    // 1.将css文件变成commonjs模块加载的js中，里面的内容是样式字符串
                    'css-loader',

                    // 处理css兼容性问题,postcss-preset-env 会帮postcss找到package.json中browerslist里面的配置，通过配置加载指定的css兼容性样式

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
                // 处理图片资源
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{
                    // 图片大小限于8kb，就会被转化为base64处理 ，可以减少请求数量，减轻服务器压力，但图片体积会变大（8kb可以改）
                    // 图片体积大于8kb，才会输出为独立的图片
                    limit: 8 * 1024,

                    // 给文件重命名，截取hash值的前10位
                    name: '[hash:10].[ext]',
                    // esModule:false
                    outputPath:"imgs/"
                }
            },
            // 低版本问题：url-loader 默认使用es6模块化解析，但html-loader引入图片是靠commonjs，解决方案是关掉url-loader的esModule:false
            {
                // 处理html里的图片资源
                test:/\.html$/,
                loader:'html-loader'
            },

            // 打包其他资源（除了html/js/css的资源）
            {
                exclude:/\.(html|js|css|png|jpg|gif)$/,
                loader:'file-loader'
            }
        ],
    },
    plugins:[
        // 打包html文件
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
        }),
        new MiniCssExtractPlugin({
            filename:'css/ built.css'
        }),
        new optimizeCssAssetsWebpackPlugin()
    ],
    mode:"development",

    // 开发服务器 devServer : 用来自动化（自动编译，自动打开浏览器，自动刷新）
    // 特点：只会在内存中编译打包，不会有任何本地输出
    devServer:{
        contentBase:path.resolve(__dirname,'build'),
        // 启动gzip压缩
        compress:true,
        // 启动devServer 指令为 ： npx webpack-dev-server
        port:3000
    }
}
