import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
Vue.use(VueLazyLoad,{
  preLoad:2,//proportion of pre-loading height
  attempt:3//尝试计数
})
