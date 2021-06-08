import "../css/index.less"

import {
    createApp,
    h,
    openBlock,
    createBlock
} from "vue"

import App from "./App.vue"

const app = createApp(App);

app.component('aaa-b', {
    data() {
        return {
            name: 'henry',
            className:'aaaa'
        }
    },
    methods:{
        handleClick(){
            this.name = "monkey";
        }
    },  
    render() {
        // console.log(h('div', {
        //     class: this.className
        // }, [h('span', {onClick:this.handleClick}, [this.name])]))

        
        return h('div', {
            class: this.className
        }, [h('span', {onClick:this.handleClick}, [this.name])])
        // return (openBlock(),createBlock('div',null,this.name))
    }
})

const vm = app.mount('#root');
