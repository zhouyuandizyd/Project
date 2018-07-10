<template>
    <div class="car">
        <div class="content">
            <div class="img">
                <img :src="detailData.CoverPhoto.replace('{0}',detailData.CoverPhotoSize)" alt="">
            </div>
            <div class="info">
                <p>{{detailData.market_attribute&&detailData.market_attribute.dealer_price}}</p>
                <p>指导价 {{detailData.market_attribute&&detailData.market_attribute.official_refer_price}}</p>
                <div class="action">
                    <button>询问底价</button>
                </div>
            </div>
            <div class="car-list">
                <div class="c-type">
                    <span class="active">全部</span>
                    <span>2018</span>
                    <span>2017</span>
                </div>
                <div class="c_list" v-for="(item,index) in detailData.list" :key='index'>
                     <p class="p_type">{{item.exhaust_str}}/{{item.max_power_str}}{{item.inhale_type}}</p>
                     <ul>
                       <li>
                         <p>{{item.year}}款{{item.car_name}}</p>
                         <p>{{item.trans_type}}</p>
                         <p>
                           <span>指导价 {{item.market_attribute&&item.market_attribute.official_refer_price}}</span>
                           <span> {{item.market_attribute&&item.market_attribute.dealer_price}}起</span>
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
      detailData: []
    };
  },
  mounted() {
    let id = this.$route.query.id;
    fetch(
      "https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=" + id
    )
      .then(res => res.json())
      .then(res => {
        this.detailData = res.data;
        // console.log('pic',this.detailData.CoverPhoto.replace('{0}',this.detailData.CoverPhotoSize))
      });
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
    padding: .2rem 0.3rem;
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
