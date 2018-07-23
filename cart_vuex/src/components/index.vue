<template>
    <div>
        <List/> 
        <div>
            <input type="checkbox" :checked="isSelectAll" @click="selectAll">全选
            <p>价格: {{price}}</p>    
        </div>    
    </div>
</template>
<script>
import List from './List';
import {mapState,mapActions} from 'vuex'
export default {
    components:{
        List
    },
    mounted(){
        this.$store.dispatch('getProductList')
    },
    computed:{
        ...mapState({
            price:state=>state.index.price,
            isSelectAll:state=>state.index.isSelectAll
        })
    },
    methods:{
        ...mapActions({
            selectAll:'selectAll'
        })
    }
}
</script>
<style lang="scss">
    *{
        margin: 0;
        padding: 0;
        list-style: none;
        font-size: 18px;
    }
    body,html,#app{
        width: 100%;
        height: 100%;
    }
    .wrap{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    section{
        flex:1;
    }
    footer{
        height: 50px;
        display: flex;
        align-items: center;
        border-top:1px solid #ddd;
        input{
            margin:0 5%;
        }
        p{
            margin-left: 50px;
        }
    }
</style>
