import {getJobList} from './../../api/index'
const state = {
    List:[],
    cityList:[],
    typeList:[],
    ind:0,
    idx:0
}
const mutations = {
    getcityList:(state,payload)=>{
        state.cityList = payload
    },
    gettypeList:(state,payload)=>{
        state.typeList = payload
    },
    getAllList:(state,payload)=>{
        state.List = payload
    },
    changeCity:(state,payload)=>{
        state.ind = payload.index
        if(payload.item === '全国'){
            return state.List
        }else{
            let datalist = []
            state.List.forEach((item,index)=>{
                if(item.address === payload.item){
                    datalist.push(item)
                    return state.List=datalist
                }
            })
        }
    },
    changeType:(state,payload)=>{
        state.idx = payload.index
        let datalist = []
        state.List.forEach((item,index)=>{
            if(item.type === payload.item){
                datalist.push(item)
                return state.List=datalist
            }
            
        })
    }
}
const actions = {
    getJobList:(context)=>{
        getJobList().then(res=>res.json()).then(res=>{
            context.commit('getcityList',res.city)
            context.commit('gettypeList',res.type)
            context.commit('getAllList',res.info)
        })
    }
}
export default{
    state,
    mutations,
    actions
}