<template>
    <div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">综合排序<i class="iconfont icon-xiajiantou"></i></mt-tab-item>
            <mt-tab-item id="2">距离最近</mt-tab-item>
            <mt-tab-item id="3">品质联盟</mt-tab-item>
            <mt-tab-item id="4">筛选<i class="iconfont icon-shaixuan"></i></mt-tab-item>
        </mt-navbar>
    </div>
</template>

<script>
export default {
    name:'tab',
    data(){
        return {
            selected:''
        }
    }
}
</script>

<style scoped>
    .mint-navbar{        
        border-bottom: 1px solid #eee;
    }
    .mint-tab-item-label{
        font-size: 0.14rem;
        color: #666;
    }
</style>