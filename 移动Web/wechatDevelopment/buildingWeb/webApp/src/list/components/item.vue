<template>
  <div class="weui-panel__bd" :id="data">
    <!-- <img :alt="data" />
    <div class="mainContent">
      <h3>{{ data }}</h3>
      <span>{{ data }}</span>
    </div> -->
    <a href="javascript: void(0)" class="weui-media-box weui-media-box_appmsg">
      <div class="weui-media-box__hd">
        <img src="#" class="weui-media-box__thumb" />
      </div>
      <div class="weui-media-box__bd">
        <h4 class="weui-media-box__title">{{ data }}</h4>
        <p class="weui-media-box__desc">{{ data }}</p>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['data']
  }
</script>

<style scoped>

</style>
