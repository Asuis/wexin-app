// pages/meeting/details/meeting-detail.js
const qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index.js')
const config = require('../../../config.js')
const moment = require('../../../vendor/moment/moment-with-locales.min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'default',
    mid: '',
    meeting: {
      desc: '',
      endTime: '',
      startTime: '',
      meId: '',
      place: '',
      title: '',
      typeId: '',
      logo: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("jdklfjd",options.mid)
    this.setData({
      mid: options.mid
    })
    let $this = this;
    qcloud.request({
      url: config.meeting.searchByIdUrl,
      method: 'POST',
      data: { query: options.mid },
      success: function (res) {
        console.log(res)
        if (res.data.code === 'SUCC') {
          $this.setData({
            meeting: res.data.data
          })
          wx.setNavigationBarTitle({
            title: $this.data.meeting.title
          })
        }
      },
      fail: function (e) {

      }
    })
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
  jumpToRoom () {
    wx.navigateTo({
      url: '../../room/room?mid='+this.data.mid,
    })
  },
  jumpToSignUp () {
    
  }
})