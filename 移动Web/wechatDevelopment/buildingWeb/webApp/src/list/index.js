import container from './components/container.vue'
import Vue from 'vue'

new Vue({
  el: '#app',
  components: { container },
  render: h => h(container)
})

// webpack热替换，捕获替换事件
if(process.env.NODE_ENV === 'dev') {
  if(module.hot) {
    module.hot.accept()
  }
}
