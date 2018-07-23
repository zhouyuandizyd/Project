const state = {
    type:'all',
    list: [{
        text: '王俊凯',
        flag: false
    }]
}
const mutations = {
    addList:(state,payload)=>{
        state.list.push({
            text:payload,
            flag:false
        })
    },
    isFinish:(state,payload)=>{
        state.list.forEach((item,index)=>{
            if(index === payload){
                item.flag = !item.flag
            }
        })
    },
    changeType:(state,payload)=>{
        state.type = payload

    },
    deleteVal:(state,payload)=>{
        state.list.splice(payload,1)
    }
}
const actions = {

}
export default {
    state,
    mutations,
    actions
}
