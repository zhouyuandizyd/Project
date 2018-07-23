import Vue from 'vue'
import Index from './components/index'
import store from './store/index'
new Vue({
  el: '#app',
  store,
  render: h => h(Index)
})
