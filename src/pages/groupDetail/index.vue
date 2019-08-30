<template>
  <div id="body">
    <!-- 1.0 轮播图 -->
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      indicator-active-color="#ffffff"
      circular
    >
      <block v-for="(item,index) in swipers" :key="index">
        <navigator>
          <swiper-item>
            <image :src="item.imagesrc" />
          </swiper-item>
        </navigator>
      </block>
    </swiper>
    <!-- 购物街分享 -->
    <div class="shopping">
      <div>
        <p>{{pname}}</p>
        <p>¥{{price}}</p>
        <span>{{people}}人团</span>
      </div>
      <!-- <i-icon type="share" size="24" @click="handleOpen1" /> -->
      <img src="https://www.meifuyihao.com/public/uploads/images/小程序美达达图标/分享/fx_icon@2x.png" @click="handleOpen1" alt />
    </div>
    <div class="clear"></div>
    <div class="serabble">
      <div class="serabble_play">
        <span>拼团玩法</span>
        <span @click="goToMyself">个人中心</span>
      </div>
      <div class="serabble_list">
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/小程序美达达图标/拼团详情/ktct_icon@2x.png" alt />
          <p>开团/参团</p>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/小程序美达达图标/拼团详情/fk_icon@2x.png" alt />
          <p>付款</p>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/小程序美达达图标/拼团详情/fk_icon@2x.png" alt />
          <p>邀请好友</p>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/小程序美达达图标/拼团详情/kt_icon@2x.png" alt />
          <p>成团</p>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <i-cell title="正在拼团的小伙伴" value="更多" is-link only-tap-footer @click="goList"></i-cell>
    
    <template v-for="(pink,index) in pinks" v-if="index<=1">
    <div class="border1px"></div>
    <div class="serabblePeople">
      <div class="serabblePeople_Left">
        <img :src="pink.avatar" alt />
        <span>{{pink.pname}}</span>
        <i>{{pink.people}}人团</i>
      </div>
      <div class="serabblePeople_Right">{{pink.pink==1?'已成团':'未成团'}}</div>
    </div>
    </template>
    
    <div class="clear"></div>
    <div class="datail">
      <p>服务详情</p>
      <span>
        {{serviceinfo}}
      </span>
    </div>
    <div class="footFix" @click="goToPay">¥{{price}}(单独买)</div>
    <i-action-sheet
      :visible="visible1"
      :actions="actions1"
      show-cancel
      @cancel="handleCancel1"
      @click="handleClickItem"
    />
    <div class="addXiao" v-show="addXiao">
      <span></span>
      点击 [添加小程序] , 下次访问更便捷 >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swipers: [],
      visible1: false,
      actions1: [
        {
          name: "转发给好友",
          openType: "share"
        },
        {
          name: "添加到我的小程序"
        }
      ],
      addXiao: false,
      code: NaN,
      serviceinfo:'',
      pinks:[],
      pid:0,
      productid:0,
      storeid:0,
      price:0,
      pname:"",
      people:0
    };
  },
  created() {
    this.getLogin();
  },
  onLoad(options) {
  	     var that=this;
  	     that.pid=options.pinkid;
         this.$axios
              .post("routine/Users/combination_detail", {
                    'openid':wx.getStorageSync('openid'),id:options.pinkid
                  })
                  .then(function(response) {
                    that.serviceinfo=response.data.data.storeInfo.info
                    that.pinks=response.data.data.pink
                    that.productid=response.data.data.storeInfo.id
                    that.storeid=response.data.data.storeInfo.uid
                    that.price=response.data.data.storeInfo.price
                    that.pname=response.data.data.storeInfo.pname
                    that.people=response.data.data.storeInfo.people
                    var obj=new Object()
                    obj.imagesrc=response.data.data.storeInfo.picture[0]
                    that.swipers.push(obj)
                  });
           
  },
  methods: {
    getLogin() {
    	    
          
      wx.checkSession({
        success() {
          //session_key 未过期，并且在本生命周期一直有效         
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          var appId='wx07fe5775ac46e374';
          var secret='2580adb6d939538a49dc45b79326d0a6';
          /*wx.login({
            success: res => {
              if (res.code) {
                this.$axios
                  .post("routine/logins/setCode", {
                    "info[code]": "043QdsyS1COd1613IkxS1cTgyS1QdsyE"
                  })
                  .get('https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code')
                  .then(function(response) {
                    console.log(response);
                  });
              } else {
                console.log(res.errMsg);
              }
            }
          });*/
        }
      });
    },
    goList(){
    	 
    	 wx.navigateTo({
        url: "/pages/groupList/main?pid="+this.pid
      });
    },
    handleOpen1() {
      this.visible1 = true;
    },
    handleCancel1() {
      this.visible1 = false;
    },
    goToMyself() {
      wx.navigateTo({
        url: "/pages/PersonalCenter/main"
      });
    },
    goToPay() {
      wx.navigateTo({
        url: "/pages/pay/main?storeid="+this.storeid+"&productid="+this.productid+"&price="+this.price+"&pname="+this.pname
      });
    },
    handleClickItem(e) {
      // console.log(e.currentTarget.dataset.index);
      // if(e.currentTarget.dataset.index==1){
      this.visible1 = false;
      this.setAdd();
    },
    setAdd() {
      this.addXiao = true;
      setTimeout(() => {
        this.addXiao = false;
      }, 5000);
    }
  }
};
</script>     
<style scoped>
.addXiao {
  color: #000000;
  background-color: #ffffff;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 10px;
  position: fixed;
  top: 15px;
  right: 20px;
}
.addXiao span {
  display: block;
  position: absolute;
  width: 15px;
  height: 15px;
  transform: rotate(45deg);
  top: -7px;
  right: 47px;
  background-color: #ffffff;
}
swiper {
  width: 750rpx;
  height: 126px;
}
swiper image {
  width: auto;
  text-align: center;
}
.shopping > div {
  float: left;
  margin-left: 15px;
  padding: 15px 0 10px 0;
}
.shopping > div p:nth-child(1) {
  font-size: 15px;
  color: #333333;
  line-height: 22px;
}
.shopping > div p:nth-child(2) {
  font-size: 20px;
  color: #e80000;
  line-height: 24px;
}
.shopping img {
  float: right;
  margin-top: 25px;
  margin-right: 17px;
  width: 25px;
  height: 25px;
}
.shopping {
  position: relative;
  overflow: hidden;
}
.shopping span {
  width: 35px;
  height: 15px;
  border: 1px solid #c7c7cc;
  font-size: 8px;
  text-align: center;
  line-height: 15px;
  position: absolute;
  color: #c7c7cc;
  top: 17px;
  left: 85px;
}
.serabble {
  width: 690rpx;
  height: 138px;
  padding: 12px 15px 15px 15px;
}
.serabble_play {
  overflow: hidden;
}
.serabble_play span:nth-child(1) {
  font-size: 15px;
  color: #333333ff;

  float: left;
}
.serabble_play span:nth-child(2) {
  font-size: 12px;
  color: #ffffffff;
  line-height: 24px;
  text-align: center;
  width: 69px;
  height: 24px;
  border-radius: 30px;
  background-color: #0086f7ff;
  float: right;
}
.serabble_list {
  padding: 22px 12px 15px 12px;
  display: flex;
  justify-content: space-between;
}
.serabble_list img {
  width: 40px;
  height: 40px;
  display: block;
  margin: 0 auto;
  margin-bottom: 10px;
}
.shopping_play .i-cell-text {
  font-size: 15px;
}
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
  left: 130px;

}
.serabblePeople .serabblePeople_Right {
  font-size: 14px;
  color: #ea6584;
  float: right;
  margin-right: 15px;
  line-height: 60px;
}
.datail {
  padding: 0 24px 60px 15px;
}
.datail p {
  margin-top: 3px;
  line-height: 37px;
  font-size: 15px;
  color: #333333;
}
.datail span {
  font-size: 14px;
  color: #666666;
}
.footFix {
  color: #ffffff;
  width: 750rpx;
  height: 49px;
  background-color: #0086f8;
  text-align: center;
  line-height: 49px;
  font-size: 15px;
  position: fixed;
  bottom: 0;
}
</style>
