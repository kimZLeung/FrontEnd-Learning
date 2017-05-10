<template>
  <div>
    <div class="topBar">
      <span @click="handleTitle">{{ title }}</span>
      <i @click="handleClick" class="weui-icon-search"></i>
    </div>
    <transition name="fade">
      <div class="weui-panel weui-panel_access inforBox" v-if="show">
        sdfsadfasdfsadfasfdasfasdfasfasdfasdfsadfasfasdfsafsdfasdfsdafasfasfsadfasfds
      </div>
    </transition>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        show: false
      }
    },
    methods: {
      handleClick(e) {
        // $.alert(this.title)
      },
      handleTitle(e) {
        this.show = !this.show
      }
    },
    props: ['title']
  }
</script>

<style scoped>
  .topBar {
    width: 100%;
    height: 50px;
    background-color: rgb(35, 145, 210);
    color: white;
    display: flex;
  }

  span {
    display: block;
    text-align: center;
    line-height: 50px;
    flex: 1;
    font-size: 1.3em;
    transform: translateX(5%)
  }

  i {
    flex: .11;
    color: white;
    line-height: 50px;
    font-size: 1.3em;
  }

  .inforBox {
    word-warp: word-break;
    word-break: break-all;
    position: absolute;
    width: 80%;
    left: 10%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
