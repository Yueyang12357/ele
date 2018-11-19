<template>
    <div>
        <el-form class="login-container" :model='loginForm' :rules='rules'>
            <h3>饿了么管理系统</h3>
            <el-form-item prop='adminName'>
                <el-input type='text' placeholder="用户名" v-model="loginForm.adminName" ref="adminName"></el-input>
            </el-form-item>
            <el-form-item prop='password'>
                <el-input type='password' placeholder="密码" v-model="loginForm.password" ref="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' :loading='isloading'>登录</el-button>
            </el-form-item>            
        </el-form>
    </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return {
                isloading:false,
                rules:{
                    adminName:[
                        { required: true, message: '请输入您的用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入您的密码', trigger: 'blur' },
                        { min: 3, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
            },
            loginForm:{
                adminName:'',
                password:''
            }
        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
    .login-container{
        width: 350px;
        padding: 25px 15px;
        margin: 150px auto;
        border: 1px solid #eaeaea;
        border-radius: 5px;
        box-shadow: 0 0 25px #eaeaea;
    }
    .login-container h3{
        text-align: center;
    }
    .login-container button{
        width: 350px;
    }
</style>