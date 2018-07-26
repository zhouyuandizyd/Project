// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: {}
    },
    //音频播放
    audioPlay: function () {
        this.audioCtx.play()
    },
    audioPause: function () {
        this.audioCtx.pause()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.index = options.index
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let list = wx.getStorageSync('list');
        this.setData({
            info: list[this.index]
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})