<template>
    <div>
        <h1>{{time}}</h1>
        <button @click='update'>更新时间</button>
        <input type='text' placeholder="请输入你的姓名" :value="input" @change='changeInput'>
    </div>  
</template>
<script>
export default {
    computed:{
        time(){
            return this.$store.state.index.time
        },
        input(){
            return this.$store.state.index.input
        }
    },
    methods:{
        changeInput(e){
            this.$store.commit({
                type:'changeInput',
                input:e.target.value
            })
        },
        update(){
            // this.$store.commit({
            //     type:'update',
            //     time:new Date().toString()
            // })
            this.$store.dispatch({
                type:'update',
                time:new Date().toString()
            })
        }
    }
}
</script>
