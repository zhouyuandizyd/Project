//获取歌曲列表
export let getMusicList = ()=>{
  return new Promise((resolve, reject)=>{
    wx.request({
        url: 'https://www.easy-mock.com/mock/5b5713324ea1ef51cf6fa271/list/list',
      success:(res)=>{
        resolve(res.data)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}