import {getProductList} from '../../api/index'
const state = {
    list:[],
    price:0,
    isSelectAll:false
}
const mutations = {
    updateList:(state,payload)=>{
        state.list = payload.list
    },
    selectItem:(state,{ind})=>{
        let list = state.list
        list.forEach((item,index)=>{
            if(index === ind){
                item.checked = !item.checked
                if(item.checked === true){
                    item.count = 1
                }else{
                    item.count = 0
                }
                // console.log(item)
            }
        })
        state.list = list;
        state.isSelectAll = state.list.every(item=>item.checked)
    },
    changeNum:(state,{ind,type})=>{
        state.list.forEach((item,index)=>{
            if(index === ind){
                if(type === '+'){
                    item.count++
                }else{
                    if(item.count === 0){
                        return
                    }
                    item.count--
                }
            }
        })
    },
    selectAll:(state)=>{
        state.isSelectAll=!state.isSelectAll
        state.list.forEach((item,index)=>{
            item.checked = state.isSelectAll
            if(state.isSelectAll === true){
                item.count = 1
            }else{
                item.count = 0
            }
        })
    },
    totalPrice:(state)=>{
        let price = 0;
        let list = state.list.filter(item=>{
            return item.checked && item.count>0
        })
        console.log(list)
        list.forEach((item,index)=>{
            price += item.count*item.prices
        })
        state.price = price
    }
}
const actions = {
    getProductList:(context)=>{
        getProductList().then(res=>res.json()).then(res=>{
            context.commit('updateList',{list:res})
            context.commit('totalPrice')
        })
    },
    selectItem:(context,payload)=>{
        context.commit('selectItem',payload)
        context.commit('totalPrice')
    },
    changeNum:(context,payload)=>{
        context.commit('changeNum',payload)
        context.commit('totalPrice')
    },
    selectAll:(context)=>{
        context.commit('selectAll')
        context.commit('totalPrice')
    }
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}