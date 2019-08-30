<template>
  <div id="body">
  	<template v-for="order in records">
    <i-cell :title="order.shop_name" :label="order.stop_time|filterA">
      <div slot="footer" class="updata">
        <p>+{{order.price}}</p>
        <p>交易成功</p>
      </div>
    </i-cell>
    <div class="border1px"></div>
   </template>
    
  </div>
</template>
<script>
	var time = require('../../utils/index.js');
	export default {
  data() {
    return {
       records:[]
    };
  },
  filters:{
  	filterA:function(value){
  		  
  		  return time.formatTime(value);
  	}
  },
  onLoad(){
  	var that=this
			this.$axios
          .post("routine/Store/buy_list",{sid:wx.getStorageSync('sid')})
                .then(function(response) {
                  that.records=response.data.data
                });
  }
 }
</script>
<style scoped>
 
   
.updata {
  margin-right: 15px;
}
.updata p:nth-child(1) {
  font-size: 20px;
  color: #e80000;
}
.updata p:nth-child(2) {
  color: #c7c7cc;
  font-size: 12px;
}
</style>
