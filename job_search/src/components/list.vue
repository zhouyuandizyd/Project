<template>
    <div>
        <table>
            <tr>
                <th>职位名称</th>
                <th>职位类别</th>
                <th>人数</th>
                <th>地点</th>
                <th>时间</th>
            </tr>
        </table>
        <table id="table">
            <tr v-for='(item,index) in List' :key="index">
                <td>{{item.name}}</td>
                <td>{{item.type}}</td>
                <td>{{item.number}}</td>
                <td>{{item.address}}</td>
                <td>{{item.Time}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex';
export default {
    computed:{
        ...mapState({
            List:state=>state.index.List  
        })
    },
    mounted(){
        this.getJobList();
    },
    methods:{
        ...mapActions({
            getJobList:'getJobList'
        })
    }
};
</script>
