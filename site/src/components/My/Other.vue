<template>
    <div>
        <div class="other">
            <i class="iconfont icon-dizhi"></i>
            <span>我的地址</span>
            <span class="arrow">></span>
        </div>        
        <div class="other">
            <i class="iconfont icon-shangcheng2"></i>
            <span>金币商城</span>
            <span class="arrow">></span>
        </div>
        <div class="other">
            <i class="iconfont icon-liwu"></i>
            <span>分享拿10元现金</span>
            <span class="arrow">></span>
        </div>
        <div class="other">
            <i class="iconfont icon-wodekefu"></i>
            <span>我的客服</span>
            <span class="arrow">></span>
        </div>
        <div class="other">
            <i class="iconfont icon-changyonglogo40"></i>
            <span>下载饿了么APP</span>
            <span class="arrow">></span>
        </div>
    </div>
</template>

<script>
export default {
    name:'other'
}
</script>

<style scoped>
    .other{
        margin-top: 2.67vw;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        font-size: 0.14rem;
        line-height: 4.53vw;
        padding-left: .14rem;
        color: #333;
    }
    .other:nth-of-type(2n+1){
        margin-top: 0;
        border-top: none;
    }
    .other:nth-of-type(2n){
        border-bottom: none;
    }
    .other:nth-of-type(1){
        margin-top: 2.67vw;
        border-top: 1px solid #ddd;        
    }
    .other i.iconfont{
        color: #4aa5f0;
        font-size: 0.17rem;
    }
    .other:nth-of-type(2) i.iconfont{
        color: #94d94a;
    }
    .other:nth-of-type(3) i.iconfont{
        color: #fc7b53;
        font-size: 0.17rem;
    }
    .other span{
        display: inline-block;
        padding: 3.733333vw 2.666667vw 3.733333vw 0
    }
    .other span:nth-of-type(2){
        float: right;
        color: #ddd;
    }
</style>