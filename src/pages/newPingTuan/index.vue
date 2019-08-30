<template>
  <div id="body">
    <i-input right title="拼团活动名称" placeholder="请填写拼团名称" maxlength="20" @change="name" />
    <div class="border1px"></div>
    <div class="changeTime" @click="startTime">
      <span>拼团开始时间</span>
      <span>{{currentDate1}}</span>
    </div>
    <div class="changeTime" @click="endTime">
      <span>拼团结束时间</span>
      <span>{{currentDate2}}</span>
    </div>
    <div class="border1px"></div>
    <div class="chooseNum">
      <p>拼团人数</p>
      <div class="box">
        <div>
          <input maxlength="4" type="text" placeholder="0" v-model="people" />
          <i>|</i>
          <span>人</span>
        </div>
        <div>
          <input type="text" maxlength="4" placeholder="0" v-model="price" />
          <i>|</i>
          <span>元</span>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="pingtuanTop">
      <span>拼团页面顶部图</span>
    </div>
    <div class="border1px"></div>
    <div class="border1px"></div>
    <div class="imgJia" @click="topimage">
      <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/xj_icon@2x.png" alt />
      <img class="imgtop" :src="top" v-for="(top,index) in topimgList" :key="index" />
    </div>

    <!--<input id="photo" type="file" accept="image/*">-->
    <div class="clear"></div>
    <div class="fuwuDetail">
      <p>服务详情</p>
      <textarea placeholder="请输入服务详情" v-model="info"></textarea>
      <div class="fuwuImg" @click="fuwuimage">
        <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/xj_icon@2x.png" alt />
        <img class="imgfuwu" :src="fuwu" v-for="(fuwu,index) in fuwuimgList" :key="index" />
      </div>
    </div>
    <div class="clear"></div>
    <i-input right title="商品数量" placeholder="请输入商品数量" @change="number" maxlength="11" />
    <div class="border1px"></div>
    <i-input right title="店铺名称" placeholder="请输入店铺名称" @change="shopnm" maxlength="20" />
    <div class="border1px"></div>
    <i-input right title="地址位置" placeholder="请输入详细地址" @change="addr" maxlength="20" />
    <div class="border1px"></div>
    <i-input right title="客服电话" placeholder="请输入客服电话" @change="tel" maxlength="20" />
    <div class="border1px"></div>
    <div class="fuwuDetail">
      <p>参团须知</p>
      <textarea v-model="cantuanxuzhi"></textarea>
      <span class="last" @click="publish">发布活动</span>
    </div>
    <van-popup :show="showStartTime" position="bottom" overlay="false" @close="onStartClose">
      <van-datetime-picker
        type="datetime"
        :min-date="minDate1"
        :max-date="maxDate"
        @cancel="inStartClose"
        @input="onInputStart"
        @confirm="closeTimeChange"
      />
    </van-popup>
    <van-popup :show="showEndTime" position="bottom" overlay="false" @close="onEndClose">
      <van-datetime-picker
        type="datetime"
        :min-date="minDate1"
        :max-date="maxDate"
        @cancel="inEndClose"
        @input="onInputEnd"
        @confirm="closeTimeChange2"
      />
    </van-popup>
  </div>
