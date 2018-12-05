<template>
    <div>
        <form>
            <mt-field placeholder="手机号" type="tel" v-model="phone" @keyup.native.capture="inp" ref="phoneId" >
                <a href="javascript:;" class="btn" @click="()=>{this.code=777777}">获取验证码</a>
            </mt-field>            
            <mt-field placeholder="验证码" type="text" v-model="code"></mt-field>
            <p>新用户登录即自动注册，并表示已同意<a href="javascript:;">《用户服务协议》</a></p>
            <mt-button type="primary" @click="login">登录</mt-button>
            <p>关于我们</p>
        </form>
        
    </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
    name:'login',
    data(){
        return {
            phone:'',
            code:''
        }
    },
    methods:{
        inp(){
            console.log(this.$refs.phoneId.currentValue)
            if(this.$refs.phoneId.currentValue.length===11){
                document.querySelector('.btn').style.color="#2395ff"
            }else{
                document.querySelector('.btn').style.color="#999"
            }
        },
        getCode(){
            this.$ajax.post('/getCode',{
                phone:this.this.$refs.phoneId.currentValue
            })
            .then(data=>{
                this.code=data
            })
        },
        login(e){
            e.preventDefault();
            console.log(this.$refs.phoneId.currentValue)
            this.$ajax.post('/userLogin',{
                phoneId:this.$refs.phoneId.currentValue
            })
                .then(data=>{
                    if(data.ok===1){
                        Toast(data.msg);
                        console.log(data.results)
                        localStorage.userInfo = JSON.stringify(data.results)
                        this.$router.go(-1)
                    }
                })
        }
    }
}
</script>

<style scoped>
    form{
        width: 100%;
        padding: 10vw;
        box-sizing: border-box;
        position: relative;
    }
    .mint-cell{
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 16px;
    }
    .mint-button{
        width: 100%;
        background-color: #4cd96f;
    }
    p{
        color: #999;
        line-height: 20px;
        margin-bottom: 16px;
    }
    p a{
        color: #2395ff;
    }
    p:nth-of-type(2){
        margin-top: 10px;
        text-align: center;
    }
    .btn{
        color: #999;
    }
</style>