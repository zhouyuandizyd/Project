import Vue from 'vue'
import App from './App.vue'
import Index from './component/index'
import store from './store/index'
new Vue({
  el: '#app',
  store,
  render: h => h(Index)
})
