<template>
    <div class="car">
        <div class="content">
            <div class="img" @click="showImg">
                <!-- <img :src="detailData.CoverPhoto.replace('{0}',detailData.CoverPhotoSize)" alt=""> -->
                <img :src="detailData.CoverPhoto" alt="">
                <span>{{detailData.pic_group_count}}张照片</span>
            </div>
            <div class="info">
                <p>{{detailData.market_attribute&&detailData.market_attribute.dealer_price}}</p>
                <p>指导价 {{detailData.market_attribute&&detailData.market_attribute.official_refer_price}}</p>
                <div class="action">
                    <button @click="askMess(detailData)">{{detailData.BottomEntranceTitle}}</button>
                </div>
            </div>
            <div class="car-list">
                <div class="c-type">
                    <span v-for="(item,index) in yearArr" :key="index" @click="changePart(index)" :class="index==idx?'active':''">{{item}}</span>
                </div>
                <div class="c_list" v-for="(item,index) in newList" :key='index'>
                     <p class="p_type">{{item.title}}</p>
                     <ul>
                       <li v-for="(value,index) in item.list" :key="index">
                         <p>{{value.market_attribute.year}}款 {{value.car_name}}</p>
                         <p>{{value.horse_power}}马力 {{value.gear_num}}档</p>
                         <p>
                           <span>指导价 {{value.market_attribute&&value.market_attribute.official_refer_price}}</span>
                           <span> {{value.market_attribute&&value.market_attribute.dealer_price}}起</span>
                         </p>
                         <button>询问底价</button>
                       </li>
                     </ul>
                </div>
            </div>
        </div>
        <div class="bottom">
          <p>询问底价</p>
          <p>本地经销商为你报价</p>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      detailData: [],
      yearArr: [],
      carList: [],
      newList: [],
      idx: 0
    };
  },
  mounted() {
    let id = this.$route.query.id;
    fetch(
      "https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=" + id
    )
      .then(res => res.json())
      .then(res => {
        //筛选年份
        this.detailData = res.data;
        let list = this.detailData.list;
        let yearArr = ["全部"],
          carList = [{ year: "全部", list: [] }];
        list.forEach((item, index) => {
          let year = item.market_attribute.year;
          if (yearArr.indexOf(year) === -1) {
            yearArr.push(year);
            carList.push({
              year: year,
              list: [item]
            });
          } else {
            carList.forEach(value => {
              if (value.year.indexOf(year) != -1) {
                value.list.push(item);
              }
            });
          }
          carList[0].list.push(item);
        });
        this.carList = carList;
        this.yearArr = yearArr;
        this.changePart(0);
      });
  },
  methods: {
    //点击询问底价跳转
    askMess(detailData){
      let dataLink = detailData.BottomEntranceLink;
      let id = dataLink.match(/car\/(\S*)/)
      this.$router.push({
        path:'/askminprice?id='+id[1]
      })
    },
    //列表排序
    changePart(index) {
      this.idx = index;
      let listTitle = [],
        newList = [];
      this.carList[index].list.sort((a, b) => {
        if (a.exhaust < b.exhaust) {
          return -1;
        } else if (a.exhaust > b.exhaust) {
          return 1;
        } else {
          if (a.max_power < b.max_power) {
            return -1;
          } else if (a.max_power > b.max_power) {
            return 1;
          } else {
            return b.inhale_type - a.inhale_type;
          }
        }
      });
      //按类型排列
      this.carList[index].list.forEach(value => {
        let title = value.exhaust_str + "/" + value.horse_power + "/" + value.inhale_type;
        if (listTitle.indexOf(title) === -1) {
          listTitle.push(title);
          newList.push({
            title: title,
            list: [value]
          });
        } else {
          newList.forEach(item => {
            if (item.title === title) {
              item.list.push(value);
            }
          });
        }
        this.newList = newList;
      });
    },
    //点击图片跳转带图片列表
    showImg(){
      let id = this.detailData.SerialID;
      this.$router.push({path:'/img?id='+id})
    }
  }
};
</script>
<style lang="scss" scoped>
.car {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
}
.content {
  flex: 1;
  overflow-y: scroll;
  .img {
    width: 100%;
    height: 3.29rem;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    span {
      position: absolute;
      bottom: 0.1rem;
      right: 0.1rem;
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
      padding: 0.08rem 0.2rem;
      font-size: 0.26rem;
      border-radius: 20px;
    }
  }
  .info {
    padding: 0.36rem 0.2rem 0.3rem;
    background: #fff;
    position: relative;
    p {
      font-size: 0.36rem;
      color: red;
      font-weight: 500;
    }
    p:nth-child(2) {
      margin-top: 0.2rem;
      font-size: 0.26rem;
      color: silver;
    }
    .action {
      padding-top: 0.2rem;
      font-size: 0.32rem;
      height: 0.7rem;
      width: 50%;
      position: absolute;
      right: 0.1rem;
      top: 0.22rem;
      button {
        width: 100%;
        background: #00afff;
        color: #fff;
        border-radius: 0.1rem;
        font-size: 0.32rem;
        height: 0.7rem;
        width: 3.45rem;
        border: none;
        box-sizing: border-box;
      }
    }
  }
  .car-list .c-type {
    border-top: 0.15rem solid #f4f4f4;
    padding: 0.2rem 0.3rem;
    font-size: 0.32rem;
    background: #fff;
    span {
      padding-right: 0.46rem;
    }
    .active {
      color: #3aacff;
    }
  }
  .c_list {
    .p_type {
      padding: 0 0.2rem;
      height: 0.5rem;
      line-height: 0.5rem;
      font-size: 0.26rem;
      color: #999;
      background: #f4f4f4;
    }
    ul {
      background: #fff;
      li {
        padding: 0 0.2rem;
        border-bottom: 0.18rem solid #f4f4f4;
        overflow: hidden;
        p {
          &:nth-child(1) {
            padding: 0.26rem 0 0.18rem;
            font-size: 0.3rem;
            line-height: 1;
            color: #3d3d3d;
          }
          &:nth-child(2) {
            color: #bdbdbd;
            font-size: 0.26rem;
          }
          &:nth-child(3) {
            text-align: right;
            padding-bottom: 0.1rem;
            color: #818181;
            span {
              font-size: 0.24rem;
              &:nth-child(2) {
                font-size: 0.3rem;
                color: #ff2336;
                margin-left: 0.1rem;
              }
            }
          }
        }
      }
      button {
        border: none;
        border-top: 1px solid #eee;
        width: 110%;
        height: 0.8rem;
        font-size: 0.32rem;
        color: #00afff;
        background: #fff;
        font-weight: 500;
        margin-left: -0.3rem;
      }
    }
  }
}
.bottom {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 99;
  background: #3aacff;
  height: 1.1rem;
  color: #fff;
  text-align: center;
  p {
    font-size: 0.32rem;
    margin-top: 0.12rem;
    font-weight: 500;
    &:nth-child(2) {
      font-size: 0.24rem;
      margin: 0.1rem 0;
    }
  }
}
</style>
