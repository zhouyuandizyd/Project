const state = {
  time: new Date().toString()
}
const mutations = {
  update: (state, {time}) => {
    state.time = time
  }
}
const actions = {
  update: (context, payload) => {
    console.log('我的default页面的输出')
    setTimeout(() => {
        context.commit({
        type: 'update',
        ...payload
      })
    }, 1000)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
