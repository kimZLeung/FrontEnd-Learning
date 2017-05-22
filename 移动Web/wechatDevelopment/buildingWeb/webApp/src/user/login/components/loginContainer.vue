<template lang="html">
  <div>
    <wx-title target="登录" />
    <div id="form">
      <div class="weui-cells weui-cells_form">
        <wx-form @setData="handleData" :clicking="isClicking" title="登录账号" reg="^\d{11}$" len="11" placeholder="请输入你的登录账号" tips="请输入正确的登录账号" :required="true" />
        <wx-form @setData="handleData" :clicking="isClicking" title="登录密码" reg="^\w{0,16}$" len="16" placeholder="请输入你的登录密码" tips="请输入正确的登录密码" :required="true" :pass="true" />
      </div>
      <div class="weui-btn-area">
        <wx-btn :style_obj="btnObj" @click="testForm" />
        <button class="weui-btn weui-btn_default myBtn" @click="redirct_register">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import wxForm from '../../public/form.vue'
import wxBtn from '../../public/button.vue'
import wxTitle from '../../public/title.vue'

export default {
  components: {
    wxForm,
    wxBtn,
    wxTitle
  },
  data () {
    return {
      btnObj: {
        title: '登录',
        type: 'primary',
        loading: false
      },
      formData: {},
      isClicking: false,
      formNumber: 2
    }
  },
  methods: {
    handleData: function(data) {
      this.formData[data.title] = data.val
      if(Object.keys(this.formData).length == this.formNumber) {
        this.toggleLoading(false)
        console.log(this.formData)
        // ajax
      }
    },
    testForm: function() {
      var self = this
      weui.form.validate('#form', function(err) {
        if(!err) {
          self.toggleLoading.call(self, true)
        }
      })
    },
    toggleLoading: function(state) {
      this.isClicking = state || !this.isClicking
      this.btnObj.loading = state || !this.btnObj.loading
    },
    redirct_register: function() {
      var href = location.href.split('/')
      var mainly = href.slice(0, href.length - 1)
      mainly.push('register.html')
      location.href = mainly.join('/')
    }
  }
}
</script>

<style lang="css" scoped>
  .myBtn {
    margin-top: 0.5rem;
    cursor: pointer;
  }
</style>
