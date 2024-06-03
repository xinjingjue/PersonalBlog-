import axios from 'axios'

import { ElLoading } from 'element-plus'
import router from '@/router'
import message from './Messages';
import { AdminStore } from '@/stores/AdminStore';
const contentTypeForm = "application/x-www-form-urlencoded;charset=UTF-8";
const contentTypeJson = "application/json";
const contentTypeFile = "multipart/form-data";
const adminStore = AdminStore();

const request = (config) => {
    let { url, params,dataType = 'form', showLoading = 'true',method="post" } = config;
    let contentType = contentTypeForm;
    if (dataType === "json") {
        contentType = contentTypeJson;
    } else if (dataType === "file") {
        contentType = contentTypeFile;
        let param = new FormData();
        for (let key in params) {
            param.append(key, params[key]);
        }
        params = param;
    }

    const instantce = axios.create({
        baseURL: 'https://localhost:7104',
        timeout: 20 * 1000,
        headers: {
            'Content-Type': contentType,
            'X-Requested-With': 'XMLHttpRequest',
            
        }
    })

    let loading = null;

    instantce.interceptors.request.use(
        (config) => {
            config.headers.Authorization = "Bearer "+adminStore.token;
            if (showLoading) {
                loading = ElLoading.service({
                    lock: true,
                    text: '加载中......',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
            }
            return config;
        },
        (error) => {
            if (showLoading && loading) {
                loading.close();
            }
            message.error("发送请求失败");
            return Promise.reject("发送请求失败");
        }
    )

    //请求后拦截
    instantce.interceptors.response.use(
        (response) => {
            if (showLoading && loading) {
                loading.close();
            }
            
            const responseData = response.data;
            if (responseData.status == "Error") {
                if (responseData.code == 501) {
                    setTimeout(() => {
                        router.push("/login")
                    }, 2000);
                    return Promise.reject("登录超时");
                }
                if (config.errorCallback) {
                    config.errorCallback();
                }
                return Promise.reject(responseData.message);
            }
            return response;
        },
        (error) => {
            console.log(error);
            if (showLoading && loading) {
                loading.close();
            }
            return Promise.reject("网络异常");
        }
    )

    if (method.toLowerCase() === 'get') {
        return instantce.get(url, { params: params }).catch(error => {
            message.error(error);
            return null;
        });
    } else {
        return instantce.post(url, params).catch(error => {
            message.error(error);
            return null;
        });
    }
};

export default request;