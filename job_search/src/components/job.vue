<template>
    <div class="section">
        <ul class="city">
            <p>工作城市：</p>
            <li v-for="(item,index) in cityList" :key="index" @click="changeCity({index,item})" :class="{active:(index===ind)}">{{item}}</li>
        </ul>
        <ol class="type">
            <p>工作类型：</p>
            <li v-for="(item,index) in typeList" :key="index" @click="changeType({index,item})" :class="{active:(index===idx)}">{{item}}</li>
        </ol>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex';
export default {
    computed :{
        ...mapState({
            cityList:state=>state.index.cityList,
            typeList:state=>state.index.typeList,
            ind:state=>state.index.ind,
            idx:state=>state.index.idx
        })
    },
    mounted(){
        this.getJobList()
        // this.$store.dispatch('getJobList')
    },
    methods:{
        ...mapMutations({
            changeCity:'changeCity',
            changeType:'changeType'
        }),
        ...mapActions({
            getJobList:'getJobList'
        })
    }
}
</script>
