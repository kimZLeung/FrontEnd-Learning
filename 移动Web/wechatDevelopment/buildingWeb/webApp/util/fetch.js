import $ from 'jq'

const weFetch = (option) => {
  return $.ajax({
    url: option.url,
    type: option.type || 'GET',
    data: option.data || {},
  })
}

weFetch.setType = (type) => {
  this.contentType = type || 'text/plain'
}

export default weFetch
