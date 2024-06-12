import { createRouter, createWebHistory } from 'vue-router'
import blog from '@/views/blog/Blog.vue'
import category from '@/views/blog/BlogCategory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: ()=>import("../views/Login.vue")
    },
    {
      path:'/',
      name:"框架页",
      component:()=>import('../views/Framework.vue'),
      redirect:"/blog/list",
      children:[
        {
          path:"/blog/list",
          name:"博客管理",
          component:blog
        },
        {
          path:"blog/category",
          name:"分类管理",
          component:category
        }
      ]
    }
  ]
})

export default router
