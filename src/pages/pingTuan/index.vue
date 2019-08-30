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

    <div v-for="(pink,index) in pinks" :key="index">
      <div class="gouWuJie">
        <p>{{pink.pname}}</p>
        <span>{{pink.pink_ok==1?'已成功':' '}}</span>
      </div>
      <div class="moneyDetail">
        <div class="moneyDetailLeft" @click="GoTogroupDetail(pink.id)">
          <span>{{pink.people}}人团</span>
          <span>¥{{pink.price}}</span>
        </div>
        <div class="moneyDetailRight">
          <div class="rightTwo">
            <p>¥{{pink.count_price}}</p>
            <p>总收入</p>
            <p @click="GoToGroupRecords">拼团记录</p>
          </div>
          <div class="rightOne">
            <p>{{pink.count_people}}</p>
            <p>参团人数</p>
            <p @click="haibao(pink.id)">生成海报</p>
          </div>
        </div>
      </div>
      <div class="border1px"></div>
    </div>

    <img
      @click="NewPingTuan"
      src="https://www.meifuyihao.com/public/uploads/images/小程序美达达图标/新建拼团/xj_icon@2x.png"
      class="NewJia"
      alt
    />
    <span @click="NewPingTuan" class="NewJian">新建拼团</span>

    <van-dialog
      use-slot
      title="请选择模板"
      :show="isShow"
      show-cancel-button
      confirm-button-open-type="getUserInfo"
      @close="cancelIns"
      @confirm="confirmIns"
    >
      <swiper
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        style="height:450px"
        @change="chang"
      >
        <swiper-item>
          <canvas
            class="asd"
            canvas-id="myCanvas1"
            @bindlongtap="canvasIdErrorCallback('myCanvas1')"
          ></canvas>
        </swiper-item>
        <swiper-item>
          <canvas
            class="asd"
            canvas-id="myCanvas2"
            @bindlongtap="canvasIdErrorCallback('myCanvas2')"
          ></canvas>
        </swiper-item>
        <swiper-item>
          <canvas
            class="asd"
            canvas-id="myCanvas3"
            @bindlongtap="canvasIdErrorCallback('myCanvas3')"
          ></canvas>
        </swiper-item>
        <swiper-item>
          <canvas
            class="asd"
            canvas-id="myCanvas4"
            @bindlongtap="canvasIdErrorCallback('myCanvas4')"
          ></canvas>
        </swiper-item>
        <swiper-item>
          <canvas
            class="asd"
            canvas-id="myCanvas5"
            @bindlongtap="canvasIdErrorCallback('myCanvas5')"
          ></canvas>
        </swiper-item>
      </swiper>
    </van-dialog>
    <!--<button @click="save">下载图片</button>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      pinkok: 0,
      countpeople: 0,
      countprice: 0,
      pname: "",
      pinks: NaN,
      isShow: false,
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      productimg: "",
      erweima: "",
      pname: "",
      price: 0,
      people: 0,
      current: 0,
    };
  },
  onLoad() {
    var that = this;
    this.isShow = false;
    this.$axios
      .post("routine/Store/pink_list", { sid: wx.getStorageSync("sid") })
      .then(function(response) {
        that.pinks = response.data.data;
      });
  },
  methods: {
    haibao(pid) {
      var that = this;
      this.$axios
        .post("routine/Merchant/pinkingCode", {
          id: pid,
          page: "pages/authorization/main"
        })
        .then(function(response) {
          that.pname = response.data.data.pname;
          that.price = response.data.data.price;
          that.people = response.data.data.people;
          wx.showLoading({
            title: "海报生成中...",
            mask: true
          });
          wx.getImageInfo({
            src: response.data.data.poster,
            success: function(res) {
              that.erweima = res.path;
              wx.getImageInfo({
                src: response.data.data.picture,
                success: function(res) {
                  that.productimg = res.path;
                  that.hebing("myCanvas1", "/static/images/11.jpg");
                  that.hebing("myCanvas2", "/static/images/22.jpg");
                  that.hebing("myCanvas3", "/static/images/33.jpg");
                  that.hebing("myCanvas4", "/static/images/44.jpg");
                  that.hebing("myCanvas5", "/static/images/55.jpg");
                  that.isShow = true;
                  wx.hideLoading();
                }
              });
            }
          });
        });
    },
    cancelIns(e) {
      this.isShow = false;
    },
    confirmIns() {
      var as = this.current + 1;
      this.save(as);
      this.isShow = false;
    },
    chang(e) {
      this.current = e.mp.detail.current;
    },
    hebing(cid, bg) {
      var abc = NaN;
      wx.getSystemInfo({
        success: res => {
          abc = res.windowWidth/375;
        }
      });
      
      const ctx = wx.createCanvasContext(cid);
      ctx.scale(abc,abc);
      ctx.drawImage(bg, 0, 0, 300, 450);
      ctx.fillStyle="#ffffff";
      ctx.fillRect(15, 100, 270, 320);
      ctx.drawImage(this.productimg, 30, 110, 240, 180);
      ctx.setFillStyle("#000000");
      ctx.setFontSize(14);
      ctx.fillText(this.pname, 30, 330);
      ctx.setFillStyle("#dc3e1b");
      ctx.setFontSize(20);
      ctx.fillText("￥" + this.price, 30, 360);
      ctx.setFillStyle("#369599");
      ctx.setFontSize(12);
      ctx.fillText(this.people + "人团", 110, 357);
      ctx.setFillStyle("#d6d1d7");
      ctx.setFontSize(10);
      ctx.fillText("长按识别小程序码查看商品", 30, 380);
      ctx.drawImage(this.erweima, 155, 290, 120, 120);
      ctx.draw();
    },
    NewPingTuan() {
      wx.navigateTo({
        url: "/pages/newPingTuan/main"
      });
    },
    GoToGroupRecords() {
      wx.navigateTo({
        url: "/pages/groupRecords/main"
      });
    },
    GoTohexiao() {
      wx.navigateTo({
        url: "/pages/hexiao/main"
      });
    },
    GoTogroupDetail(id) {
      wx.navigateTo({
        url: "/pages/groupDetail1/main?pinkid=" + id
      });
    },
    canvasIdErrorCallback(cid) {
      this.shengc(cid);
    },
    shengc(cid) {
      wx.canvasToTempFilePath(
        {
          canvasId: cid,
          success(res) {
            wx.authorize({
              scope: "scope.writePhotosAlbum",
              success() {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success() {
                    wx.showToast({
                      title: "图片保存成功"
                    });
                  }
                });
              }
            });
          }
        },
        this
      );
    },
    save(cid) {
      this.shengc("myCanvas" + cid);
    }
  }
};
</script>

