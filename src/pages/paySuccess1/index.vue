<template>
  <div id="body">
    <img src="https://www.meifuyihao.com/public/uploads/images/小程序美达达图标/支付成功/zf_img.png" alt />
    <p>支付成功</p>
    <span @click="goToMyself">个人中心</span>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToMyself() {
      wx.navigateTo({
        url: "/pages/PersonalCenter/main"
      });
    }
  }
};
</script>

<style scoped>
#body {
  position: relative;
}
#body img {
  width: 220px;
  height: 220px;
  display: block;
  margin: 0px auto;
  margin-top: 100px;
}
#body span {
  width: 130px;
  height: 44px;
  background-color: #3e89e4;
  color: #ffffff;
  border-radius: 40px;
  text-align: center;
  line-height: 44px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 250px;
}
#body p{
  font-size: 18px;
  color: #333333;
  text-align: center;
  margin-top: -35px;
}
</style>
