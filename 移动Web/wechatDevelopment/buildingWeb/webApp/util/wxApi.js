import weFetch from './fetch'
import config from '../../config'

const getWxApi = () => {
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
        jsApiList: ['chooseImage']
      })
    }
  })
}

export default getWxApi
