/**
 * @fileOverview 微信小程序的入口文件
 */
var qcloud = require('./vendor/qcloud-weapp-client-sdk/index')
var config = require('./config')
var event = require('./utils/event.js')
var moment = require('./vendor/moment/we-moment.js')
App({
    /**
     * 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
     */
    data: {
      loginUrl: config.service.loginUrl,
      requestUrl: config.service.requestUrl,
      tunnelUrl: config.service.tunnelUrl,
      tunnelStatus: 'closed',
      tunnelStatusText: {
        closed: '已关闭',
        connecting: '正在连接...',
        connected: '已连接'
      }
    },
    onLaunch() {
      qcloud.setLoginUrl(config.service.loginUrl)
      console.log(this.data.event)
    },
    onShow() {
      console.log("onShow:",this.tunnel)
      this.startCheck()
    },
    onHide() {
      console.log("onHide:",this.tunnel)
      if(this.tunnel || this.tunnel.isActive()) {
        this.tunnel.close();
      }
    },
    doLogin(callback) {
      console.log('正在登录');
      console.log(callback)
      // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
      const that = this
      qcloud.login({
        success(res) {
          console.log("成功",res)
          wx.setStorage({
            key:"user",
            data: res
          })
          if(callback!==undefined)
            callback(res)
          that.getUserInfo()
        },
        fail(error) {
          console.log("失败", error)
          if(callback!==undefined)
            callback(undefined)
        }
      })
    },
    clearSession() {
      // 清除保存在 storage 的会话信息
      qcloud.clearSession();
      showSuccess('会话已清除');
    },
    openTunnel(callback) {
      // 创建信道，需要给定后台服务地址
      var tunnel = this.tunnel = new qcloud.Tunnel(this.data.tunnelUrl);
      // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
      tunnel.on('connect', () => {
        console.log('WebSocket 信道已连接');
        this.data.tunnelStatus = 'connected'
        if(callback!==undefined)
          callback()
        event.emit('connect')
      })
      tunnel.on('close', () => {
        console.log('WebSocket 信道已断开')
        this.data.tunnelStatus = 'closed'
        event.emit('close')
      })
      tunnel.on('reconnecting', () => {
        console.log('WebSocket 信道正在重连...')
        this.data.tunnelStatus = 'reconnecting'
        event.emit('reconnecting')
      })
      tunnel.on('reconnect', () => {
        console.log('WebSocket 信道重连成功')
        event.emit('reconnect')
      })
      tunnel.on('error', error => {
        console.error('信道发生错误：', error);
        event.emit('error',error)
      })
      // 监听自定义消息（服务器进行推送）
      tunnel.on('room', speak => {
        event.emit('room', speak)
        console.log('收到说话消息：', speak);
      })
      tunnel.on('bar', speak => {
        console.log('收到弹幕消息：', speak);
          event.emit('bar', speak)
      })
      tunnel.on('vote', speak => {
        console.log('收到投票消息：', speak)
        event.emit('vote', speak)
      })
      tunnel.on('notice', speak => {
        event.emit('notice',speak)
        console.log('收到通知消息：', speak)
      })
      tunnel.on('price',price=>{
        event.emit('price',price)
        console.log('收到红包消息', price)
      })
      // 打开信道
      tunnel.open();
      this.data.tunnelStatus = 'connecting'
    },
    /**
     * 点击「发送消息」按钮，测试使用信道发送消息
     * zyw1572
     */
    sendMessage() {
    // 使用 tunnel.isActive() 来检测当前信道是否处于可用状态
      if (this.tunnel && this.tunnel.isActive()) {
        // 使用信道给服务器推送「speak」消息
        this.tunnel.emit('room', {
          'receiverId': '1',
          'content': "hello"
        });
        console.log("room messages")
      }
    },
    /**
     * 点击「关闭信道」按钮，关闭已经打开的信道
     */
    closeTunnel() {
      if (this.tunnel) {
        this.tunnel.close();
      }
      this.setData({ tunnelStatus: 'closed' });
    },
    payRequest (price,words,callback){
      const url = 'https://asuis.mengxiangjing.com/logic-server/v1/pay/create'
      qcloud.request({
        login:true,
        method: 'POST',
        data:{total_fee:price,words:words},
        url: 'https://asuis.mynatapp.cc/v1/pay/create',
        success: (res)=>{
          console.log(res.data.data)
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success: (res)=>{
              console.log(res)
              wx.showToast({
                title: '支付成功'
              })
              if(callback!==undefined){
                callback({price:price,title: words})
              }
            },
            fail: (err)=>{
              console.log(err)
            },
            complete: ()=>{}
          })
        },
        fail: (err)=>{
          console.log(err)
        }
      })
    },
    getUserInfo () {
      const that = this
      if(!this.me) {
        qcloud.request({
          method: 'GET',
          url: config.service.userUrl,
          success: (res)=> {
            console.log(res.data.data)
            this.me = res.data.data
            console.log(this.me)
            if(!this.tunnel || !this.tunnel.isActive())
              that.openTunnel()
          },
          fail: function(err) {
            console.log(err)
          }
        })
      } else {
        if(!this.tunnel || !this.tunnel.isActive())
          that.openTunnel()
      }
    },
    startCheck () {
      const that = this
      console.log('getSetting...')
      console.log("djfkd")
      // that.doLogin()
      wx.getSetting({
        success: (res)=>{
          console.log("setting:",res)
          if (res.authSetting['scope.userInfo']===true) {
            that.doLogin()
          }
        },
        fail: (err)=>{
          console.log(err)
        }
      })
    },
    addFriend(fid){
      qcloud.request({
        url: 'http://127.0.0.1:8080/v1/fri/'
      })
    }
});