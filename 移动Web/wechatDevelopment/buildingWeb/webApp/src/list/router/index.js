import Vue from 'vue'
import Router from 'vue-router'
import listRouter from './listRouter'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // },
  routes: listRouter
})
