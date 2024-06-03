import { createRouter, createWebHistory } from 'vue-router'

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
      component:()=>import('../views/Framework.vue')

    }
  ]
})

export default router
