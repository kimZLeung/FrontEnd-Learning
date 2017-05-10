<template>
  <div class="item">
    <img :alt="data" />
    <div class="mainContent">
      <h3>{{ data }}</h3>
      <span>{{ data }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data']
  }
</script>

<style scoped>
  .item {
    width: auto;
    height: 120px;
    background-color: white;
    border: 1px solid rgb(206, 202, 202);
    display: flex;
  }

  img {
    flex: .38;
    width: 100%;
    height: 80%;
    margin: auto 2%;
  }

  .mainContent {
    flex: .62;
    height: 80%;
    margin: auto 2%;
    display: flex;
    flex-direction: column;
  }

  h3 {
    flex: .5
  }

  h4 {
    flex: .5
  }
</style>
