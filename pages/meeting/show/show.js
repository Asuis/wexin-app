// pages/meeting/show/show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      { url: 'http://res.mengxiangjing.com/14375045_p0.jpg' },
      { url: 'http://res.mengxiangjing.com/46814076_p0.jpg' },
      { url: 'http://res.mengxiangjing.com/47621790_p0.jpg' },
      { url: 'http://res.mengxiangjing.com/53969178_p1_master1200.jpg' }
    ],
    myMeetingList:[
      {
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: '',
        num: '',
        startTime: '',
        endTime: ''
      },
      {
        logo: 'http://res.mengxiangjing.com/53969178_p6_master1200.jpg',
        title: '',
        num: '',
        startTime: '',
        endTime: ''
      },
      {
        logo: 'http://res.mengxiangjing.com/53969178_p8_master1200.jpg',
        title: '',
        num: '',
        startTime: '',
        endTime: ''
      },
      {
        logo: 'http://res.mengxiangjing.com/53969178_p7_master1200.jpg',
        title: '',
        num: '',
        startTime: '',
        endTime: ''
      }
      ],
    recoMeetingList:[
      {
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: 'hello',
        num: '',
        startTime: '',
        endTime: ''
      },
      {
        logo: 'http://res.mengxiangjing.com/53969178_p10_master1200.jpg',
        title: 'hello',
        num: '',
        startTime: '',
        endTime: ''
      },
      {
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: 'hello',
        num: '',
        startTime: '',
        endTime: ''
      },
      {
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: 'hello',
        num: '',
        startTime: '',
        endTime: ''
      },
      {
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: 'hello',
        num: '',
        startTime: '',
        endTime: ''
      },
      {
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: 'hello',
        num: '',
        startTime: '',
        endTime: ''
      },
      {
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: 'hello',
        num: '',
        startTime: '',
        endTime: ''
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
  onShareAppMessage: function () {
  
  },
  jumpToCreate() {
    wx.navigateTo({
      url: '../create/m-create',
    })
  }
})