</template>
<script>
var time = require("../../utils/index.js");
export default {
  data() {
    return {
      cantuanxuzhi: "",
      namePingTuan: "",
      num: 0,
      address: "",
      telNalue: "",
      minDate1: new Date().getTime(),
      maxDate: new Date(2019, 10, 1).getTime(),
      currentDate1: time.formatTime(new Date().getTime()), //用户选择的起始时间
      showStartTime: false, //是否显示开始时间选择框
      currentDate2: time.formatTime(new Date().getTime()), //用户选择的结束时间
      showEndTime: false, //是否显示结束时间选择框,
      imgtop: "",
      imgfuwu: "",
      people: NaN,
      price: NaN,
      shopname: "",
      info: "",
      topimgList: [],
      fuwuimgList: [],
      num1: 0,
      num2: 0
    };
  },
  onShow(){
    this.num1=0
    this.num2=0
  },
  methods: {
    name(e) {
      this.namePingTuan = e.target.detail.value;
    },
    addr(e) {
      this.address = e.target.detail.value;
    },
    number(e) {
      this.num = e.target.detail.value;
    },
    shopnm(e) {
      this.shopname = e.target.detail.value;
    },
    tel(e) {
      this.telNalue = e.target.detail.value;
    },
    topimage() {
      var that = this;
      if (that.num1 >= 4) {
        wx.showToast({
          title: "图片数量超出上限",
          icon: "none",
          duration: 1000
        });
        return;
      }
      wx.chooseImage({
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // that.data.evalList.push.apply(that.data.evalList, res.tempFilePaths); //数组合并
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths; //that.data.evalList//
          //启动上传等待中...  上传提示框
          wx.showToast({
            title: "正在上传...",
            icon: "loading",
            mask: true,
            duration: 10000
          });
          // var uploadImgCount = 0;
          //遍历每个图片 去执行uploadFile
          // for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: "https://www.meifuyihao.com/index.php/routine/Store/uploadimg", //接受文件的url
            filePath: tempFilePaths[0], //字符串
            name: "file", //后台接受的字段名称
            /*header: {
              'token': wx.getStorageSync('token')
            },*/
            success: function(res) {
              // uploadImgCount++;
              that.num1 += 1;
              var data = JSON.parse(res.data);
              //that.imgList.push(data.replace(/[\\]/g, '').replace(/\"/g, ""))  //得到的数据添加到imgList中
              that.topimgList.push(data.data.url);
              //如果是最后一张,则隐藏等待中
              // if (uploadImgCount == tempFilePaths.length) {
              wx.hideToast();
              // }
            },
            fail: function(res) {
              wx.hideToast();
              wx.showModal({
                title: "错误提示",
                content: "上传图片失败",
                showCancel: false,
                success: function(res) {}
              });
            }
          });
          // }
        }
      });
    },
    fuwuimage() {
      var that = this;
      if (that.num2 >= 7) {
        wx.showToast({
          title: "图片数量超出上限",
          icon: "none",
          duration: 1000
        });
        return;
      }
      wx.chooseImage({
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // that.data.evalList.push.apply(that.data.evalList, res.tempFilePaths); //数组合并
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths; //that.data.evalList//
          //启动上传等待中...  上传提示框
          wx.showToast({
            title: "正在上传...",
            icon: "loading",
            mask: true,
            duration: 10000
          });
          // console.log(that.data.evalList)
          // var uploadImgCount = 0;
          // console.log(tempFilePaths)
          //遍历每个图片 去执行uploadFile
          // for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          // console.log(tempFilePaths[i])
          wx.uploadFile({
            url: "https://www.meifuyihao.com/index.php/routine/Store/uploadimg", //接受文件的url
            filePath: tempFilePaths[0], //字符串
            name: "file", //后台接受的字段名称
            /*header: {
              'token': wx.getStorageSync('token')
            },*/
            success: function(res) {
              that.num2+=1
              var data = JSON.parse(res.data);
              //that.imgList.push(data.replace(/[\\]/g, '').replace(/\"/g, ""))  //得到的数据添加到imgList中
              that.fuwuimgList.push(data.data.url);
              //如果是最后一张,则隐藏等待中
              // if (uploadImgCount == tempFilePaths.length) {
              wx.hideToast();
              // }
            },
            fail: function(res) {
              wx.hideToast();
              wx.showModal({
                title: "错误提示",
                content: "上传图片失败",
                showCancel: false,
                success: function(res) {}
              });
            }
          });
          // }
        }
      });
    },
    publish() {
      var that = this;
      // console.log(that.fuwuimgList);
      // console.log(that.topimgList);
      if (
        this.pname == "" ||
        this.namePingTuan == "" ||
        this.address == "" ||
        this.shopname == "" ||
        this.cantuanxuzhi == "" ||
        this.info == ""
      ) {
        wx.showToast({
          title: "请全部填写",
          icon: "none",
          duration: 1000
        });
        return;
      }
      if (
        this.num == 0 ||
        this.price == 0 ||
        this.people == 0 ||
        this.telNalue == ""
      ) {
        wx.showToast({
          title: "请全部填写",
          icon: "none",
          duration: 1000
        });
        return;
      }
      if (!/^[0-9]+$/.test(this.telNalue)) {
        wx.showToast({
          title: "电话格式不符",
          icon: "none",
          duration: 1000
        });
        return false;
      }

      this.$axios
        .post("routine/Store/addPink", {
          sid: wx.getStorageSync("sid"),
          pname: this.namePingTuan,
          address: that.address,
          num: this.num,
          price: this.price,
          people: this.people,
          add_time: this.currentDate1,
          stop_time: this.currentDate2,
          detail_image: that.fuwuimgList.join(),
          picture: that.topimgList.join(),
          shop_name: that.shopname,
          notice: this.cantuanxuzhi,
          info: this.info,
          service_tel: this.telNalue,
          directions: " "
        })
        .then(function(response) {
          wx.showToast({
            title: response.data.msg,
            icon: "none",
            duration: 1000
          });

          wx.navigateTo({
            url: "/pages/pingTuan/main"
          });
        });
    },
    //点击取消关闭开始时间选择框
    inStartClose() {
      this.showStartTime = false;
    },
    //点击取消关闭结束时间选择框
    inEndClose() {
      this.showEndTime = false;
    },
    // 关闭时间选择框
    closeTimeChange() {
      this.showStartTime = false;
    },
    closeTimeChange2() {
      this.showEndTime = false;
    },
    // 更新用户开始时间选择
    onInputStart(event) {
      this.currentDate1 = time.formatTime(event.mp.detail);
    },
    //更新用户结束时间选择
    onInputEnd(event) {
      this.currentDate2 = time.formatTime(event.mp.detail);
    },
    //点击遮罩层关闭开始时间选择框
    onStartClose() {
      this.showStartTime = false;
    },
    //点击遮罩层关闭结束时间选择框
    onEndClose() {
      this.showEndTime = false;
    },
    // 开启开始时间选择框
    startTime() {
      this.showStartTime = true;
    },
    // 开启结束时间选择框
    endTime() {
      this.showEndTime = true;
    }
  }
};
</script>

