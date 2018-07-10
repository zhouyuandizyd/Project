<template>
    <ol class="letter"
    @touchstart='touchStart'
    @touchmove='touchMove'> 
        <li v-for='(item,index) in letter' :key='index'>{{item}}</li>
    </ol>
</template>
<script>
export default {
  props: {
    letter: {
      type: Array
    },
    changeLetter:{
        type: Function
    }
  },
  methods:{
      touchStart(){
          this.height = window.innerWidth/750*100*0.4;
          this.offsetTop = (window.innerHeight - this.height*this.letter.length)/2
      },
      touchMove(e){
          let touch = e.touches[0]
          let index = parseInt((touch.pageY - this.offsetTop)/this.height)
          if(index < 0){
              index = 0
          }else if(index > this.letter.length-1){
              index = this.letter.length-1
          }
          console.log('index...', index, this.letter[index]);
          this.changeLetter(this.letter[index])
      }
  }
};
</script>
<style lang='scss' scoped>
.letter{
    position: fixed;
    top: 50%;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: .24rem;
    transform: translateY(-50%);
    li{
        font-weight: 500;
        color: #666;
        padding: .02rem .1rem;
        height: .4rem;
        box-sizing: border-box;
    }
}
</style>
