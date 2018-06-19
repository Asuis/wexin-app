// pages/me/me.js
import grace from '../../grace/index'
const app = getApp()
grace.page({
  /**
   * 页面的初始数据
   */
  data: {
      user:{
        nickName:'',
        gender :'',
        language:'',
        city:'',
        province:'',
        avatarUrl:''
      },
      isLogin: false,
      isLoading: false,
      configs: [
      {
        title: '余额',
        icon: '/img/balance.png',
        details: '0.33元',
        isTouch: false
      },
      {
        title: '会议',
        icon: '/img/Meeting.png',
        details: '',
        isTouch: false
      },
      {
        title: '设置',
        icon: '/img/configure.png',
        isTouch: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindViewTap: function () {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad: function (options) {
    const user = wx.getStorageSync('user')
    if(user!=='') {
      this.$data.user = user
      this.$data.isLogin = true
    }
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

  login: function (e) {
    wx.showLoading({
      mask: true,
      title: '登录中...',
      success:()=>{
        app.doLogin((res)=>{
          if(res!==undefined){
            console.log(res)
            this.$data.user = res
            this.$data.isLogin = true
          }
          wx.hideLoading()
        })
      }
    })
  },
  touch (e) {
    const id = e.currentTarget.dataset.id
    this.$data.configs[id].isTouch = true
    console.log(e)
  },
  to (e){
    const id = e.currentTarget.dataset.id
    this.$data.configs[id].isTouch = false
    console.log(e)
  }
})
