<template>
    <div class="layout">
        <el-container>
            <el-header class="header">
                <div class="logo">Xin的Blog</div>
                <div class="user-info">
                    <span>欢迎回来，</span>
                    <el-dropdown trigger="click">
                        <span class="account-name">
                           {{ userInfo.account }}
                            <span class="iconfont icon-close"></span>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>个人信息</el-dropdown-item>
                                <el-dropdown-item>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container class="container">
                <el-aside width="200px" class="left-aside">
                    <div>
                        <el-button class="post-button">发布</el-button>
                        <div class="menu-panel">
                            <ul>
                                <li v-for="(menu, index) in menuList">
                                    <span class="menu-title-p" @click="OpenClose(index)">
                                        <span :class="['iconfont', menu.icon]"></span>
                                        <span class="menu-title">{{ menu.title }}</span>
                                        <span
                                            :class="['iconfont', 'open-close', menu.open ? 'icon-open' : 'icon-close']"></span>
                                    </span>

                                    <ul class="sub-menu" v-show="menu.open">
                                        <li v-for="subMenu in menu.children">
                                            <span class="sub-menu-item">{{ subMenu.title }}</span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-aside>
                <el-main class="right-main">Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>

import { ref, inject, onMounted } from 'vue'
import request from '@/utils/Request'
import { useRoute, useRouter } from 'vue-router'
import { AdminStore } from "@/stores/AdminStore";
const router = useRouter();
const route = useRoute();
const $cookies = inject("$cookies");
const adminstore = AdminStore();
const userInfo = ref({
    account: '',
    password: ''
});
const menuList = ref([
    {
        title: "博客",
        icon: "icon-blog",
        open: false,
        children: [
            {
                title: "博客管理",
                path: "/blog/list",
            },
            {
                title: "分类管理",
                path: "/blog/category",
            },
        ],
    },
    {
        title: "专题",
        icon: "icon-zhuanti",
        open: false,
        children: [
            {
                title: "专题管理",
                path: "/special/list",
            },
        ],
    },
    {
        title: "设置",
        icon: "icon-settings",
        open: false,
        children: [
            {
                title: "个人信息设置",
                path: "/settings/my",
            },
            {
                title: "博客成员",
                path: "/settings/user",
            },
            {
                title: "系统设置",
                path: "/settings/sysInfo",
                roleType: 1,
            },
        ],
    },
    {
        title: "回收站",
        icon: "icon-delete",
        open: false,
        children: [
            {
                title: "回收站",
                path: "/recovery/list",
            },
        ],
    },
]);

onMounted(() => {
    init();
});
const OpenClose = (index) => {
    const flag = menuList.value[index].open;
    menuList.value[index].open = !flag;


}
const init = () => {
    let flag = $cookies.isKey("blog_account");
    if (!flag) {
        router.push("/login")
    }
    // else if (!adminstore.token) {
    //     router.push("/login")
    // }
    else {
        userInfo.value.account = $cookies.get("blog_account");
        userInfo.value.password = $cookies.get("blog_password");
        console.log(userInfo.value);
    }

}
</script>

<style lang="scss" scoped>
.layout {
    .header {
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .logo {
            font-size: 20px;
        }

        .user-info {
            display: flex;
            align-items: center;
            .account-name {
                color: rgb(75, 75, 243);
                cursor: pointer;
                .icon-close {
                    font-size: 14px;
                }
            }

        }
    }

    .container {
        padding-top: 10px;
        background: #f5f6f7;
        height: calc(100vh - 60px);

        .left-aside {
            padding: 0px 15px;
            width: 250px;

            .post-button {
                background: green;
                color: #fff;
                height: 40px;
                width: 100%;
            }

            .menu-panel {

                ul,
                li {
                    padding: 0px;
                    margin: 0px;
                    list-style: none;
                }

                .menu-title-p {
                    padding: 0px 5px;
                    line-height: 40px;
                    display: flex;
                    cursor: pointer;

                    .iconfont {
                        color: #91949a;
                    }

                    .menu-title {
                        margin-left: 13px;
                        color: #3f4042;
                        flex: 1;
                    }


                }

                .menu-title-p:hover {
                    background: #ddd;
                }

                .sub-menu {
                    padding-left: 29px;
                    font-size: 14px;

                    .sub-menu-item {
                        display: block;
                        line-height: 35px;
                        padding: 0px 10px;
                    }

                    .sub-menu-item:hover {
                        background: #ddd;
                    }
                }
            }

        }

        .right-main {
            background: #fff;
        }
    }


}
</style>