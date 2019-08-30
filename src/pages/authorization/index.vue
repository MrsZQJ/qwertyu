<template>
  <div id="body" v-if="isHide">
    <img src="https://www.meifuyihao.com/public/uploads/images/user.png" />
    <div class="container">
      <p>申请获取以下权限</p>
      <p>获得你的公开信息(昵称，头像等)</p>
      <button
        class="bottom"
        type="primary"
        lang="zh_CN"
        open-type="getUserInfo"
        @getuserinfo="bindGetUserInfo"
      >授权登录</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isHide: true,
      pinkid: 0
    };
  },
  created() {},
  onLoad(options) {
    var scene = decodeURIComponent(options.scene);
    this.pinkid = scene.split("=")[1];
    //this.pinkid=24;
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: "https://www.meifuyihao.com/index.php/routine/logins/setCode",
            method: "post",
            dataType: "json",
            data: { info: res },
            success: function(response) {
              wx.setStorageSync("openid", response.data.openid);
              wx.setStorageSync("session_key", response.data.session_key);
            }
          });
        } else {
        }
      }
    });
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: function(res) {
              wx.navigateTo({
                url: "/pages/groupDetail/main?pinkid=" + that.pinkid
              });
            }
          });
        } else {
          this.isHide = true;
        }
      }
    });
  },
  methods: {
    getSett() {},
    bindGetUserInfo(e) {
      var that = this;
      var pdata = e.mp.detail;
      pdata.userInfo = e.mp.detail.userInfo;
      pdata.iv = encodeURI(e.mp.detail.iv);
      pdata.encryptedData = e.mp.detail.encryptedData;
      pdata.session_key = wx.getStorageSync("session_key");
      this.$axios
        .post("routine/logins/index", {
          info: pdata
        })
        .then(function(response) {
        });
      wx.navigateTo({
        url: "/pages/groupDetail/main?pinkid=" + that.pinkid
      });
    }
  }
};
</script>
<style scoped>
#body img {
  width: 120px;
  height: 120px;
  display: block;
  margin: 0 auto;
  margin-top: 100px;
}
.container {
  margin: 0 50px;
  border-top: 2px solid #cccccc;
  padding-top: 15px;
}
.container p {
  font-size: 15px;
  line-height: 30px;
}
.container p:nth-child(2) {
  color: #cccccc;
}
.bottom {
  border-radius: 80rpx;
  margin-top: 32px;
  font-size: 35rpx;
}
</style>