/**
 * 抽取Api请求
 * 作用：1.添加公共参数 2.动态修改域名
 * window.location.host 域名
 * navigator.userAgent 型号
 */
// 动态判断请求域名
const domain = /localhost/ig.test(window.location.host)?'http://baojia-test.chelun.com':'https://baojia.chelun.com';
//填充请求参数
function sendRequest(url){
    let ua = navigator.userAgent,
        os = '';
    // 添加系统参数
    if((/iPhone | iPad/ig).test(ua)){
        os = 'ios'
    }else{
        os = 'android';
    }
    let char = '?';
    if (/\?/.test(url)){
        char = '&';
    }
    url += `${char}os=${os}&_-${+new Date()}`
    return fetch(domain+url)
}
//获取车型数据
export const getBrandList = ()=>{
    return sendRequest('/v2-car-getMasterBrandList.html')
}
//获取车系图片
export const getImgList = (key)=>{
    return sendRequest('/v2-car-getImageList.html?SerialID='+key)
}
//获取车系目录图片
export const getCategoryImageList = (payload)=>{
    return sendRequest('/v2-car-getCategoryImageList.html?SerialID='+payload.key+'&ImageID='+payload.imgId+'&Page='+payload.page+'&PageSize=30')
}