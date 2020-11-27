const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
        loader:'postcss-loader',
        options:{
            ident:"postcss",
            plugins:()=>[
                require("postcss-preset-env")()
            ]
        }
    },
]

module.exports = {
    // 入口文件
    entry:"./index.js",
    // 输出路径
    output:{
        filename:"built.js",
        path:path.resolve(__dirname,'build')
    },
   module: {
        rules: [{
            // 以下loader只会匹配一个，因此不能有两个配置处理同一种类型文件
            // 解决方案，将其中一个loader提出来，放在oneof之外
            oneof: [
                // loader的 配置
                {
                    test: /\.less$/,
                    use: [...commonCssLoader, "less-loader"]
                },

                {
                    // 处理css资源，use中的执行顺序是从下到上，从右到左
                    test: /\.css$/,
                    use: [...commonCssLoader]
                },

                {
                    // 处理图片资源
                    test: /\.(jpg|png|gif)$/,
                    loader: 'url-loader',
                    options: {
                        // 图片大小限于8kb，就会被转化为base64处理 ，可以减少请求数量，减轻服务器压力，但图片体积会变大（8kb可以改）
                        limit: 8 * 1024,

                        // 给文件重命名，截取hash值的前10位
                        name: '[hash:10].[ext]',
                        // esModule:false
                        outputPath: "imgs/"
                    }
                },
                // 低版本问题：url-loader 默认使用es6模块化解析，但html-loader引入图片是靠commonjs，解决方案是关掉url-loader的esModule:false
                {
                    // 处理html里的图片资源
                    test: /\.html$/,
                    loader: 'html-loader'
                },

                // 打包其他资源（除了html/js/css的资源）
                {
                    exclude: /\.(html|js|css|png|jpg|gif)$/,
                    loader: 'file-loader'
                },

                /*
                 * 正常来讲，一个文件只能被一个loader处理
                 * 当一个文件需要使用多个loader处理，那么一定要指定loader执行的先后顺序
                 * 先执行elint loader，再执行babel loader
                 * 使用属性  enforce:"pre" 将其设置为优先执行
                 * { test:/\.js$/ , loader : "eslint-loader",enforce:'pre'，options:{fix:true}}
                 */

                // 处理js兼容性问题
                {
                    test: /\.js$/,
                    exclude: /node_moudles/,
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: "usage", // 按需加载
                                    corejs: {
                                        verion: 3
                                    },
                                    targets: { // 按需加载针对的浏览器
                                        chrome: "60",
                                        firefox: "50"
                                    }
                                }
                            ]
                        ],
                        // 开启babel缓存
                        // 第二次构建时，会读取之前的缓存
                        cacheDirectory:true
                    }
                }
            ]
        }],
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
            filename:'css/built.css'
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
