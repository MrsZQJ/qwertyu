<template>
  <div id="body">
    <div class="top" :style="{'top':topHeight}">
      <i-icon @click="GoBack" type="return" size="24" />
      <!-- <i-input title="<" type="number" placeholder="请输入收货人姓名" /> -->
      <input type="number" placeholder="请输入核销码" v-model="code" />
      <span @click="hexiao">核销</span>
    </div>
    
    <div class="border1px" :style="{'margin-top':margintopHeight}"></div>
    
    <!--<template v-for="rec in records">
    <div class="box" @click="GoToWriteoff">
      <p>{{rec.pname}}</p>
      <div>
        <span>{{rec.pname}}</span>
        <span>{{rec.code}}</span>
        <span>{{rec.price}}</span>
      </div>
    </div>
    <div class="border1px"></div>
    </template>-->
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   globalData: ""
      records:[],
      code:undefined
    };
  },
  created() {
    // this.topHeight();
  },
  computed: {
    topHeight() {
      var aaa = "";
      wx.getSystemInfo({
        success: res => {
          aaa = res.statusBarHeight + 8 + "px";
        }
      });
      return aaa;
    },
    margintopHeight() {
      var bbb = "";
      wx.getSystemInfo({
        success: res => {
          bbb = res.statusBarHeight + 8+ 31  + "px";
        }
      });
      return bbb;
    }
  },
  onLoad(){
  	
  },
  methods: {
  	hexiao(){
  		 		
  		this.$axios
          .post("routine/Store/writeCode",{sid:wx.getStorageSync('sid'),code:this.code})
                .then(function(response) {
                  wx.showToast({
              			title: response.data.msg,
              			icon: 'none',
              			duration: 1000,
            				})
                });
  	},
    GoBack() {
      wx.navigateBack({
        delta: 1
      });
    },
    GoToWriteoff() {
      wx.navigateTo({
        url: "/pages/Write-off/main"
      });
    }
  }
};
</script>

<style scoped>
 
  
   
.top {
  position: fixed;
  /* top: 60px; */
}
.top i-icon {
  float: left;
  line-height: 25px;
}
.top input {
  float: left;
  font-size: 13px;
  width: 234px;
  height: 31px;
  margin-left: 10px;
}
.top span {
  color: #333333;
  font-size: 13px;
  /* line-height: 25px; */
  position: absolute;
  left: 230px;
  top: 8px;
  z-index: 999999;
}
.box {
  width: 375px;
  height: 80px;
  color: #999999;
  font-size: 15px;
}
.box p {
  margin-top: 14px;
  margin-left: 15px;
}
.box div {
  padding: 0 15px 0px 15px;
  display: flex;
  justify-content: space-between;
}
.box div span {
  line-height: 41px;
}
</style>
