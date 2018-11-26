// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ele from './ele'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import login from './components/login'
import store from './vuex'
import filters from '@/filters'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$ajax = axios;

router.beforeEach((to,from,next)=>{
    if(!localStorage.adminId || !localStorage.adminName){
        store.commit("OUT_LOGIN");
    }
    next();
})

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
    store,
    components: { ele, login },
    template: `<components :is="$store.state.admin.adminId?'ele':'login'"/>`
})