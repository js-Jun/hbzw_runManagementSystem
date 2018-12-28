import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
//导入组件
import login from '@/views/login'
import home from '@/views/home'
import serviceConfig from '@/components/serviceConfig'
import registered from '@/components/registered'
import serviceDetails from '@/components/serviceDetails'
import test141 from '@/components/test1-4-1'
import test2 from '@/components/test2'
import test4 from '@/components/test4'
import index from '@/components/index'
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login
    },
    {
      path:'/home',
      name:'Home',
      component:home,
      redirect:{name:'Index'},
      children:[
        {
          path:'index',
          name:'Index',
          component:index,
          meta:{name:'首页'}
        },
        {
          path:'ServiceConfig',
          name:'ServiceConfig',
          component:serviceConfig,
          meta:{name:'路由管理'}
        },
        {
          path:'Registered',
          name:'Registered',
          component:registered,
          meta:{name:'注册中心'}
        },
        {
          path:'ServiceDetails',
          name:'ServiceDetails',
          component:serviceDetails,
          meta:{name:'服务管理'}
        },
        {
          path:'test1-4-1',
          name:'Test1-4-1',
          component:test141
        },
        {
          path:'test2',
          name:'Test2',
          component:test2,
          meta:{name:'test2'}
        },
        {
          path:'test4',
          name:'Test4',
          component:test4
        },
      ]
    }
  ]
})
