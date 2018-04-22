// pages/meeting/create/m-create.js
const qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index.js')
const config = require('../../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetingId: '',
    steps: [
      {
        current: true,
        done: false,
        text: '选择类型',
        desc: '10.01'
      },
      {
        done: false,
        current: false,
        text: '完善资料',
        desc: '10.02'
      },
      {
        done: false,
        current: false,
        text: '邀请报名'
      }
    ]
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
  onShareAppMessage: function (res) {
    console.log(res)
    if(res.from=== 'button')
    {
      console.log(res.target)
    }
    return {
      title: '会议邀请',
      path: 'pages/meeting/details/meeting-detail?mid='+this.data.meetingId,
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  },
  next: function (data) {
    console.log(data);
    this.setData({
      'steps[0].current': false,
      'steps[0].done':true,
      'steps[1].current': true,
      meetingId: data.detail.meetingId
    });
  },
  next2: function(data) {
    console.log(data);
    this.setData({
      'steps[1].current': false,
      'steps[1].done': true,
      'steps[2].current': true
    });
  },
})