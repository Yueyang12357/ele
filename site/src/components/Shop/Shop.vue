<template>
    <div>
        <ShopHeader :shopId="shopId"></ShopHeader>
        <GoodsList :shopId="shopId" ></GoodsList>
    </div>
</template>

<script>
import ShopHeader from './shopHeader'
import GoodsList from './goodsList'

export default {
    name:'shop',
    data(){
        return {
            shopId:'',
            shopInfo:{}
        }
    },
    components:{
        ShopHeader,
        GoodsList
    },
    methods:{
        
    },
    beforeMount(){
        this.shopId=this.$route.query.shopId
    }
}
</script>

<style scoped>
    
</style>