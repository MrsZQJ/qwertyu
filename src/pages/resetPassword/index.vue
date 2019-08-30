<template>
  <div class="bod">
    <div id="body">
      <div class="title">请重新编辑秘密</div>
      <div class="border1px"></div>
      <div class="shu">
        <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/mima_icon@2x.png" alt />
        <span>密码</span>
      </div>
      <input class="ipt" type="number" placeholder="请输入你的新密码" v-model="password"/>
      <div class="border1px"></div>
      <div class="shu">
        <img src alt />
        <span>确认密码</span>
      </div>
      <input class="ipt" type="number" placeholder="请再次输入你的密码" v-model="confirm"/>
    </div>
    <div class="bth"></div>
    <i-button @click="handleClick" type="primary" shape="circle" size="small">确认修改</i-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
    	password:'',
    	confirm:'',
    	phone:''
    };
  },
  
  onLoad(options){
  	this.phone=options.phone
  },
  methods: {
    handleClick() {
    	var that=this
			this.$axios
          .post("routine/Merchant/changePassword",{phone:that.phone,password:that.password,confirm_password:that.confirm})
                .then(function(response) {
                  wx.showToast({
              		title: response.data.msg,
              		icon: 'none',
              		duration: 1000,
            		})
                  if(response.data.code=='200'){
                  	wx.navigateTo({
        							url: "/pages/Login/main"
      							});
                  }
                  
                });
      
    }
  }
};
</script>
<style scoped>
.bod {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
}
#body {
  background-color: #ffffff;
}
.title {
  height: 49px;
  padding-left: 15px;
  line-height: 49px;
  font-size: 15px;
  color: #333333;
  font-weight: 600;
}
.shu {
  height: 49px;
  line-height: 49px;
}
.shu img {
  margin-left: 15px;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}
.shu span {
  font-size: 15px;
  color: #333333;
}
.ipt {
  width: 326px;
  height: 49px;
  margin-left: 49px;
  font-size: 15px;
  color: #999999;
}
.bth {
  height: 50px;
}
</style>
