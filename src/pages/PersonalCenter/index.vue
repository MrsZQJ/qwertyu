<template>
  <div id="body">
    <div class="touxiang">
      <img :src="avatar" alt />
    </div>
    <div class="border1px"></div>
    <div class="fen">
      <div><span @click="cur=0" :class="{active:cur==0}">已支付</span></div>
      <div><span @click="cur=1" :class="{active:cur==1}">未支付</span></div>
    </div>
    <div v-show="cur==0" v-for="order in pays">
    <div class="border1px"></div>
    <i-cell title="店家名称" v-model="order.shop_name" is-link only-tap-footer></i-cell>
    <div class="border1px"></div>
    <i-cell title="活动名称" v-model="order.pname"></i-cell>
    <div class="border1px"></div>
    <i-cell title="地址" v-model="order.address"></i-cell>
    <div class="border1px"></div>
    <i-cell title="电话" v-model="order.service_tel"></i-cell>
    <div class="border1px"></div>
    <i-cell title="核销码" v-model="order.code"></i-cell>
    <!--<div class="clear"></div>-->
    </div>
    <!--<div v-show="cur==1" v-for="order in nopays">
    <div class="border1px"></div>
    <i-cell title="店家名称" v-model="order.shop_name" is-link only-tap-footer></i-cell>
    <div class="border1px"></div>
    <i-cell title="活动名称" v-model="order.pname"></i-cell>
    <div class="border1px"></div>
    <i-cell title="地址" v-model="order.address"></i-cell>
    <div class="border1px"></div>
    <i-cell title="电话" v-model="order.service_tel"></i-cell>
    <div class="border1px"></div>
    <i-cell title="核销码" v-model="order.code"></i-cell>
    </div>-->
  </div>
</template>
<script>
export default {
  data(){
    return{
      dianjiamingcheng:"美哒哒美人院",
      huodongmingcheng:"购物节",
      ip:'广州天河区',
      tel:'15989468862',
      hexiaoma:'353234',
      cur:0,
      nopays:[],
      pays:[],
      avatar:''
    }
  },
  onLoad(){
  	var that=this
  	this.$axios
              .post("routine/Users/myInfo", {
                    'openid':wx.getStorageSync('openid')
                  })
                  .then(function(response) {
                    that.nopays=response.data.data.no_pay_order;
                    that.pays=response.data.data.pay_order
                    that.avatar=response.data.data.avatar
                  });
  }
}
</script>

<style scoped>
.touxiang {
  width: 750rpx;
  height: 138px;
  text-align: center;
  line-height: 138px;
}
.touxiang img {
  width: 76px;
  height: 76px;
  margin-top: 31px;
}
.fen{
  height: 49px;
  display: flex;
}
.fen>div{
  width: 50%;
  text-align: center;
  line-height: 49px;
}
.fen>div:nth-child(1) span{
  font-size: 15px;
  /*color: #C7C7CC;*/
}
.fen>div:nth-child(2) span{
  font-size: 15px;
 /* color: #C7C7CC;*/
  height: 49px;
  display: inline-block;
  border-bottom: 3px solid #3E89E4;
}
.active{
	color:#3E89E4;
}
</style>
