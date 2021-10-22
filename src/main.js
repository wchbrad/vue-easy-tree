import Vue from 'vue'
import App from './App.vue'

import "./assets/index.scss"

import VueEasyTree from "./components/ve-tree.vue";
Vue.component('VueEasyTree', VueEasyTree)

new Vue({
    el: '#app',
    render: h => h(App)
})