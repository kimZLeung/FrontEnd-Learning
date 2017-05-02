import haha from './tes.js'
import Halo from './components/halo.vue'
import Vue from 'vue'
var env = require('../../../env.js').env

console.log('hahaha')
haha()

new Vue({
  el: '#app',
  template: '<Halo />',
  components: { Halo }
})

// webpack热替换，捕获替换事件
if(env() === 'dev') {
  if(module.hot) {
    module.hot.accept()
  }
}
