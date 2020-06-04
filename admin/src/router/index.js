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
Vue.use(VueRouter)

  const routes = [
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

export default router
