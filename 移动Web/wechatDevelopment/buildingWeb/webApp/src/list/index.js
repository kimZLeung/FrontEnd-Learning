// import container from './components/listContainer.vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  el: '#app',
  router,
  // components: { container },
  // render: h => h(container)
  components: { App },
  render: h => h(App)
})

// webpack热替换，捕获替换事件
if(process.env.NODE_ENV === 'dev') {
  if(module.hot) {
    module.hot.accept()
  }
}
