// pages/red-paper/setting/index.js
import grace from '../../../grace/index'
const { Tab, extend } = require('../../../zan-ui/index');
const app = getApp()
grace.page(extend({}, Tab, {
  /**
   * 页面的初始数据
   */
  data: {
    tab1: {
      list: [{
        id: 'all',
        title: '普通红包'
      }, {
        id: 'topay',
        title: '口令红包'
      }],
      selectedId: 'all'
    },
    coin:{
      right: true,
      inputType: 'number',
      title: '金额',
      placeholder: '输入金额',
      focus: true,
      componentId: 'price'
    },
    coin_value: '',
    words:{
      placeholder: '恭喜发财',
      value: '恭喜发财',
      componentId: 'words'
    },
    words_value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;

    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
  },
  pay(e) {
    console.log(e)
    const price = e.detail.value.price
    const words = e.detail.value.words
    app.payRequest(price, words,(res)=>{
     this.$goBack(res)
    })
  }
}))