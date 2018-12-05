// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/font/iconfont'
import ele from './ele'
import router from './router'
import axios from 'axios'
import store from './vuex'
import filters from '@/filters'

Vue.config.productionTip = false;
Vue.use(MintUI)
Vue.prototype.$ajax = axios;

axios.interceptors.request.use((config) => {
    config.url = 'http://127.0.0.1' + config.url;
    return config;
})
axios.interceptors.response.use(({ data }) => {
    return data;
})

for (var key in filters) {
    Vue.filter(key, filters[key])
}
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { ele },
    template: '<ele/>'
})