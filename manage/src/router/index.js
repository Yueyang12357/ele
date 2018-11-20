import Vue from 'vue'
import Router from 'vue-router'
import admin from './admin'
import shop from './shop'
import adminLog from '@/components/admin/adminLog'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: admin.concat(shop)
})