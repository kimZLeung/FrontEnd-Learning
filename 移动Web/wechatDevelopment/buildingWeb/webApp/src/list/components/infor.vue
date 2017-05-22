<template lang="html">
  <transition name="right">
    <div class="container">
      <div class="topBar">
        <span @click="handleReturn" class="back"></span>
        <span class="title">{{ $route.params.building }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'infor',
  methods: {
    handleReturn(e) {
      this.$router.push('/list')
    }
  },
  created() {
    window.scroll(0, 0)
  }
}
</script>

<style lang="css">
  .container {
    width: 100%;
    position: absolute;
  }

  .topBar {
    width: 100%;
    position: relative;
    background-color: rgb(47, 180, 53);
  }

  .title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: max-content;
    height: min-content;
    color: white;
    font-size: 1.3rem;
  }

  .back {
    display: inline-block;
    padding: .4rem .8rem;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
  }

  .back::before {
    content: '';
    position: absolute;
    width: .2rem;
    height: 1rem;
    background-color: white;
    transform-origin: 50% 100%;
    transform: rotateZ(45deg);
    border-radius: 20%;
  }

  .back::after {
    content: '';
    position: absolute;
    width: .2rem;
    height: 1rem;
    background-color: white;
    transform-origin: 50% 100%;
    transform: rotateZ(135deg);
    border-radius: 20%;
  }

  .right-enter-active, .right-leave-active {
    transition: all .5s;
  }

  .right-enter, .right-leave-active {
    transform: translateX(100%);
  }
</style>
