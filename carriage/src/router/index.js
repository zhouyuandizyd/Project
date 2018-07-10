import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from './../components/HelloWorld'
const HelloWorld = ()=>import('./../components/HelloWorld')
const Detail = ()=>import('./../components/detail')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path:'/detail',
      component:Detail
    }
  ]
})
