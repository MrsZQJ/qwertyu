<template>
  <div id="body">
    <div class="Commodity_Information">
      <img
        src="https://www.meifuyihao.com/public/uploads/images/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%BE%8E%E8%BE%BE%E8%BE%BE%E5%9B%BE%E6%A0%87/%E5%A4%B4%E5%83%8F/%E5%A4%B4%E5%83%8F@2x.png"
        alt
      />
      <div class="CommodityText">
        <p>购物节</p>
        <p>¥100.00</p>
      </div>
    </div>
    <div class="border1px"></div>
    <i-input v-model="nameNalue" right title="姓名" autofocus placeholder="请填写您的姓名" />
    <div class="border1px"></div>
    <i-input v-model="telNalue" right title="手机号码" autofocus placeholder="请填写手机号码" />
    <div class="border1px"></div>
    <!-- <i-cell title="微信支付">
      <i-checkbox slot="footer"></i-checkbox>
    </i-cell>-->
    <i-checkbox position="right" value="微信支付" color="#51c332" checked @click="handleChange"></i-checkbox>
    <div class="border1px"></div>
    <div class="pay_footer">
      <div class="footerLeft">
        <p>
          付款
          <span>¥100.00</span>
        </p>
      </div>
      <div class="footerRight" @click="paySuccess">立即支付</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nameNalue: "",
      telNalue: "",
      weixinPay: false
    };
  },
  methods: {
    handleChange() {
      // this.weixinPay=!this.weixinPay
    },
    paySuccess() {
      wx.navigateTo({
        url: "/pages/groupRecords/main"
      });
    }
  }
};
</script>

<style scoped>
.Commodity_Information {
  width: 750rpx;
  height: 70px;
  display: flex;
}
.Commodity_Information img {
  width: 42px;
  height: 42px;
  margin-left: 15px;
  margin-top: 14px;
  margin-right: 10px;
}
.CommodityText {
  margin-top: 14px;
  margin-bottom: 11px;
}
.CommodityText p:nth-child(1) {
  font-size: 15px;
  color: #333333;
}
.CommodityText p:nth-child(2) {
  color: #e80000;
  font-size: 20px;
}
.pay_footer {
  position: fixed;
  bottom: 0;
  width: 750rpx;
  height: 49px;
}
.footerLeft {
  width: 255px;
  font-size: 15px;
  overflow: hidden;
  float: left;
}
.footerLeft p {
  line-height: 49px;
  margin-left: 15px;
  color: #333333;
}
.footerLeft p span {
  color: #e80000;
}
.footerRight {
  background-color: #0086f8;
  color: #ffffff;
  width: 120px;
  height: 49px;
  text-align: center;
  line-height: 49px;
  float: left;
}
</style>
