<template>
    <div>
        <ol>
            <li @click="changeType('all')" :class='{active:(type=="all")}'>全部</li>
            <li @click="changeType('finish')" :class='{active:(type=="finish")}'>已完成</li>
            <li @click="changeType('unfinish')" :class='{active:(type=="unfinish")}'>未完成</li>
        </ol>
        <ul>
            <li v-for="(item,index) in list" :key="index">
                <p @click="isFinish(index)">{{item.text}}</p>
                <span>{{item.flag?'已完成':'未完成'}}</span>
                <b @click="deleteVal(index)">X</b>
            </li>
        </ul>
    </div>
    
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    computed:{
        ...mapState({
            type:state=>state.index.type,
            list:state=>{
                if(state.index.type === 'all'){
                    return state.index.list
                }else if(state.index.type === 'finish'){
                    return state.index.list.filter(item=>{
                        return item.flag
                    })
                }else{
                    return state.index.list.filter(item=>{
                        return !item.flag
                    })
                }
            }
        })
    },
    methods:{
        ...mapMutations({
            isFinish:'isFinish',
            changeType:'changeType',
            deleteVal:'deleteVal'
        })
    }
}
</script>
<style>
    ul{
        width: 60%;
    }
    ul li{
        list-style: none;
        cursor: pointer;
        width:100%;
        display: flex;
        justify-content:space-between;
        height: 40px;
        align-items: center;
        
    }
    ol{
        width: 60%;
        display: flex;
        height: 40px;
        align-items: center;
    }
    ol li{
        list-style: none;
        flex:1;
        cursor: pointer;
        text-align: center;
    }
    .active{
        color: orange;
    }
</style>
