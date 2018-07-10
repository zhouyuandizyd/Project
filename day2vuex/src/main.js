import Vue from 'vue'
import Index from './component/index'
import store from './store/index'
new Vue({
  el: '#app',
  store,
  render: h => h(Index)
})
