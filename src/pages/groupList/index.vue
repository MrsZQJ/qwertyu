<template>
  <div id="body">
    <div v-for="(pink,index) in pinks" :key="index">
      <div class="serabblePeople">
        <div class="serabblePeople_Left">
          <img :src="pink.avatar" alt />
          <span>{{pink.pname}}</span>
          <i>{{pink.people}}人团</i>
        </div>
        <div class="serabblePeople_Right">{{pink.pink==1?'已成团':'未成团'}}</div>
      </div>
      <div class="border1px"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pinks: []
    };
  },
  onLoad(options) {
    var that = this;
    this.$axios
      .post("routine/Users/combination_detail", {
        openid: wx.getStorageSync("openid"),
        id: options.pid
      })
      .then(function(response) {
        that.pinks = response.data.data.pink;
      });
  }
};
</script>     
<style scoped>
.serabblePeople {
  width: 750rpx;
  height: 60px;
  position: relative;
}
.serabblePeople .serabblePeople_Left {
  float: left;
  margin-left: 15px;
  display: flex;
}
.serabblePeople .serabblePeople_Left img {
  width: 40px;
  height: 40px;
  margin-top: 10px;
  margin-right: 10px;
  display: block;
}
.serabblePeople .serabblePeople_Left span {
  color: #333333;
  font-size: 15px;
  line-height: 60px;
}
.serabblePeople .serabblePeople_Left i {
  /* width: 35px; */
  padding: 0px 4px;
  height: 15px;
  border: 1px solid #ea6584;
  font-size: 8px;
  text-align: center;
  line-height: 15px;
  position: absolute;
  color: #ea6584;
  top: 23px;
  left: 140px;
}
.serabblePeople .serabblePeople_Right {
  font-size: 14px;
  color: #ea6584;
  float: right;
  margin-right: 15px;
  line-height: 60px;
}
</style>
