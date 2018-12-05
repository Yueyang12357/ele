import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/index'
import Login from '@/components/My/login'
import Search from '@/components/Search/searchPage'
import Discovery from '@/components/Discovery/Discovery'
import Orders from '@/components/Orders/Orders'
import My from '@/components/My/My'
import Shop from '@/components/Shop/Shop'
import ShopType from '@/components/ShopType/shopType'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            isShow: true
        }
    }, {
        path: '/Shop',
        name: 'Shop',
        component: Shop,
        meta: {
            isShow: false
        }
    }, {
        path: '/Discovery',
        name: 'Discovery',
        component: Discovery,
        meta: {
            isShow: true
        }
    }, {
        path: '/Orders',
        name: 'Orders',
        component: Orders,
        meta: {
            isShow: true
        }
    }, {
        path: '/My',
        name: 'My',
        component: My,
        meta: {
            isShow: true
        }
    }, {
        path: '/Login',
        name: 'Login',
        component: Login,
        meta: {
            isShow: false
        }
    }, {
        path: '/Search',
        name: 'Search',
        component: Search,
        meta: {
            isShow: false
        }
    },{
        path:'/ShopType/:shopTypeName',
        name:'ShopType',
        component:ShopType,
        meta:{
            isShow:false
        }
    }]
})