<template>
  <transition name="left">
    <div class="container">
      <top-bar :title="haha" @submit="handleSubmit"></top-bar>
      <div class="weui-panel weui-panel_access" @click="itemClick">
        <item v-for="item in itemList" :data="item" :key="item"></item>
      </div>
    </div>
  </transition>
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
        itemList: ['haha', 'hehe', 'lala', 'ffff', 'oooo', 'dqwd', '123', 'oooo', 'dqwd', '123']
      }
    },
    methods: {
      handleSubmit(data) {
        // ajax 搜索接口 data就是搜索关键字
        console.log(data)
      },
      findParent(self, className) {
        if(self.className !== className) {
          return this.findParent(self.parentNode, className)
        } else {
          return self
        }
      },
      itemClick(e) {
        var e = e || window.event
        // 找到item的节点获取需要获取信息的id
        const activeIt = this.findParent(e.target, 'weui-panel__bd')
        // ajax 拿到数据，跳转至详细介绍页
        // 
        this.$router.push({ name: 'infor', params: { building: activeIt.id }})
      }
    },
    created() {
      // ajax 通过config获取JSSDK权限
      // getWxApi()
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
    position: absolute;
  }

  .left-enter-active, .left-leave-active {
    transition: all .5s;
  }

  .left-enter, .left-leave-active {
    transform: translateX(-100%);
  }
</style>
