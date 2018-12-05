<template>
    <div>
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="首页">
                <p class="icon" @click="fn(0)">
                    <i class="iconfont icon-changyonglogo40"></i>
                </p>
                首页
            </mt-tab-item>
            <mt-tab-item id="发现">
                <p class="icon" @click="fn(1)">
                    <i class="iconfont icon-faxian"></i>
                </p>
                发现
            </mt-tab-item>
            <mt-tab-item id="订单">
                <p class="icon" @click="fn(2)">
                    <i class="iconfont icon-ziyuan"></i>
                </p>
                订单
            </mt-tab-item>
            <mt-tab-item id="我的">
                <p class="icon" @click="fn(3)">
                    <i class="iconfont icon-wode"></i>
                </p>
                我的
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
export default {
    name:'tab-bar',
    data(){
        return {
            selected:''
        }
    },
    methods:{
        fn(num){
            var routeArr = ["/","/Discovery","/Orders","/My"]
            this.$router.push(routeArr[num])
        }
    }
}
</script>

<style scoped>
    .icon{
        margin-bottom: 1vw;
    }
    i.iconfont{
        font-size: 5.33vw;
        margin-bottom: 1vw;
    }
</style>