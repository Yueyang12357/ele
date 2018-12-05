<template>
    <div>
        <search></search>
        <shopType></shopType>
        <activityAdv></activityAdv>
        <banner></banner>
        <shopList></shopList>
    </div>
</template>

<script>
import shopType from './shopType'
import banner from './banner'
import search from './search'
import activityAdv from './activityAdv'
import shopList from './shopList'

export default {
    name:'index',
    components:{
        shopType,
        banner,
        search,
        activityAdv,
        shopList
    },
    mounted(){
        if(!localStorage.carList){
            localStorage.carList = JSON.stringify([])
        }
    }
}
</script>

<style scoped>
    
</style>