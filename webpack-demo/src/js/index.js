require('../css/index.css');
console.log("webpack start ")

document.getElementsByClassName("test")[0].addEventListener("click",()=>{
    import (/* webpackChunkName:'js懒加载' */ "./js懒加载").then(result=>{

        let { add,jian } = result
        console.log(add(1,7))
        console.log(jian(7,1))
    })
})

// 错误代码 试验source map
var a  = document.getElementByIdS("aaa")