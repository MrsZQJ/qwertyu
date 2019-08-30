/*import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount()
*/
import Vue from 'vue'
// App ==> app.js app.json app.wxml
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

import axios from 'axios'
axios.defaults.baseURL = 'https://www.meifuyihao.com/index.php/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  wx.showLoading({
    title: '数据加载中...', //提示的内容,
    mask: true //显示透明蒙层，防止触摸穿透,
  });
  // 拦截器的好处之一，可以在这里面统一做一些请求发送出去之前的事情
  // if (wx.getStorageSync('token')) {
  //   config.headers.Authorization = wx.getStorageSync('token')
  // }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  wx.hideLoading();
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 所有发送请求最终都会来到这里，然后再根据是配置决定
// 使用哪种方式发送请求，浏览器一般使用xhr
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.url, // url
      data: config.data, // 参数
      method: config.method, // 方法
      header: config.headers, // 这个和小程序中的api不一致，所有要仔细
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

Vue.prototype.$axios = axios

// 固定写法，不要动
const app = new Vue(App)
app.$mount()