import Vue from 'vue'
import Router from 'vue-router'
import admin from './admin'
import shop from './shop'
import goods from './goods'
import user from './user'
import adv from './adv'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: admin.concat(shop, user,goods,adv)
})