<style scoped>
.changeTime {
  width: 375px;
  height: 49px;
  color: #333333;
  font-size: 15px;
}
.changeTime span:nth-child(1) {
  margin-top: 14px;
  margin-left: 15px;
  float: left;
}
.changeTime span:nth-child(2) {
  margin-top: 15px;
  margin-right: 15px;
  float: right;
}
.chooseNum {
  width: 375px;
  height: 93px;
}
.chooseNum p {
  color: #333333;
  font-size: 15px;
  margin-top: 14px;
  margin-left: 15px;
  margin-bottom: 17px;
}
.box div {
  width: 101px;
  height: 26px;
  border-radius: 3px;
  border: 1px solid #333333;
  position: relative;
}
.box img {
  float: left;
  width: 50px;
  height: 50px;
  margin-top: -10px;
  margin-left: 31px;
}
.box div:nth-child(1) {
  margin-left: 15px;
  float: left;
}
.box div:nth-child(2) {
  margin-left: 31px;
  float: left;
}
.box div span {
  /*display: inline-block;
  width: 49%;
  height: 100%;
  line-height: 26px;
  text-align: center;
  color: #333333;
  font-size: 12px;*/
  position: absolute;
  left: 80%;
  transform: translate(-50%);
  top: 2px;
  font-size: 15px;
}
.box div i {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 3px;
  font-size: 10px;
}
.box div input {
  text-align: center;
  width: 43px;
}
.pingtuanTop {
  width: 375px;
  height: 49px;
}
.pingtuanTop span {
  margin-left: 15px;
  color: #333333;
  font-size: 15px;
  line-height: 49px;
}
.imgJia {
  width: 375px;
  height: 88px;
}
.imgJia img {
  width: 58px;
  height: 58px;
  margin-left: 15px;
  margin-top: 15px;
}
.fuwuDetail p {
  color: #333333;
  font-size: 15px;
  margin-left: 15px;
  margin-top: 14px;
  margin-bottom: 20px;
}
.fuwuDetail textarea {
  width: 324px;
  height: 87px;
  padding: 6px 10px;
  font-size: 15px;
  border: 1px solid #cccccc;
  margin: 0 auto;
}
.fuwuImg {
  padding: 20px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.fuwuImg img {
  width: 58px;
  height: 58px;
  margin: 5px;
}
.last {
  display: block;
  width: 329px;
  height: 42px;
  background-color: #2287ff;
  border-radius: 66px;
  margin: 39px auto;
  margin-bottom: 30px;
  color: #fefefe;
  text-align: center;
  line-height: 42px;
}
</style>
