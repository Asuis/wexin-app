// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  reqPay:function(){
    // 文档地址 https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1
    //商户号
    var mch_id='1500373642';
    //appId 微信分配的小程序ID
    var appId = 'wx9fc6c42b7658bb48';
    //设备号
    var device_info = null;
    //随机字符串
    var nonce_str = '5K8264ILTKCH16CQ2502SI8ZNMTM67VS';
    //签名
    var sign = 'C380BEC2BFD727A4B6845133519F3AD6';
    //签名类型 签名类型，默认为MD5，支持HMAC-SHA256和MD5。
    var sign_type = 'MD5';
    //商品描述
    var body = '腾讯充值中心-QQ会员充值';
    //商品详情 非必须
    var detail = null;
    //out_trade_no 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一
    var out_trade_no = '20150806125346';
    //标价金额
    var total_fee = '0.01';
    //终端IP
    var spbill_create_ip = '123.12.12.123';
    //通知地址

    wx.request({
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
      success:function(res){
        console.log(res)
      }
    })
  },
  pay:function(){
    wx.requestPayment({
      timeStamp: '1490840662',
      nonceStr: '5K8264ILTKCH16CQ2502SI8ZNMTM67VS',
      package: '',
      signType: '',
      paySign: '',
    })
  }
})