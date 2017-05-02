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

if(module.hot) {
  module.hot.accept()
}
