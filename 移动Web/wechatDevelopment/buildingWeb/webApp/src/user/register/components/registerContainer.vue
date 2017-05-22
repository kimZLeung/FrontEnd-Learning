<template lang="html">
  <div>
    <wx-title target="注册用户" />
    <div id="form">
      <div class="weui-cells weui-cells_form">
        <wx-form @setData="handleData" :clicking="isClicking" title="手机号" reg="^\d{11}$" len="11" placeholder="请输入你的手机号" tips="请输入正确的手机号" :required="true" />
        <wx-form @setData="handleData" :clicking="isClicking" title="验证码" placeholder="请输入验证码" tips="请输入正确的验证码" :required="true" :imgSrc="imgSrc" />
        <wx-form @setData="handleData" :clicking="isClicking" title="登录密码" reg="^\w{16}$" len="16" placeholder="请输入你的登录密码" tips="请输入正确的登录密码" :required="true" :pass="true" />
        <wx-form @setData="handleData" :clicking="isClicking" title="真实姓名" reg="^[\u4e00-\u9fa5]+$" placeholder="请输入你的真实姓名" tips="真实姓名请输入中文" :required="true" />
      </div>
      <div class="weui-btn-area">
        <wx-btn :style_obj="btnObj" @click="testForm" />
        <button class="weui-btn weui-btn_default myBtn" @click="redirct_login">返回登录</button>
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
        title: '提交',
        type: 'primary',
        loading: false
      },
      imgSrc: '',
      formData: {},
      isClicking: false,
      formNumber: 4
    }
  },
  methods: {
    handleData: function(data) {
      this.formData[data.title] = data.val
      if(Object.keys(this.formData).length == this.formNumber) {
        this.toggleLoading(false)
        console.log(this.formData)
        // ajax
        //
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
    redirct_login: function() {
      var href = location.href.split('/')
      var mainly = href.slice(0, href.length - 1)
      mainly.push('login.html')
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
