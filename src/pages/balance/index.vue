<template>
  <div id="body">
    <i-cell title="提现" is-link url="/pages/tixian/main"></i-cell>
    <div class="border1px"></div>
    <i-cell title="核销记录" is-link url="/pages/Write-off/main"></i-cell>
    <div class="border1px"></div>
    <i-cell title="提现记录" is-link url="/pages/tixianDetail/main"></i-cell>
    <!--<div class="border1px"></div>
    <i-cell title="购买记录" is-link url="/pages/buyHistory/main"></i-cell>-->
    <div class="pay_footer">
      <div class="footerLeft">
        
      </div>
      
    </div>
  </div>
</template>
<style scoped>
 
   
.pay_footer {
  position: fixed;
  bottom: 0;
  width: 750rpx;
  height: 49px;
}
.footerLeft {
  width: 255px;
  font-size: 15px;
  overflow: hidden;
  float: left;
}
.footerLeft p {
  line-height: 49px;
  margin-left: 15px;
  color: #333333;
}
.footerLeft p span {
  color: #e80000;
}
.footerRight {
  background-color: #0086f8;
  color: #ffffff;
  width: 120px;
  height: 49px;
  text-align: center;
  line-height: 49px;
  float: left;
}
</style>
