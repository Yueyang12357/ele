<template>
    <div>
        <header>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <input type="text" placeholder="搜索">
        </header>        
    </div>
</template>

<script>
export default {
    name:'search-page',
    data(){
        return {
            value:''
        }
    }
}
</script>

<style scoped>
    .mint-button{
        background-color: #fff;
        box-shadow: none;
    }
    input[type="text"]{
        padding: 2.93vw;
        background-color: #f8f8f8;
        border: none;
    }
</style>