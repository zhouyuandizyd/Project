<template>
     <div ref= 'master' :class='"master "+masterCls'
        @touchstart.stop='touchStart'
        @touchmove.stop='touchMove'
        @touchend='touchEnd'
     >
        <div v-for="(item, index) in masterList" :key="index">
            <p class="name">{{item.GroupName}}</p>
            <ul>
                <li v-for="(value, key) in item.GroupList" :key="key" @click='toDetail(value.SerialID)'>
                    <img :data-src="value.Picture">
                    <!-- <img :src="value.Picture"> -->
                    <div>
                        <p>{{value.AliasName}}</p>
                        <p>{{value.DealerPrice}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>    
</template>
<script>
export default {
  props: {
    masterList: {
      type: Array,
      default: []
    },
    masterCls: {
      type: String
    },
    hideMaster: {
      type: Function
    }
  },
  methods: {
    touchStart(e) {
      console.log(e);
      this.startTouch = e.touches[0];
    },
    touchMove(e) {
      let touch = e.touches[0];
      //手指移动的距离
      let pageX = touch.pageX - this.startTouch.pageX
      this.pageX = pageX
      if(pageX < 0){
        //不动
      }else{
        //master随着手指移动
        this.$refs.master.style = `transform:translate3d(${pageX}px, 0, 0)`
      }
    },
    touchEnd(e) {
        //pageX大于100关闭master
        this.$refs.master.style = ``
        if(this.pageX <100){
            //不作处理（手指移动的距离小于100恢复原来状态）
        }else{
            this.hideMaster()
        }
    },
    toDetail(id){
      this.$router.push({
        path:'/detail?id='+id
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.master {
  height: 100%;
  width: 75%;
  position: fixed;
  top: 0;
  right: 0;
  transition: all 0.2s ease;
  z-index: 100;
  height: 100%;
  box-shadow: 0 0 0.5rem #eee;
  background: #fff;
  overflow-y: scroll;
  transform: translate3d(100%, 0, 0);
  .name {
    margin-left: 1px;
    font-size: 0.28rem;
    line-height: 0.48rem;
    background: #f2f2f2;
    padding-left: 0.3rem;
    color: #717171;
  }
  ul {
    margin-left: 0.1rem;
  }
  li {
    height: 1.4rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    p:first-child {
      font-size: 0.34rem;
      color: #5f687a;
    }
    p:nth-child(2) {
      margin-top: 0.1rem;
      font-size: 0.28rem;
      color: red;
    }
  }
  img {
    margin: 0 0.1rem 0 0.2rem;
    width: 1.8rem;
    height: 1.2rem;
  }
}
.master.active {
  transform: translate3d(0, 0, 0);
}
</style>
