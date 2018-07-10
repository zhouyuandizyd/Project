const state = {
  time: new Date().toString(),
  input:''
}
const mutations = {
  update: (state, {time}) => {
    state.time = time
  },
  changeInput:(state,{input})=>{
    state.input = input
  }
}
const actions = {
  update: (context, payload) => {
    console.log('我的index页面的输出')
    setTimeout(() => {
        context.commit({
        type: 'update',
        ...payload
      })
    }, 1000)
  }
}
export default {
//   namespaced: true,
  state,
  actions,
  mutations
}
