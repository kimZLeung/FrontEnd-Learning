import haha from './tes.js'
import Halo from './components/halo.vue'
import Vue from 'vue'

const liang = 'kimz'
console.log(liang)
console.log('hahaha')
haha()

new Vue({
  el: '#app',
  template: '<Halo />',
  components: { Halo }
})

// webpack热替换，捕获替换事件
if(module.hot) {
  module.hot.accept()
}
