// pages/txl/txl.js
import grace from '../../grace/index'
const { Tab, extend } = require('../../zan-ui/index');
grace.page(extend({}, Tab,{

  /**
   * 页面的初始数据
   */
  data: {
    tab: {
      list: [{
        id: 'session',
        title: '会话'
      }, {
        id: 'friends',
        title: '通讯录'
      }],
      selectedId: 'session'
    },
    sessions:[
      {
        sessionId: '',
        type: '',
        icon: 'http://res.mengxiangjing.com/articleChamonixClouds_EN-AU7806783297_1920x1080.jpg',
        title: 'Asuis',
        msg: 'xxxx',
        time: 'xxxx',
        isTouch: false
      }
    ],
    friends:[
      {
        userId: '',
        avatar: 'http://res.mengxiangjing.com/articleChamonixClouds_EN-AU7806783297_1920x1080.jpg',
        nickName: 'Asuis',
        isTouch: false
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
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;

    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
  },
  touch (e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    console.log(this.$data)
    this.$data.sessions[id].isTouch = true
  },
  to(e) {
    const id = e.currentTarget.dataset.id
    console.log(this.$data)
    this.$data.sessions[id].isTouch = false
  },
  touchf(){
    const id = e.currentTarget.dataset.id
    this.$data.friends[id].isTouch = true
  },
  tof(){
    const id = e.currentTarget.dataset.id
    console.log(this.$data)
    this.$data.friends[id].isTouch = false
  }
}))