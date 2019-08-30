<template>
  <div id="body">
    <div class="box">
      <p>拼团玩法</p>
      <div class="boxDetail">
        <div>
          <navigator url="/pages/pingTuan/main">
            <img src="https://www.meifuyihao.com/public/uploads/images/小程序美达达图标/拼团详情/ktct_icon@2x.png" alt />
            <span>拼团</span>
          </navigator>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/xs_icon@2x.png" alt />
          <span>限时秒杀</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/kj_icon@2x.png" alt />
          <span>砍价</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/bwk_icon@2x.png" alt />
          <span>霸王卡</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/bwk_icon@2x.png" alt />
          <span>小程序</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/lm_icon@2x.png" alt />
          <span>异业联盟</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/pt_yq_icon@2x.png" alt />
          <span>分享有礼</span>
        </div>
      </div>
    </div>
    <div class="box">
      <p>发现精彩</p>
      <div class="boxDetail">
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/jx_icon@2x.png" alt />
          <span>话术大全</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/jx_icon@2x.png" alt />
          <span>教学视频</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/yp_icon@2x.png" alt />
          <span>音频学习</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/wa_icon@2x.png" alt />
          <span>文案素材</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/zx_icon@2x.png" alt />
          <span>咨询公司</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/cp_icon@2x.png" alt />
          <span>产品公司</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/yq_icon@2x.png" alt />
          <span>仪器产家</span>
        </div>
        <div>
          <img src="https://www.meifuyihao.com/public/uploads/images/图标/图标/gd_icon@2x.png" alt />
          <span>更多</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.box p {
  line-height: 55px;
  font-size: 15px;
  color: #333333;
  margin-left: 15px;
}
.boxDetail > div {
  display: inline-block;
  width: 25%;
  text-align: center;
}
.boxDetail > div:nth-child(n + 5) {
  margin-top: 30px;
  margin-bottom: 17px;
}
.boxDetail > div img {
  width: 40px;
  height: 40px;
  display: block;
  margin: 0 auto;
}
.boxDetail > div span {
  line-height: 28px;
  font-size: 14px;
  color: #333333;
}
</style>
