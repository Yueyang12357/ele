<template>
    <div>
        <mt-header title="我的">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <Info></Info>
        <Other></Other>  
    </div>
</template>

<script>
import Info from './info'
import Other from './other'

export default {
    name:'my',
    data(){
        return {

        }
    },
    components:{
        Info,
        Other
    }
}
</script>

<style>
    h1.mint-header-title{
        font-size: .18rem;
    }
</style>