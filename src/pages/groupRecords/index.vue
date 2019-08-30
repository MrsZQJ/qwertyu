<template>
  <div id="body">
    <div class="search">
      <div class="searchBor" @click="GoTohexiao">
        <i-icon type="search" size="20" />
        <!-- <i-input autofocus placeholder="请输入核销码" /> -->
        <input type="text" placeholder="请输入核销码" />
        <div>核销</div>
      </div>
    </div>
    <template v-for="order in records">
    <div class="recordsList">
      <div class="recordsList_left" @click="GoTogroupDetail">
        <img :src="order.avatar" alt />
        <div>
          <p>{{order.user_name}}</p>
          <p>{{order.phone}}</p>
          <p>
            <span>{{order.people}}人团</span> |
            <span>已参与{{order.total_num}}人</span>
          </p>
          <i :class="order.k_id==0?'red':''">团长</i>
          <i :class="order.is_shop==1?'red':''">未到店</i>
        </div>
      </div>
      <div class="recordsListRight">
        <img @click="CallPhone()" src="https://www.meifuyihao.com/public/uploads/images/小程序美达达图标/电话/dh_icon@2x.png" alt />
      </div>
    </div>    
    <div class="border1px"></div>
   </template>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
    	records:[]
    };
  },
  onLoad(){
  	var that=this
			this.$axios
          .post("routine/Store/pink_order_list",{sid:wx.getStorageSync('sid')})
                .then(function(response) {
                  that.records=response.data.data
                });
  },
  methods: {
    GoTogroupDetail() {
      wx.navigateTo({
        url: "/pages/groupDetail/main"
      });
    },
    GoTohexiao() {
      wx.navigateTo({
        url: "/pages/hexiao/main"
      });
    },
    CallPhone() {
      wx.makePhoneCall({
        phoneNumber: "13040887911."
      });
    }
  }
};
</script>

<style scoped>
.search {
  width: 750rpx;
  height: 49px;
}
.searchBor {
  margin: 10px auto;
  width: 335px;
  height: 19px;
  padding: 6px 0;
}
.searchBor i-icon {
  margin-left: 15px;
  float: left;
}
.searchBor input {
  font-size: 13px;
  margin-left: 10px;
  color: #bebebe;
  float: left;
}
.searchBor div {
  width: 47px;
  border-left: 1px solid #999999;
  font-size: 13px;
  text-align: center;
  float: right;
  color: #333333;
  line-height: 19px;
}
.recordsList {
  width: 750rpx;
  height: 80px;
}
.recordsList_left {
  float: left;
  display: flex;
}
.recordsList_left img {
  width: 40px;
  height: 40px;
  margin-left: 15px;
  margin-right: 10px;
  margin-top: 20px;
}
.recordsList_left div {
  margin-top: 13px;
  position: relative;
  min-width: 150px;
}
.recordsList_left p:nth-child(1) {
  font-size: 15px;
  color: #333333;
}
.recordsList_left p:nth-child(2) {
  font-size: 13px;
  color: #666666;
}
.recordsList_left p:nth-child(3) {
  color: #999999;
  font-size: 10px;
}
.recordsList_left i {
  width: auto;
  height: 15px;
  border-radius: 20px;
  font-size: 8px;
  position: absolute;
  padding: 0 7px;
}
.recordsList_left i:nth-child(4) {
  border: 1px solid;
  
  text-align: center;
  line-height: 15px;
  top: 2px;
  left: 44px;
}
.recordsList_left i:nth-child(5) {
  border: 1px solid;
  
  text-align: center;
  line-height: 15px;
  top: 2px;
  left: 80px;
}
.red{
	color: #ea6584;
	border-color: #ea6584;
}
.recordsListRight {
  float: right;
  line-height: 80px;
  margin-right: 15px;
}
.recordsListRight img {
  width: 20px;
  height: 20px;
}
</style>
