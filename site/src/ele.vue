<template>
    <div>
        <router-view></router-view>
        <tabBar v-if="this.$route.meta.isShow"></tabBar>
    </div>
</template>

<script>
import tabBar from '@/components/common/tabBar'
import axios from 'axios'

export default {
    name:'ele',
    data(){
        return {

        }
    },
    components:{
        tabBar
    }
}
</script>

<style>
@import '../static/font/iconfont.css';
</style>

<style lang="scss">
@import '../static/scss/index.scss';

</style>
