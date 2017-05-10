<template>
  <div class="container">
    <top-bar :title="haha"></top-bar>
    <item v-for="item in itemList" :data="item"></item>
  </div>
</template>

<script>
  import topBar from './topBar.vue'
  import item from './item.vue'
  import axios from 'axios'

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
      axios({
        url: '/sign',
        method: 'GET',
        data: {
          url: location.href.split('#')[0]
        }
      })
      .then(function(res) {
        if(res.data) {
          console.log(res.data)
          var data = JSON.parse(res.data)
          // var data = res.data
          wx.config({
            debug: true,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['chooseImage']
          })
        }
      })
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
