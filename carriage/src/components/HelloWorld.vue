<template>
  <!-- <List/> -->
  <div id="app">
    <div class="wrap" ref='wrap'>
      <List :list='newData' :getMasterList='getMasterList'/>
    </div>
    <Letter :letter='letter' :changeLetter='changeLetter'/>
    <MasterList :masterCls='masterCls' :masterList='masterList' :hideMaster='hideMaster'/>
  </div>
</template>

<script>
import List from "./common/list.vue";
import Letter from "./common/letter.vue";
import MasterList from "./common/MasterList.vue";
import {debounce,throttle,lazyLoad} from './utils/utils.js'
import {mapState} from 'vuex'
export default {
  name: "App",
  data() {
    return {
      // letter: [],
      // newData: [],
      masterList:[],
      masterCls:''
    };
  },
  computed:{
    ...mapState({
      newData:state=>state.index.newData,
      letter:(state)=>{
        return state.index.letter
      }
    })
    // newData(){
    //   return this.$store.state.index.newData
    // }
  },
  methods: {
    getNewList() {
      this.$store.dispatch('getBrandList')
    },
    getMasterList(id) {
      fetch("https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=" + id)
        .then(res => res.json())
        .then(res => {
          if(res.code === 1){
            this.masterList = res.data
            this.masterCls = 'active'
            setTimeout(()=>lazyLoad.init(),10)
          }else{
            alert(res.msg)
          }
        });
    },
    hideMaster(){
      this.masterCls = ''
    },
    changeLetter(letter){
      if(letter === '#'){
        return
      }
      let scrollTop = document.querySelector(`#${letter}`).offsetTop
      this.$refs.wrap.scrollTop = scrollTop
    }
  },
  mounted() {
    this.getNewList();
    let scroll = throttle(()=>{
      lazyLoad.loadImg()
    },500)
    this.$refs.wrap.onscroll = ()=>{
      scroll()
    }
    document.querySelector('.master').onscroll = ()=>{
      scroll()
    }
  },
  components: {
    List,
    Letter,
    MasterList
  }
};
</script>

<style lang='scss'>
@import "./../assets/css/style.css";
</style>
