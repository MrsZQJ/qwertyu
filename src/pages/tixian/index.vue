<template>
  <div id="body">
    <div class="card" @click="showBox">
      <p>{{realname}}</p>
      <p>{{bankcode}}</p>
    </div>
    <div class="detail">
      <p>￥{{balance}}</p>
      <p>可用余额{{available}}</p>
    </div>
    <i-panel title="圆角输入框">
      <i-input
        v-model="extractprice"
        type="number"
        right
        title="提现金额"
        mode="wrapped"
        placeholder="请输入提现金额"
        maxlength="10"
        @change="extract"
      />
    </i-panel>
    <span class="fix" @click="withdraw">申请提现</span>
    <van-popup :show="isShow" @close="onClose" position="bottom">
      <div class="one">
        <i-icon type="return" size="24" @click="onClose" style="line-height: 49px;" />
        <div>提现方式</div>
      </div>

      <div v-for="(card,index) in cards" :key="index">
        <div class="border1px"></div>
        <div class="two" @click="select(card.bid)">
          <img
            src="https://www.meifuyihao.com/public/uploads/images/%E5%9B%BE%E6%A0%87/%E5%9B%BE%E6%A0%87/mima_icon@2x.png"
            alt
          />
          <span>{{card.real_name}}({{card.bank_code}})</span>
        </div>
      </div>

      <div class="border1px"></div>
      <div class="three">
        <div @click="goToAddBlank">
          <span>添加银行卡提现</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      value6: "",
      cards: [],
      bankcode: "",
      realname: "请选择银行卡",
      balance: 0,
      available: 0,
      bid: 0,
      extractprice: 0
    };
  },
  onLoad() {
    var that = this;
    this.$axios
      .post("routine/Store/getBank", { sid: wx.getStorageSync("sid") })
      .then(function(response) {
        that.cards = response.data.data;
        that.realname = that.cards[0].real_name;
        that.bankcode = that.cards[0].bank_code;
        that.balance = that.cards[0].balance;
        that.available = (that.balance * 0.9).toFixed(2);
        that.bid = that.cards[0].bid;
      });
  },
  methods: {
    select(i) {
      var filtered = this.cards.filter(n => n.bid === i);
      this.bankcode = filtered[0].bank_code;
      this.realname = filtered[0].real_name;
      this.balance = filtered[0].balance;
      this.available = (this.balance * 0.9).toFixed(2);
      this.bid = i;
      this.isShow = false;
      //console.log(filtered)
    },
    withdraw() {
      var that = this;
      // if (
      //   that.bankcode == "" ||
      //   that.realname == "" ||
      //   that.extractprice == 0
      // ) {
      //   return;
      // }
      if (that.bankcode == "") {
        wx.showToast({
          title: "卡号不能为空",
          icon: "none",
          duration: 1000
        });
        return;
      }
      if (that.extractprice == 0) {
        wx.showToast({
          title: "提现金额为0",
          icon: "none",
          duration: 1000
        });
        return;
      }
      if (that.extractprice > that.available) {
        wx.showToast({
          title: "余额不足",
          icon: "none",
          duration: 1000
        });
        return;
      }
      this.$axios
        .post("routine/Store/addExtract", {
          sid: wx.getStorageSync("sid"),
          real_name: this.realname,
          bid: this.bid,
          bank_code: this.bankcode,
          extract_price: this.extractprice
        })
        .then(function(response) {
          wx.showToast({
            title: "已提交",
            icon: "none",
            duration: 1000
          });
          wx.switchTab({
            url: "/pages/my/main"
          });
        });
    },
    extract(e) {
      this.extractprice = e.target.detail.value;
    },
    showBox() {
      this.isShow = true;
    },
    onClose() {
      this.isShow = false;
    },
    goToAddBlank() {

      wx.navigateTo({
        url: "/pages/addBlank/main"
      });
    }
  }
};
</script>

<style scoped>
.card {
  display: block;
  height: 85px;
  margin: 9px auto;
  margin-left: 20px;
  margin-right: 20px;
  padding-left: 30px;
  background-color: #3e6dc7;
  border-radius: 8px;
  color: #ffffff;
  overflow: hidden;
}
.card p:nth-child(1) {
  font-size: 12px;
  line-height: 30px;
  margin-top: 15px;
}
.detail p:nth-child(1) {
  font-size: 29px;
  color: #333333;
  margin-top: 10px;
  margin-left: 23px;
}
.detail p:nth-child(2) {
  margin-left: 25px;
  color: #bebebe;
  font-size: 13px;
  margin-top: 4px;
  margin-bottom: 20px;
}
.fix {
  display: block;
  width: 329px;
  height: 42px;
  background-color: #2287ff;
  color: #fefefe;
  font-size: 15px;
  border-radius: 66px;
  margin: 0 auto;
  margin-top: 78px;
  text-align: center;
  line-height: 42px;
}
.one {
  display: flex;
}
.one div {
  flex: 1;
  text-align: center;
  line-height: 49px;
  font-size: 15px;
}
.two {
  height: 49px;
  line-height: 49px;
}
.two img {
  width: 25px;
  height: 25px;
  margin-left: 15px;
  margin-right: 10px;
  vertical-align: middle;
}
.two span {
  font-size: 15px;
}
.three {
  height: 49px;
}
.three div {
  padding-left: 50px;
  line-height: 49px;
}
.three div span {
  font-size: 15px;
}
</style>
