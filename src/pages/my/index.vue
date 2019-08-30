<template>
  <div id="body">
    <div class="touxiang">
      <img src="https://www.meifuyihao.com/public/uploads/images/user.png" alt />
      <span>{{name}}</span>
    </div>
    <div class="middle">
      <div class="box">
        <navigator url="/pages/balance/main">
          <p>{{balance}}</p>
          <span>余额(元)</span>
        </navigator>
      </div>
      <div class="box">
        <navigator url="/pages/tixianDetail/main">
          <p>{{extracting}}</p>
          <span>提现中(笔)</span>
        </navigator>
      </div>
      <div class="box">
        <navigator url="/pages/tixianDetail/main">
          <p>{{extracted}}</p>
          <span>提现成功</span>
        </navigator>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      balance: 0,
      extracting: 0,
      extracted: 0,
      name: NaN
    };
  },
  onLoad() {},
  onShow() {
    var that = this;
    this.$axios
      .post("routine/Store/myInfo", { sid: wx.getStorageSync("sid") })
      .then(function(response) {
        that.balance = response.data.data.balance;
        that.extracting = response.data.data.extract_ing;
        that.extracted = response.data.data.extract_ed;
        that.name = response.data.data.merchant_name;
      });
  },
  methods: {}
};
</script>
<style scoped>
.touxiang {
  width: 750rpx;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 28px;
}
.touxiang img {
  width: 50px;
  height: 50px;
  margin-left: 20px;
  vertical-align: middle;
}
.touxiang span {
  line-height: 50px;
  margin-left: 10px;
  color: #333333;
  font-size: 15px;
}
.middle {
  border-bottom: 2px solid #cccccc;
}
.middle .box {
  width: 33%;
  text-align: center;
  display: inline-block;
}
.middle .box p {
  color: #e80000;
  font-size: 20px;
  line-height: 24px;
}
.middle .box span {
  color: #c7c7cc;
  font-size: 14px;
  line-height: 24px;
}
</style>
