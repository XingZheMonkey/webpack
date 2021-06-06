const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    VueLoaderPlugin
} = require('vue-loader');

let env = process.env.NODE_ENV == 'development' ? 'development' : 'production'

module.exports = {
    mode: env,
    entry: './src/js/main.js',
    output: {
        filename: "js/[name].[contenthash:10].js",
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [{
                        loader: miniCssExtractPlugin.loader,
                        options: {
                            // 处理 css中引入图片路径问题
                            publicPath: "../"
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify:{
                // 移除空格
                collapseWhitespace:true,
                // 移除注释
                removeComments:true
            }
        }),
        new VueLoaderPlugin(),
        new miniCssExtractPlugin()
    ],
    devServer: {
        hot: true,
        port: 4000
    },
    resolve: {
        alias: {
            'vue': '@vue/runtime-dom'
        }
    },
    devtool: 'eval-source-map',
    performance: {
        hints: false
    }
}