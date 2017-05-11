<template>
  <div class="container">
    <top-bar :title="haha"></top-bar>
    <item v-for="item in itemList" :data="item" :key="item"></item>
  </div>
</template>

<script>
  import topBar from './topBar.vue'
  import item from './item.vue'
  import axios from 'axios'
  import getWxApi from 'wxApi'

  export default {
    data() {
      return {
        haha: 'haha',
        itemList: ['haha', 'hehe', 'lala', 'ffff', 'oooo']
      }
    },
    methods: {
      go() {
        this.haha = 'bibi'
      }
    },
    created() {
      // ajax
      getWxApi()
    },
    components: {
      topBar,
      item
    }
  }

</script>

<style scoped>
  .container {
    width: 100%;
  }
</style>
