import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import index from './modules/index'
import img from './modules/img'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        index,
        img
    },
    plugins:[createLogger()]
})