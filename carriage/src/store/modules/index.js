import {getBrandList} from './../../api/index'
const state = {
    letter: [],
    newData: []
}
const mutations = {
    updateBrandList:(state,payload)=>{
        state.newData = payload.newData
    },
    updateLetter:(state,payload)=>{
        state.letter = payload.letter
    }
}
const actions = {
    getBrandList:(context,payload)=>{
        getBrandList().then(res => res.json())
        .then(res => {
          //处理数据
          if (res.code === 1) {
            let letter = [];
            let newData = [];
            let len = -1;
            res.data.forEach(item => {
              let spelling = item.Spelling[0];
              if (letter[len] === spelling) {
                newData[len].list.push(item);
              } else {
                len++;
                letter.push(spelling);
                newData.push({
                  spelling,
                  list: [item]
                });
              }
            });
            context.commit('updateBrandList',{newData})
            context.commit('updateLetter',{letter})
            // setTimeout(()=>lazyLoad.init(),10)
          } else {
            alert(res.msg);
          }
        });
    }
}
export default {
    state,
    mutations,
    actions
}