<template>
    <div>
        <input type="text" placeholder="todo..." ref='inp' v-on:keyUp.enter="handleKeyUp">
        <button @click="submit">提交</button>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    methods:{
        submit(){
            let inpVal = this.$refs.inp.value
            console.log(inpVal)
            this.addList(inpVal)
            this.$refs.inp.value = ''
        },
        ...mapMutations({
            addList:'addList'
        }),
        handleKeyUp(){
            this.addList()
        }
    }
}
</script>
