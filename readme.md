# webpack 静态模块打包器

原理: 将js以及依赖的模块打包成一个js。处理程序时，会递归的构建一个依赖关系图

1. 初始化一个package.json文件  $ npm init -y

2. 安装webpack: $ npm i webpack --save-dev

3. 4.0版本以上需要安装webpack-cli  
   $npm i webpack-cli --save-dev

4. 安装lodash  $ npm i lodash -p

5. 配置webpack.config.js文件

```
    const path=require('path');

    module.exports={
        entry:"./src/index.js",   // 入口文件
        mode:'development',       // 开发阶段
        output:{
            filename:'main.js',  // 指定打包的js文件名
            path:path.resolve(__dirname,'dist'),  // 指定打包路径
        }
    }
```

6. 执行webpack打包 $ npx webpack

7. css 打包模块解析
   $ npm i css-loader  
   $ npm i style-loader
   使用：将写好的css文件引入到index.js中，一起打包
   配置:
   ```
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use: [
                        // 顺序很重要，从后向前解析，先写style-loader
                        { loader: 'style-loader' },
                        { loader: 'css-loader'}
                    ]
                }
            ]

        }
   ```

8. sass 打包模块依赖
   $ npm i sass-loader node-sass -p

   同css文件，配置添加{ loader: 'sass-loader'}
   test: /\.(sc|c|sa)ss$/
