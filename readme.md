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

# webpack的五个核心概念

1. entry ：入口提示，webpack以哪个文件为入口起点开始打包，分析构建内部依赖图

2. output ：输出提示 webpack打包的资源bundles输出到哪里，以及如何命名

3. loader ：loader让webpack能够处理 非js文件 (webpack自身只理解js)

4. plugins ：插件可用于执行范围更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等

5. mode ：选择 development 或 production 之中的一个，来设置 mode 参数
