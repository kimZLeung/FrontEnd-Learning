<template>
  <div>
    <h1>Halo World {{ msg }}</h1>
    <div class="weui-grids">
      <a href="javascript:void(0)" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="images/icon_nav_button.png" alt="">
        </div>
        <p class="weui-grid__label">
          Button
        </p>
      </a>
      <a href="javascript:void(0)" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="images/icon_nav_cell.png" alt="">
        </div>
        <p class="weui-grid__label">
          List
        </p>
      </a>
      <a href="javascript:void(0)" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="images/icon_nav_cell.png" alt="">
        </div>
        <p class="weui-grid__label">
          Haha
        </p>
      </a>
      <a href="javascript:void(0)" class="weui-grid js_grid">
        <div class="weui-grid__icon">
          <img src="images/icon_nav_cell.png" alt="">
        </div>
        <p class="weui-grid__label">
          Haha
        </p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        msg: '33'
      }
    }
  }
</script>

<style scoped>
  h1 {
    color: red;
    text-align: center
  }
</style>
