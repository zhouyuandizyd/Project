import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from './../components/HelloWorld'
const HelloWorld = ()=>import('./../components/HelloWorld')
const Detail = ()=>import('./../components/detail')
const Img = ()=>import('./../components/img.vue')
const Askminprice = ()=>import('./../components/askminprice.vue')
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
    },{
      path:'/img',
      component:Img
    },{
      path:'/askminprice',
      component:Askminprice
    }
  ]
})
