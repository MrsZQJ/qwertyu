<template>
  <div id="body">
    <i-cell title="请填写提现银卡信息" label="为了您的资金安全，银行卡人姓名必须与实名认证姓名一致"></i-cell>
    <div class="border1px"></div>
    <i-input
      title="持卡人"
      autofocus
      placeholder="请输入持卡人姓名"
      @change="name"
      maxlength="20"
    />
    <i-input title="银行卡" placeholder="请输入银行卡号" @change="code" maxlength="20" />
    <i-input title="银行名称" placeholder="请输入银行名称" @change="real" maxlength="20" />
    <!-- <i-inpu title="开户地址" placeholder="请输入开户地址" @change="addr" maxlength="20" /> -->
    <i-input title="手机号" placeholder="请输入手机号" @change="tel" maxlength="20" />
    <i-cell :title="msg" @click="chooseShen" is-link></i-cell>
    <i-input placeholder="请输入详细地址" @change="addr" maxlength="20" />
    <!-- <span class="span">{{choose}}</span> -->
    <span class="fix" @click="submit">提交</span>
    <van-popup :show="blea" position="bottom" @close="onClose" :overlay="true">
      <van-area :area-list="areaList" @cancel="onClose" columns-num="3" @confirm="onGo" />
    </van-popup>
  </div>
</template>
<script>
import areaList from "../../../static/vant/area";
export default {
  data() {
    return {
      msg:'请选择省/市/区',
      username: "",
      bankcode: "",
      areaList: areaList,
      province: "",
      city: "",
      district: "",
      realname: "",
      phone: '',
      address: "",
      choose: "",
      detaikAddress:"",
      blea: false,
    };
  },
  methods: {
    name(e) {
      this.username = e.target.detail.value;
    },
    code(e) {
      this.bankcode = e.target.detail.value;
    },
    real(e) {
      this.realname = e.target.detail.value;
    },
    addr(e) {
      this.address = e.target.detail.value;
    },
    tel(e) {
      this.phone = e.target.detail.value;
    },
    chooseShen() {
      this.blea = true;
    },
    onClose() {
      this.blea = false;
    },
    onGo(e) {
      this.blea = false;
      var values = e.mp.detail.values;
      this.province = values[0].name;
      this.city = values[1].name;
      this.district = values[2].name;
      this.msg = this.province+'/' + this.city +'/'+ this.district;
    },
    submit() {
      if (
        this.username == "" ||
        this.bankcode == "" ||
        this.address == "" ||
        this.realname == "" ||
        this.province == "" ||
        this.city == "" ||
        this.district == "" ||
        this.phone == 0
      ) {
        wx.showToast({
          title: "请全部填写",
          icon: "none",
          duration: 1000
        });
        return;
      }
      this.$axios
        .post("routine/Store/addBank", {
          sid: wx.getStorageSync("sid"),
          real_name: this.realname,
          address: this.address,
          province: this.province,
          city: this.city,
          district: this.district,
          phone: this.phone,
          user_name: this.username,
          bank_code: this.bankcode
        })
        .then(function(response) {
          wx.switchTab({
            url: "/pages/my/main"
          });
        });
    }
  }
};
</script>
<style scoped>
.fix {
  display: block;
  width: 229px;
  height: 42px;
  background-color: #2287ff;
  color: #fefefe;
  font-size: 15px;
  border-radius: 66px;
  margin: 0 auto;
  margin-top: 18px;
  text-align: center;
  line-height: 42px;
}
.span {
  margin-left: 20px;
}
</style>
