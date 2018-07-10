<template>
    <div class="list_wrap">
        <div v-for='(item,index) in list' :key='index' class="list">
            <h2>{{item.spelling}}</h2>
            <ul>
                <li v-for='(item,index) in item.list' :key='index'>
                    <img v-lazy="item.CoverPhoto">
                    <p>{{item.Name}}</p>
                </li>
            </ul>
        </div>
        <div class="letter">
            <ol v-for='(item,index) in letter' :key='index'> 
                <li @click='toggle(index)'>{{item}}</li>
            </ol>
        </div>
    </div>
</template>
<script>

import axios from "axios";
export default {
  data() {
    return {
      list: [],
      letter: []
    };
  },
  mounted: function() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get("/getList").then(res => {
        this.list = res.data.data;
        this.setList(this.list);
      });
    },
    setList(list) {
      let letter = [],
        newData = [];
      list.forEach(item => {
        let Letter = item.Spelling.substring(0, 1);
        if (letter.indexOf(Letter) === -1) {
          letter.push(Letter);
          newData.push({
            spelling: Letter,
            list: [item]
          });
        } else {
          newData.forEach((value, key) => {
            if (Letter === value.spelling) {
              value.list.push(item);
            }
          });
        }
      });
      this.list = newData;
      this.letter = letter;
      console.log(this.list);
    },
    toggle(ownindex){
      let list_wrap = document.querySelector('.list_wrap')
      let jump = Array.from(document.querySelectorAll('h2'))
      jump.forEach((item,index)=>{
        if(ownindex === index){
          list_wrap.scrollTop = item.offsetTop;
          return
        }
      })
      // window.hash = index
    }
  }
};
</script>
<style lang='scss'>
.list_wrap {
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  .list {
    h2 {
      font-weight: normal;
      font-size: .28rem;
      line-height: .4rem;
      background: #f4f4f4;
      padding-left: .3rem;
      color: #aaa;
    }
    ul {
      width: 100%;
      margin: 0 .3rem;
      li {
        display: flex;
        align-items: center;
        height: 1rem;
        border-bottom: 1px solid #ddd;
        img {
          flex: 1;
          height: .8rem;
        }
        p {
          flex: 9;
          font-size: .32rem;
          margin-left: .4rem;
        }
      }
    }
  }
  .letter {
    z-index: 99;
    position: fixed;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    li {
      padding:0 .15rem;
      color: #666;
      font-size: 0.26rem;
      line-height: 1.4;
      display: inline-block;
    }
  }
}
</style>
