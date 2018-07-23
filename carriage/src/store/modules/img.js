import {getImgList,getCategoryImageList} from './../../api/index'
const state = {
    dataImg:[],
    List:[],
    isloading:true,
    isShowSwiper:false
}
const mutations = {
    updataImgList:(state,payload)=>{
        state.dataImg = payload
    },
    updataImageList:(state,payload)=>{
        state.List = payload
        setTimeout(()=>{
            state.isloading = true
        },0)
    },
    showSwiper:(state,payload)=>{
        state.isShowSwiper = payload
    }
}
const actions = {
    getImgList:(context,payload)=>{
        getImgList(payload).then(res=>res.json()).then(res=>{
            context.commit('updataImgList',res.data)
        }) 
    },
    getCategoryImageList:(context,payload)=>{
        getCategoryImageList(payload).then(res=>res.json()).then(res=>{
            context.commit('updataImageList',res.data.List)
        })
    }
}
export default{
    state,
    mutations,
    actions
}