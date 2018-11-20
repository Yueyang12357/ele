import Vue from 'vue';
import VueX from 'vuex';
import admin from './admin'
Vue.use(VueX);
export default new VueX.Store({
    modules: {
        admin
    }
})