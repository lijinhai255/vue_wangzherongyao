import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue' 

import Login from "../views/Login"
Vue.use(VueRouter)

  const routes = [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:"/categories/create",component:CategoryEdit},
      { path: '/categories/edit/:id', component: CategoryEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
      {path:"/categories/list",component:CategoryList},

      {path:"/items/create",component:ItemEdit},
      { path: '/items/edit/:id', component: ItemEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
      {path:"/items/list",component:ItemList},

      {path:"/heroes/create",component:HeroEdit},
      { path: '/heroes/edit/:id', component: HeroEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
      {path:"/heroes/list",component:HeroList},

      // 文章路由
      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/edit/:id', component: ArticleEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
      { path: '/articles/list', component: ArticleList },
       // 广告位路由
       { path: '/ads/create', component: AdEdit },
       { path: '/ads/edit/:id', component: AdEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
       { path: '/ads/list', component: AdList },

       // 用户名路由
       { path: '/admin_users/create', component: AdminUserEdit },
       { path: '/admin_users/edit/:id', component: AdminUserEdit,props:true },// 将路由里面的id注入到编辑页面，到前端页面去用props接受,这样就可以和“新建分类”公用一个页面
       { path: '/admin_users/list', component: AdminUserList },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由守卫
router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router
