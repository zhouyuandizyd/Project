<template>
    <div class="list_wrap">
        <div v-for='(item,index) in list' :key='index' class="list" :id='item.spelling'>
            <p>{{item.spelling}}</p>
            <ul>
                <li v-for='(item,index) in item.list' :key='index' @click='getMasterList(item.MasterID)'>
                    <img :data-src="item.CoverPhoto">
                    <!-- <img v-lazy="item.CoverPhoto"> -->
                    <span>{{item.Name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array
    },
    getMasterList: {
      type: Function
    }
  }
};
</script>
<style lang='scss' scoped>

.list{
    p{
        font-size: .28rem;
        line-height: .4rem;
        background: #f4f4f4;
        padding-left: .3rem;
        color: #aaa;
    }
    ul{
        margin: 0 .3rem;
        list-style: none;
    }
    li{
        height: 1rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        display: flex;
    align-items: center;
        span{
            font-size: .32rem;
            margin-left: .4rem;
            vertical-align: 80%;
        }
    }
    img{
        height: .8rem;
    }
}
.wrap{
    height: 100%;
    overflow-y: scroll;
}
</style>
