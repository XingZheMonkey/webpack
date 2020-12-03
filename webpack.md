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

### HMR ： hot moudle replacement 热模块替换 / 模块热更新

> 作用 : 一个模块发生变化，只会重新打包这一个模块（而不是打包所有文件，提升构建速度）
> 只能处理非入口文件

+ 样式文件：可以使用HMR功能，因为style-loader内部实现了

+ js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
    注意：HMR功能只能处理非入口js文件
    
    ```
    devServer:{
        hot:true
    }
    ```
    
    ```
    if(module.hot){
        // 一旦module.hot为true说明开启了HMR功能
        module.hot.accept('./print.js',function(){
            // 该方法会监听 print.js 文件的变化，一旦发生变化，其他默认不会重新打包构建，只会执行下边的回调函数
            print()
        })
    }
    ```

+ html文件：默认不使用HMR功能，同时会导致问题，html文件不能热更新
    解决：修改entry入口，将html文件引入
    ```
    entry:['./src/js/index.js,'./src/index.html']/
    ```

### source-map : 一种提供源代码到构建后代码映射的技术（如果构建后代码出错了，通过映射可以追踪到源代码错误的位置）

+ source-map 外部
    - 错误代码准确位置 和 源代码的错误位置

+ inline-source-map 内联 （只生成一个内联source-map）
    - 错误代码准确信息 和 源代码的错误位置

+ hidden-source-map 外部
    - 错误代码错误原因 但没有错误位置

    - 不能追踪源代码错误，只能提示到构建后代码的错误位置

+ eval-source-map 内联
    + 每一个文件都生成对应的source-map，都在eval
    + 错误代码准确位置以及源代码错误位置

+ nosources-source-map 外部
    + 错误代码准确信息，但是没有源代码信息

+ cheap-source-map 外部
    + 错误代码准确信息 和 源代码的错误位置(只能精确到行)

+ cheap-module-source-map 外部

    + 错误代码准确信息 和 源代码的错误位置
   
> 内联和外部的区别：1.外部生成了新的文件，内部没有  2.内联构建速度更快

> 开发环境：速度快，测试更友好

+ 速度快（eval-> inline -> cheap -> ...）

    + eval-cheap-source-map

    + eval-source-map

+ 测试更友好

    + source-map

    + cheap-module-source-map

    + cheap-source-map

 ---> eval-source-map / eval-cheap-module-source-map
     
> 生产环境：源代码要不要隐藏？调试要不要更友好（内联会让代码体积变大，所以生产环境不用内联）

+ noresource-source-map

+ hidden-source-map

---> source-map / cheap-module-source-map

### oneof 

> oneof中不要出现两个配置处理同一种类型文件

### 缓存

1. 开启babel缓存
> cacheDirectory:true

2. 文件资源缓存

   + hash: 每次webpack 构建时都会生成一个唯一的hash值
        问题：因为js和css同时使用一个hash值，如果重新打包，会导致所有缓存失效（但却只改了一个文件）
   
   + chunkhash: 根据chunk生成的hash值，如果打包来自于同一个chunk，那么hash值还是一样的
        问题：js和css的hash值还是一样的，因为css是在js中被引入的，同属于一个chunk
   
   + contenthash：根据文件内容生产hash值，不同文件的hash值一定不一样
   
   ```
   output:{
    fileName:"js/[name].[contenthash:10].js"
   }
   ```
### tree shaking 

> 作用 ：去除无用代码，减少代码体积，树摇
> 前提 ：必须使用Es6语法，必须开启 production 环境

1. 在package.json中配置
    + "sideEffects":false   所有代码都没有副作用（都可以进行tree shaking）
       - 问题：可能会把 css/@babel/polyfill （副作用） 文件干掉
    + "sideEffects":["*.css"]
    
### code split

1. 多入口：有一个入口，最终就会输出一个bundle

```
entry:{
    index:"src/js/index.js",
    test:"src/js/test.js"
},
output:{
    fileName:"js/[name].[contenthash:10].js"
}
```

2. code split

> 可以将node_modules中的代码单独打包一个chunk 最终输出，并且自动分析多入口chunk中有没有公共的文件，如果有会打包成单独一个chunk
```
例： index.js 引入 jquery，test.js 引入jquery，多入口情况下只会打包出一个jquery
```

```
optimization:{
    splitChunks:{
        chunks:"all"
    }
},
mode:"production"
```

3. 通过js代码让某个文件被单独打包成一个chunk（es10 --- import动态导入语法能将某个文件单独打包）

```
import ( /* webpackChunkName:'test' */ './test.js')
    .then(result=>{
        // 文件加载成功
        console.log(result)
    })
    .catch(err=>{
        console.log(err)
    })
```

### js懒加载和预加载

1. js懒加载

```
element.addEventListener('click', async () => {
    const module = await import('./api-scripts/button-click.js')
})
或者
element.addEventListener('click',  () => {
    import('./api-scripts/button-click.js')
        .then(result=>{
            console.log(result)
        })
})
```

2. js预加载

```
element.addEventListener('click',  () => {
    import( /* webpackChunkName:'test' , webpackPrefetch:true */  './test.js')
        .then(result=>{
            console.log(result)
        })
})

```

    + 正常加载可以认为是并行加载，同一时间加载多个文件
    
    + 预加载 prefetch 是等其他资源加载完毕，浏览器空闲了，再偷偷加载其他资源
    
    + 懒加载 只有需求时才会加载