<style scoped>
.border1px {
  height: 3px !important;
}
.asd {
  margin: 0px auto;
  width: 300px;
  height: 450px;
}

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
.gouWuJie {
  width: 750rpx;
  height: 49px;
  line-height: 49px;
  font-size: 15px;
  color: #333333;
  text-align: left !important;
}
.gouWuJie p {
  text-align: left !important;
  margin-left: 15px;
}
.gouWuJie span:nth-child(2) {
  float: right;
  margin-right: 15px;
}
.moneyDetail {
  width: 750rpx;
  height: 120px;
}
.moneyDetailLeft {
  margin-left: 15px;
  float: left;
  line-height: 120px;
}
.moneyDetailLeft span:nth-child(1) {
  color: #333333;
  font-size: 15px;
}
.moneyDetailLeft span:nth-child(2) {
  color: #e80000;
  font-size: 20px;
  margin-left: 13px;
}
.moneyDetailRight {
  float: right;
}
.moneyDetailRight div {
  float: right;
  text-align: center;
}
.moneyDetailRight div p:nth-child(1) {
  color: #e70000;
  font-size: 15px;
  margin-top: 16px;
}
.moneyDetailRight div p:nth-child(2) {
  color: #333333;
  font-size: 15px;
  margin-top: 13px;
}
.moneyDetailRight div p:nth-child(3) {
  width: 69px;
  height: 24px;
  border-radius: 30px;
  background-color: #d1d1d1;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  line-height: 24px;
  margin-top: 17px;
}
.moneyDetailRight div:nth-child(1) {
  margin-right: 24px;
}
.moneyDetailRight div:nth-child(1) p:nth-child(3) {
  background-color: #0086f7;
}
.moneyDetailRight div:nth-child(2) {
  margin-right: 20px;
}
.NewJia {
  width: 60px;
  height: 60px;
  /* position: fixed; */
  /* left: 50%; */
  /* transform: translate(-50%); */
  /* bottom: 51px; */
  margin-bottom: 51px;
  margin: 0 auto;
  display: block;
}
.NewJian {
  color: #333333;
  font-size: 15px;
  text-align: center;
  margin-bottom: 20px;
  display: block;
  /* position: fixed; */
  /* left: 50%; */
  /* transform: translate(-50%); */
  /* bottom: 20px; */
}
</style>
