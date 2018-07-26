import {
    getMusicList
} from "../../utils/net";

//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        allList: [], //全部歌曲
        list: [], //部分歌曲
        index: 1, //当前已加载页数
        current: 0, //当前播放音乐
        precent: 0, //当前音乐播放进度，百分比0~100,
        nameList: [], //歌名列表
        answer: [], //存放正确答案
        myAnswer: [], //存放我的答案
        currentAnswer:{}//存放当前歌曲的选择答案
    },
    //点击跳路由
    click(e) {
        let index = e.currentTarget.dataset.index;
        //缓存
        // wx.setStorageSync('list', this.data.allList);
        //路由跳转
        wx.navigateTo({
            url: '../detail/detail?index=' + index,
        })
    },
    //获取歌曲数据
    onShow() {
        wx.showLoading({
            title: '加载中...'
        })
        getMusicList().then(res => {
            console.log(res)
            this.setData({
                allList: res.songs,
                list: res.songs.slice(0, 10)
                
            }, () => {
                wx.hideLoading()
            })
            // this.play(this.data.allList[this.data.current].src)//当前歌曲
            this.list = this.randomList('src')//歌曲列表
            this.setData({//歌曲名字
                nameList: this.randomList('title')
            })
            this.play(this.list[this.data.current])//当前歌曲(随机)
        })
    },
    //音乐播放
    play(src) {
        if(this.audio){
            this.audio.destroy()
        }
        let duration = 0,
            start = 0
        this.audio = wx.createInnerAudioContext();
        this.audio.src = src;//当前音乐路径
        this.audio.autoplay = false //音频设置是否自动播放
        //音频播放事件
        this.audio.onPlay(() => {
            let inter = setInterval(() => {
                duration = this.audio.duration; //当前音频的长度
                if (duration) {
                    clearInterval(inter);
                    start = (Math.random() * (duration - 10));
                    this.audio.seek(start); //跳转到指定位置，单位 s
                    //进度条更新
                    let precentInter = setInterval(() => {
                        this.setData({
                            precent: this.data.precent + 0.1
                        });
                        if (this.data.precent >= 100) {
                            clearInterval(precentInter);
                        }
                    }, 10)
                }
            }, 10);
        })
        //音频播放进度更新事件
        this.audio.onTimeUpdate(() => {
            let time = this.audio.currentTime; //当前音频的播放位置
            //console.log(time, start + 10)
            if (duration && time > start) {
                if (time > start + 10) {
                    this.audio.stop();
                    if (this.data.current == 9) {
                        // 判断猜歌结果
                        let right = 0;
                        for (let i = 0, len = this.data.answer.length; i < len; i++) {
                            if (this.data.answer[i] == this.data.myAnswer[i]) {
                                right++;
                            }
                        }
                        wx.showToast({
                            title: (right / 10) * 100 + '%'
                        })
                        return;
                    }
                    if (this.data.myAnswer.length == this.data.current) {
                        this.setData({
                            myAnswer: this.data.myAnswer.concat(''),
                        })
                    }
                    this.setData({
                        current:this.data.current+1,
                        nameList:this.randomList('title'),
                        precent:0,
                        currentAnswer:{}
                    },()=>{
                        this.play(this.list[this.data.current])
                    })
                }
            }
        })
        //音频播放错误事件
        this.audio.onError(error => {
            console.log(error)
        })
    },
    //点击回答问题
    clickAnswer(e){
        let name = e.currentTarget.dataset.name,
            index = e.currentTarget.dataset.index
        if(this.data.myAnswer.length === this.data.current){
            //console.log('...current', this.data.answer[this.data.current])
            this.setData({
                myAnswer:this.data.myAnswer.concat(name),
                currentAnswer:{
                    index,
                    type:name == this.data.answer[this.data.current]?'primary':'warn'
                }
            })
        }
        console.log(this.data.myAnswer)
    },
    //随机歌名、歌曲
    randomList(type) {
        let list = [...this.data.allList],
            newList = [],
            answer = []
        //缓存
        wx.setStorageSync("list", list)
        for (let i = 0, len = list.length; i < len; i++) {
            let index = Math.floor(Math.random() * list.length);
            newList.push(list[index][type])
            if(type == 'src'){
                answer.push(list[index].title)
            }
            list.splice(index, 1)
        }
        if(type == 'src'){
            this.setData({
                answer
            })
        }
        console.log('...newList',newList)
        console.log('...answer', this.data.answer)
        return newList
    },
    //下拉刷新
    onPullDownRefresh() {
        wx.showLoading({
            title: '刷新中...',
        })
        setTimeout(() => {
            wx.hideLoading()
        }, 2000)
    },
    //上拉加载
    onReachBottom() {
        console.log('上拉加载更多')
        let list = wx.getStorageSync('list')
        this.setData({
            index: this.data.index++,
            list: list.slice(0, this.data.index * 10)
        })
    }
})