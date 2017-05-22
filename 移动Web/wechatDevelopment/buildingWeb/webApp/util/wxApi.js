import weFetch from './fetch'
import config from '../../config'

const getWxApi = (apiList) => {

  const finalList = Array.from(apiList ? new Set([...apiList, ...config.apiList]) : config.apiList)
  
  weFetch({
    url: '/sign',
    data: {
      url: location.href.split('#')[0]
    }
  })
  .then(function(res) {
    if(res.data) {
      var data = res.data
      wx.config({
        debug: true,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: finalList
      })
    }
  })
}

export default getWxApi
