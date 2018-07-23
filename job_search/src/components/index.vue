<template>
    <div class="wrap">
        <div class="top">
            <h1>职位搜索</h1>
        </div>
        <Job/>
        <List/>
    </div>
</template>
<script>
import Job from './job.vue'
import List from './list.vue'
export default {
    components:{
        Job,
        List
    }
}
</script>
<style>
    @import url('./../assets/css/style.css');
</style>
