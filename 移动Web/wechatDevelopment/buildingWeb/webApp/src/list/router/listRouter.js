import infor from '../components/infor.vue'
import listContainer from '../components/listContainer.vue'

export default [{
  path: '/',
  redirect: '/list'
}, {
  path: '/list',
  component: listContainer
}, {
  path: '/infor/:building',
  name: 'infor',
  component: infor
}]
