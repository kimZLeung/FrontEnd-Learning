<template lang="html">
  <div class="container">
    <span class="title">{{ target }}</span>
  </div>
</template>

<script>
export default {
  props: ['target']
}
</script>

<style lang="css" scoped>
  .container {
    width: 100%;
    height: 5rem;
    text-align: center;
    background-image: linear-gradient(#2cb532 5%, white 95%);
  }

  .title {
    font-size: 2.2rem;
    line-height: 5rem;
    color: #f5f3f3
  }
</style>
