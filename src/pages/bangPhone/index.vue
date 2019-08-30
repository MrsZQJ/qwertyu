<template>
  <div id="body">
    <div class="title">请输入绑定的手机号码</div>
    <div class="shu">
      <img src="https://www.meifuyihao.com/public/uploads/images/%E6%89%8B%E6%9C%BA@2x.png" alt />
      <span>手机号码</span>
    </div>
    <input class="ipt" type="number" placeholder="请输入手机号码" v-model="phone" />
    <div class="shu">
      <img src="https://www.meifuyihao.com/public/uploads/images/%E9%AA%8C%E8%AF%81%E7%A0%81@2x.png" alt />
      <span>验证码</span>
    </div>
    <div class="por">
      <input class="ipt" v-model="ma" type="number" placeholder="请输入验证码" />
      <button :disabled="disable" class="btn" @click="getcode">{{msg}}</button>
    </div>
    <i-button @click="handleClick" type="primary" shape="circle" size="small">下一步</i-button>
    <i-toast id="toast" />
  </div>
</template>
<script>
const { $Toast } = require("../../../static/iview/base/index");
export default {
  data() {
    return {
      phone: "",
      msg: "获取验证码",
      ma: NaN,
      disable: false,
      yan_num: NaN
    };
  },
  methods: {
    handleClick() {
      if (this.yan_num1 != this.ma) {
        $Toast({
          content: "验证码错误!",
          icon: "prompt",
          mask: false
        });
      }
      wx.navigateTo({
        url: "/pages/resetPassword/main?phone=" + this.phone
      });
    },
    getcode() {
      var that = this;
      if (that.phone == "") {
        $Toast({
          content: "手机号码不能为空!",
          icon: "prompt",
          mask: false
        });
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(that.phone)) {
        $Toast({
          content: "手机号码格式不对!",
          icon: "prompt",
          mask: false
        });
        return false;
      }
      that.times();
      this.$axios
        .post("routine/Merchant/getPhoneCode", { phone: that.phone })
        .then(function(response) {
          if (response.data.code == 400) {
            $Toast({
              content: "本日验证码超出上限!",
              icon: "prompt",
              mask: false
            });
          } else if (response.data.code == 200) {
            that.yan_num = response.data.data;
          }
        });
    },
    times() {
      var tim = 60;
      var that = this;
      this.disable = true;
      var timer = setInterval(function() {
        tim -= 1;
        that.msg = tim + "秒后重新获取";
        if (tim == 0) {
          clearInterval(timer);
          that.msg = "获取验证码";
          that.disable = false;
        }
      }, 1000);
    }
  }
};
</script>
<style scoped>
button[disabled] {
  color: #ffffff !important;
  background-color: #cccccc !important;
}
.title {
  height: 49px;
  padding-left: 15px;
  line-height: 49px;
  font-size: 15px;
  color: #333333;
  font-weight: 600;
}
.shu {
  height: 49px;
  line-height: 49px;
}
.shu img {
  margin-left: 15px;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}
.shu span {
  font-size: 15px;
  color: #333333;
}
.ipt {
  width: 326px;
  height: 49px;
  margin-left: 49px;
  font-size: 15px;
  color: #999999;
}
.por {
  position: relative;
  margin-bottom: 81px;
}
.btn {
  /* width: 74px; */
  height: 24px;
  border-radius: 12px;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  background-color: #0086f7;
  padding: 0px 8px;
  position: absolute;
  top: 12px;
  right: 15px;
}
.por .ipt {
  width: 246px;
  margin-right: 80px;
}
</style>
