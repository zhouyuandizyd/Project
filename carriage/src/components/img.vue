<template>
    <div class="img-car">
        <div class="title">
            <p>颜色</p>
            <p>车款</p>
        </div>
        <div class="img-default">
            <ul v-for="(item,index) in dataImg" :key="index"> 
                <li v-for="(value,key) in item.List" :key="key">
                    <img :style="{backgroundImage:`url(${value.Url.replace('{0}',value.LowSize)})`}">
                    <div v-if='key==0' @click="showMoreimg(item.Id,1,true)">
                        <p>{{item.Name}}</p>
                        <p>{{item.Count}}张</p>
                    </div>
                </li>
            </ul>
        </div>
        <ul class="img-list" v-show="moreimg" ref="imglist">
            <li v-for="(item,index) in List" :key="index">
                <img @click="clickSwiper(index)" :style="{backgroundImage:`url(${item.Url.replace('{0}',item.LowSize)})`}">
            </li>
        </ul>
        <div v-show="isShowSwiper" class="img-swiper" @click="hideSwiper">
            <swiper :options='swiperOption' ref="mySwiper">
                <swiper-slide v-for="(item,index) in List" :key="index">
                    <img :src="item.Url.replace('{0}',item.HighSize)" alt="">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <p v-if="isShowSwiper">{{swipe.activeIndex+'/'+(List.length)}}</p>
            </swiper>
        </div>
    </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex';
import 'swiper/dist/css/swiper.css';
import {swiper,swiperSlide} from 'vue-awesome-swiper'
export default {
    data(){
        return {
            // dataImg:[],List:[],isloading:true,
            showImg:'',
            key:0,
            moreimg:false,
            page:1,
            imgId:1
        }
    },
    components:{
        swiper,
        swiperSlide
    },
    computed:{
        ...mapState({
            dataImg:state=>state.img.dataImg,
            List:state=>state.img.List,
            isloading:state=>state.img,
            isShowSwiper:state=>state.img.isShowSwiper
        }),
        swiperOption(){
            return {
                on:{
                    slideNextTransitionEnd:()=>{
                        if(this.fetchingAll){
                            return
                        }
                        if(this.swipe.activeInde > this.List.length-5){
                            //加载下一页数据
                            this.fetchingAll = true,
                            this.getCategoryImageList({
                                cb:()=>{
                                    this.fetchingAll = false
                                }
                            })
                        }
                    }
                }
            }
        },
        swipe(){
            return this.$refs.mySwiper.swiper
        }
    },
    mounted(){
        let key = this.$route.query.id
        this.key = key
        this.getImgList(key)
        // fetch('https://baojia.chelun.com/v2-car-getImageList.html?SerialID='+key).then(res=>res.json()).then(res=>{
        //     this.dataImg = res.data
        // })
        let ele = this.$refs.imglist;
        ele.onscroll = (e)=>{
            //clientHeight表示元素可以看到内容的可见区域部分，等于window.innerHeight
            //scrollWidth、scrollHeight属性代表元素对象真实的宽高，即使有一部分看不到
            //scrollTop、scrollLeft代表元素对象最顶端/最左端到对象到当前窗口显示的局限内的距顶部/左边距的间隔，也是元素垂直/水平滚动了的距离，或者是元素卷帘卷走的视觉中看不到的部分
            //scrollHeight - scrollTop = clientHeight：当这两个条件成立时，也就代表垂直滚动条走到底了
            if(ele.scrollTop > (ele.scrollHeight- document.documentElement.clientHeight-20)&&this.isloading.isloading){
                this.isloading.isloading= false;
                this.page += 1;
                this.showMoreimg(this.imgId,this.page)
            }
        }
    },
    methods:{
        ...mapActions({
            getImgList:'getImgList',
            getCategoryImageList:'getCategoryImageList'
        }),
        ...mapMutations({
            showSwiper:'showSwiper'
        }),
        hideSwiper(e){
            if(e.target == e.currentTarget){
                this.showSwiper(false)
            }
        },
        clickSwiper(index){
            this.showSwiper(true)
            this.swipe.slideTo(index)
        },
        showMoreimg(imgId,pages,show){
            this.imgId = imgId
            let page = pages || 1
            if(show){
                this.moreimg = true
            }
            this.getCategoryImageList({key:this.key,imgId:imgId,page:page})
            // fetch('https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID='+this.key+'&ImageID='+imgId+'&Page='+page+'&PageSize=30').then(res=>res.json()).then(res=>{
            //     this.List = res.data.List
            //     setTimeout(()=>{
            //         this.isloading = true
            //     },0)
            // })
        }
    }
}
</script>
<style scoped>
@import url('./../assets/css/img');
</style>
