<template lang="html">
  <div :class="cellClass">
    <div class="weui-cell__hd">
      <label class="weui-label">{{ title }}</label>
    </div>
    <div class="weui-cell__bd">
      <input v-if="pass" v-model="val" type="password" @focus="clear" @blur="check" class="weui-input" :required="required" :pattern="reg" :maxlength="len" :placeholder="placeholder" :notMatchTips="tips" />
      <input v-else v-model="val" @focus="clear" @blur="check" class="weui-input" :required="required" :pattern="reg" :maxlength="len" :placeholder="placeholder" :notMatchTips="tips" />
    </div>
    <div class="weui-cell__ft">
      <i class="weui-icon-warn"></i>
      <img v-if="!!imgSrc" :src="imgSrc" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'reg', 'len', 'placeholder', 'tips', 'required', "clicking", "imgSrc", "pass"],
  data () {
    return {
      val: '',
      cellClass: {
        'weui-cell': true,
        'weui-cell_warn': false
      },
    }
  },
  methods: {
    check: function() {
      if(!this.required) {
        return
      }
      var reg = new RegExp(this.reg)
      if(!reg.test(this.val) || !this.val) {
        this.cellClass['weui-cell_warn'] = true
      }
    },
    clear: function() {
      if(this.cellClass['weui-cell_warn'] == false) {
        /**
         *  处理一下clear的时候这个属性本来就是false的时候，主要是因为用户一开始就点击提交表单的话就会出现这种情况
         *  如果直接设成false会被Vue自带的优化判断处理掉，如果同步先设true然后设成false，也会被优化成只有设成false的情况
         *  可能是JS的引擎自行的优化，所以setTimeout走一个异步的流程，稍微取巧地触发v-bind绑定的Class的修改
         */
        this.cellClass['weui-cell_warn'] = true
        var self = this
        setTimeout(function() {
          self.cellClass['weui-cell_warn'] = false
        }, 0)
      } else {
        this.cellClass['weui-cell_warn'] = false
      }
    }
  },
  watch: {
    clicking: function(val, oldVal) {
      if(!oldVal) {
        this.$emit('setData', {
          title: this.title,
          val: this.val
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>

</style>
