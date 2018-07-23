<template>
    <div>
        <li v-for="(item,index) in list" :key='index'>
            <input type="checkbox" :checked="item.checked" @change="selectItem({ind:index})">
            <img :src="item.url" alt="">
            <div class="content">
                <h5>{{item.tit}}</h5>
                <p>{{item.des}}</p>
                <h4>￥{{item.prices}}</h4>
                <div class="count">
                    <span @click="changeNum({ind:index,type:'-'})">-</span>
                    <b>{{item.count}}</b>
                    <span @click="changeNum({ind:index,type:'+'})">+</span>
                </div>
            </div>
        </li>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
    computed:{
        ...mapState({
            list:state=>state.index.list
        }),
        //原写法
        // list(){
        //    return this.$store.state.index.list
        // }
    },
    methods:{
        ...mapActions({
            selectItem:'selectItem',
            changeNum:'changeNum'
        })
    }
}
</script>
<style lang='scss' scoped>
    li{
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 5px;
        border-bottom:1px solid #ddd; 
        position: relative;
        p{
            font-size: 15px;
            line-height: 1.6;
        }
        .content{
            margin-left: 10px;
        }
        .count{
            position: absolute;
            right: 10px;
            bottom:5px;
            span{
                border:1px solid #ddd;
                border-radius: 50%;
                padding: 1px 5px;
            }
        }
    }
    img{
        width: 30%;
    }
</style>
