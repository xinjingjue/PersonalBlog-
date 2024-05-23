<template>
    <div class="login-body">
        <div class="login-panel">
            <div class="login-title">用户登录</div>
            <el-form :model="fromData" :rules="rules" ref="formDataRef">
                <el-form-item prop="account">
                    <el-input v-model="fromData.account" placeholder="请输入账号" size="large">
                    <template #prefix>
                        <span class="iconfont icon-account"></span>
                    </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" >
                    <el-input type="password" v-model="fromData.password" placeholder="请输入密码" size="large">
                        <template #prefix>
                        <span class="iconfont icon-password"></span>
                    </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkCode">
                    <div class="check-code-panel">
                        <el-input v-model="fromData.checkCode" placeholder="请输入验证码" size="large" />
                        <img :src="CheckCodeUrl" class="check-code" size="large" @click="checkCodeOnClick" />
                    </div>
                </el-form-item>
                <el-form-item label="">
                    <el-checkbox  size="large" v-model="fromData.rememberMe" :label="true">记住我</el-checkbox>
                </el-form-item>
                <el-button @click="login" type="primary" :style="{ width: '100%' }">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, inject, onMounted } from "vue";
import request from "@/utils/Request"
//没有封装
const axiosInstance = axios.create({
    baseURL:"https://localhost:7104",
    timeout:1000,
   
});
//表单数据校验
const rules = {
    account:[{
        required:true,
        message:"请输入用户名"
    }],
    password:[{
        required:true,
        message:"请输入密码"
    }],
    checkCode:[{
        required:true,
        message:"请输入验证码"
    }],
};
//表单数据
const fromData = reactive({

});
const formDataRef = ref();

//验证码URL
const CheckCodeUrl = ref('');
//验证码输入ID
const checkCodeId = ref('');

onMounted(() => {
    checkCodeId.value = Math.floor(Math.random() * 1000 + 1); 
    LoadCheckCode();
});
//当点击验证码图片的时候加载新的图片进行使用
const checkCodeOnClick = async ()=>{
    checkCodeId.value = Math.floor(Math.random() * 1000 + 1); 
    LoadCheckCode();
};
//加载验证码
const LoadCheckCode = async () => {
    let res = await axiosInstance.get("api/Captcha/Checkcode", {
        responseType:'arraybuffer',
        params: {
            id:checkCodeId.value     
         }
    });
    if(res.status == 200){
        let blob = new Blob([res.data],{type:'image/png'});
        CheckCodeUrl.value = (window.URL || window.webkitURL).createObjectURL(blob);
    }
};
//登录校验
const login = ()=>{
    formDataRef.value.validate((valid)=>{
        //验证不通过就退出
        if(!valid){
            return;
        }
        else{
            Request.Request()
        }
    });
};
</script>

<style lang="scss" scoped>
.login-body {
    background-image: url(../assets/Login-bg.jpeg);
    width: 100%;
    height: calc(100vh);
    background-position: auto;
    background-size: cover;
}

.login-panel {

    float: right;
    width: 350px;
    background: rgba(255, 255, 255, 0.6);
    margin-right: 350px;
    padding: 20px;
    margin-top: 150px;
    border-radius: 5px;
    box-shadow: 2px 2px 10px #ddd;

    .login-title {
        font-size: 18px;
        text-align: center;
        margin-bottom: 10px;
    }

    .check-code-panel {
        display: flex;

        .input-panel {
            flex: 1;
            margin-right: 5px;
        }
        .check-code{
            margin-left: 10px;
            margin-top: center;
            height: 38px

        }
    }
}
</style>