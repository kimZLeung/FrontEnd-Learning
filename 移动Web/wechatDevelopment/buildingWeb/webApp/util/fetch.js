import axios from 'axios'
import config from '../../config'

const instance = axios.create({
  // baseURL: config.host ? config.host + '/' : '/'
  baseURL: '/'    // 用于本地调试
})

const dataList = ['post', 'put', 'PATCH']

const weFetch = (option) => {
  if(!option.url) {
    console.error('使用weFetch时请先填入url')
    return
  }

  let requestPromise

  dataList.forEach((method) => {
    if(option.type && option.type === method) {
      requestPromise = instance.request({
        url: option.url,
        method: option.type,
        data: option.data || undefined
      })
    }
  })

  if(!requestPromise) {
    requestPromise = instance.request({
      url: option.url,
      method: option.type || 'get',
      params: option.data || undefined
    })
  }

  return requestPromise
}

export default weFetch
