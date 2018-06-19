// pages/meeting/show/show.js
import event from '../../../utils/event'
import grace from '../../../grace/index'
const { Actionsheet, extend } = require('../../../zan-ui/index');
const qcloud = require('../../../vendor/qcloud-weapp-client-sdk/index.js')
grace.page(extend({}, Actionsheet,{

  /**
   * 页面的初始数据
   */
  data: {
    baseActionsheet: {
      show: false,
      cancelText: '',
      closeOnClickOverlay: true,
      componentId: 'baseActionsheet',
      actions: [{
        name: '创建会议',
        subname: '',
        className: 'action-class',
        loading: false
      }, {
        name: '扫一扫',
        subname: '',
        className: 'action-class',
        loading: false
      }, {
        name: '去分享',
        openType: 'share'
      }]
    },
    movies: [
      { url: 'http://res.mengxiangjing.com/14375045_p0.jpg' },
      { url: 'http://res.mengxiangjing.com/46814076_p0.jpg' },
      { url: 'http://res.mengxiangjing.com/47621790_p0.jpg' },
      { url: 'http://res.mengxiangjing.com/53969178_p1_master1200.jpg' }
    ],
    myMeetingList:[],
    recoMeetingList:[
      {
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: '咖啡',
        num: '12',
        startTime: '12:00',
        endTime: '14:00',
        mid: '110'
      },{
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: '咖啡',
        num: '12',
        startTime: '12:00',
        endTime: '14:00',
        mid: '110'
      },{
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: '咖啡',
        num: '12',
        startTime: '12:00',
        endTime: '14:00',
        mid: '110'
      },{
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: '咖啡',
        num: '12',
        startTime: '12:00',
        endTime: '14:00',
        mid: '110'
      },{
        logo: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
        title: '咖啡',
        num: '12',
        startTime: '12:00',
        endTime: '14:00',
        mid: '110'
      }
    ],
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
    this.getMyMeeting();
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
  toDetails(e) {
    console.log(e.currentTarget.dataset.mid);
    wx.navigateTo({
      url: '../details/meeting-detail?mid='+e.currentTarget.dataset.mid
    })
  },
  jumpToCreate() {
    wx.navigateTo({
      url: '../create/m-create',
    })
  },
  toggleActionsheet() {
    this.setData({
      'baseActionsheet.show': true
    })
  },
  handleZanActionsheetCancel({ componentId }) {
    this.setData({
      [`${componentId}.show`]: false
    });
  },
  handleZanActionsheetClick({ componentId, index }) {
    console.log(`item index ${index} clicked`);
    const that = this
    // 如果是分享按钮被点击, 不处理关闭
    if (index === 2) {
      return;
    }

    // this.setData({
    //   [`${componentId}.actions[${index}].loading`]: true
    // });
    switch (index) {
      case 0:
        this.jumpToCreate()
        break;
      case 1:
        wx.scanCode({
          scanType: ['qrCode'],
          success(res){
            console.log("showqrcode:",res)
            const data = JSON.parse(res.result)
            if(data.code === 'SUCC') {
              wx.requestPayment({
                timeStamp: data.data.timeStamp,
                nonceStr: data.data.nonceStr,
                package: data.data.package,
                signType: data.data.signType,
                paySign: data.data.paySign,
                success: (res) => {
                  console.log(res)
                  wx.showToast({
                    title: '支付成功'
                  })
                  if (callback !== undefined) {
                    callback({ price: price, title: words })
                  }
                },
                fail: (err) => {
                  console.log(err)
                },
                complete: () => { }
              })
            } else {
              that.signUpMeeting(res.result)
            }
          },
          fail(err){
            console.log(err)
          }
        })
        break;
      default:
        break;
    }
    // setTimeout(() => {
    //   this.setData({
    //     [`${componentId}.show`]: false,
    //     [`${componentId}.actions[${index}].loading`]: false
    //   });
    // }, 1500);
  },
  getMyMeeting (){
    let that = this
    qcloud.request({
      url: 'http://127.0.0.1:8080/v1/m/query/mym/0/10',
      success(res){
        console.log("show:",res)
        that.setData({
          myMeetingList:res.data.data.list
        })
      },
      fail(err){
        console.log("fail:",err)
      }
    })
  },
  signUpMeeting(mid){
    qcloud.request({
      url: `http://127.0.0.1:8080/v1/m/signup/${mid}`,
      login:true,
      method: 'POST',
      success(res){
        console.log(res)
        wx.showToast({
          title: '签到成功'
        })
      },
      fail(err){
        console.log(err)
      }
    })
  },
  getSignUpList(mid){
    qcloud.request({
      url: '',
      login: true,
      method: 'GET',
      success(res){
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })
  }
}))