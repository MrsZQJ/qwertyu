<template>
  <div id="body">
    <div v-for="order in records" :key="order.id">
      <div class="box">
        <div class="boxLeft">
          <p>美哒哒体验店</p>
          <p>订单号：{{order.ordernob}}</p>
          <p>{{order.add_time}}</p>
        </div>
        <div class="boxRight">
          <p>+{{order.extract_price}}</p>
          <p></p>
        </div>
      </div>
      <div class="border1px"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      records: []
    };
  },
  onLoad() {
    var that = this;
    this.$axios
      .post("routine/Store/getExtract", { sid: wx.getStorageSync("sid") })
      .then(function(response) {
        that.records = response.data.data;
      });
  }
};
</script>
<style scoped>
.box {
  height: 82px;
  width: 750rpx;
}
.boxLeft {
  margin-left: 15px;
  margin-top: 9px;
  float: left;
}
.boxLeft p:nth-child(1) {
  color: #333333;
  font-size: 15px;
}
.boxLeft p:nth-child(2) {
  color: #c7c7cc;
  font-size: 12px;
  margin-top: 5px;
}
.boxLeft p:nth-child(3) {
  color: #c7c7cc;
  font-size: 12px;
  margin-top: 5px;
}
.boxRight {
  margin-right: 15px;
  float: right;
  margin-top: 14px;
}
.boxRight p:nth-child(1) {
  color: #e80000;
  font-size: 20px;
}
.boxRight p:nth-child(2) {
  color: #c7c7cc;
  font-size: 12px;
  margin-top: 6px;
}
</style>
