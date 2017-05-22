<template>
  <div>
    <div class="topBar">
      <span class="title">{{ title }}</span>
    </div>
    <div :class="barStyle" @click="handleClick">
      <form class="weui-search-bar__form" ref="searchForm" @submit="handleSubmit">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input type="search" class="weui-search-bar__input" ref="searchInput" placeholder="搜索" @blur="handleBlur" required />
          <a class="weui-icon-clear" id="searchClear" @click="clear"></a>
        </div>
        <label class="weui-search-bar__label searchText">
          <i class="weui-icon-search"></i>
          <span>搜索</span>
        </label>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isSearching: false,
        show: false
      }
    },
    computed: {
      barStyle: function() {
        return {
          ['weui-search-bar']: true,
          ['weui-search-bar_focusing']: this.isSearching
        }
      }
    },
    methods: {
      handleClick(e) {
        this.isSearching = true
        this.$refs.searchInput.focus()
        this.$refs.searchForm.reset()
      },
      handleBlur(e) {
        this.isSearching = false
      },
      clear(e) {
        this.$refs.searchForm.reset()
      },
      handleSubmit(e) {
        var e = e || window.event
        e.preventDefault()
        this.$emit('submit', this.$refs.searchInput.value)
      }
    },
    props: ['title']
  }
</script>

<style scoped>
  .topBar {
    width: 100%;
    height: 50px;
    background-color: rgb(47, 180, 53);
    color: white;
    /*display: flex;*/
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

  /*.topSearch {
    flex: .11;
    color: white;
    line-height: 50px;
    font-size: 1.3em;
  }*/

  .inforBox {
    word-warp: word-break;
    word-break: break-all;
    position: absolute;
    width: 80%;
    left: 10%;
  }

  .searchText {
    transform-origin: 0px 0px 0px;
    opacity: 1;
    transform: scale(1, 1)
  }

</style>
