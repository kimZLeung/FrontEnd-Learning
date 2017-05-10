import axios from 'axios'

const weFetch = (option) => {
  var instance = axios.create({
    baseURL: option.url,
    timeout: 30000
  })
  return instance({
    method: option.type,
    data: option.data || undefined
  })
}

export default weFetch
