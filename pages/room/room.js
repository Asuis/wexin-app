// pages/room/room.js
import grace from '../../grace/index'
import event from '../../utils/event'
const qcloud = require('../../vendor/qcloud-weapp-client-sdk/index.js')
const config = require('../../config.js')
var page = undefined;
var app = getApp()
fffdddd
// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
      title,
      content: JSON.stringify(content),
      showCancel: false
  });
};

grace.page({
  /**
   * 页面的初始数据
   */
  data: {
    isDanmu: false,
    danmuData:[],
    tunnelUrl: config.service.tunnelUrl,
    tunnelStatus: 'closed',
    tunnelStatusText: {
      closed: '已关闭',
      connecting: '正在连接...',
      connected: '已连接'
    },
    roomMate: [
      {
        userId: '-1',
        nikeName: 'system',
        avatarUrl: '/img/boy_2.png'
      }
    ],
    messageIndex: '',
    messages:[],
    roomData:{},
    lastMessageId: '0',
    inputMessage: '',
    mid: '110',
    room_height:504
  },
  $onBackData(data) {
    //接收页面返回的数据，
    console.log(data)
    this.sendRpMessage(data)  
  },
  /**  dfm,dmffffcccccccxcdfdfdfdfdfeee
   * 生命周期函数--监听页面加载
   * 1. 加入房间
   * 2. 加载历史信息
   * 3. 更新lastMessageId
   * 4. 更新index scroll view
   */
  onLoad: function (options) {

    console.log("options:",options)
    page = this
    this.setData({
      mid: options.mid
    })
    try{
      this.bindTunnel()
    } catch (e) {
      console.log(e)
    }
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        that.setData({
          room_height: res.windowHeight
        })
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
  bindTunnel () {
    const that = this
    event.on('connect',this,()=>{})
    event.on('close',this,()=>{})
    event.on('reconnecting',this,()=>{})
    event.on('reconnect',this,()=>{})
    event.on('error',this,()=>{})
    event.on('room',this,(speak)=>{
      const msg = this.createChatMessage(speak)
      console.log('收到说话消息：', speak);
      this.pushMessage(msg)
    })
    event.on('bar',this,(bar)=>{})
    event.on('vote',this,(vote)=>{})
    event.on('notice',this,(notice)=>{})
    event.on('price',this,(price)=>{
      this.pushRpMessage(price)
    })
    if(!app.tunnel){
      app.openTunnel(()=>{
        //加入房间
        this.getUserInfo()
        this.joinToRoomById(this.data.mid)
      })
    } else {
      this.getUserInfo()
      this.joinToRoomById(this.data.mid)
    }
  },
  unBindTunnel() {
    event.remove('connect',this)
    event.remove('close',this)
    event.remove('reconnecting',this)
    event.remove('reconnect',this)
    event.remove('error',this)
    event.remove('room',this)
    event.remove('bar',this)
    event.remove('vote',this)
    event.remove('price',this)
    event.remove('notice',this)
  },
  createTunnel () {
    // let tunnel = this.tunnel = new qcloud.Tunnel('https://gitlab.mengxiangjing.com/wx/tunnel')
    let tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl)
    tunnel.on('connect', () => {
      console.log('WebSocket 信道已连接');
      this.setData({ tunnelStatus: 'connected' });
      this.getUserInfo()
      this.joinToRoomById(this.data.mid)
    })

    tunnel.on('close', () => {
        console.log('WebSocket 信道已断开');
        this.setData({ tunnelStatus: 'closed' });
    })

    tunnel.on('reconnecting', () => {
        console.log('WebSocket 信道正在重连...')
        showBusy('正在重连');
    })

    tunnel.on('reconnect', () => {
        console.log('WebSocket 信道重连成功')
        this.joinToRoomById(this.data.mid)
        showSuccess('重连成功');
    })

    tunnel.on('error', error => {
        showModel('信道发生错误', error);
        console.error('信道发生错误：', error);
    })
    // 监听自定义消息（服务器进行推送）
    tunnel.on('room', speak => {
        // showModel('信道消息', speak);
        const msg = this.createChatMessage(speak)
        console.log('收到说话消息：', speak)
        this.pushMessage(msg)
    })
    tunnel.on('bar',bar => {
      console.log(bar)
    })
    tunnel.on('vote',vote=>{
      console.log(vote)
    })
    tunnel.open()
  },
  joinToRoomById(mid) {
    console.log("加入房间:",mid)
    const user = wx.getStorageSync('user')
    console.log(user)
    const url = 'http://127.0.0.1:8080/v1/room/join/m/'+mid
    let that = this
    qcloud.request({
      method: 'PUT',
      url: 'https://asuis.mengxiangjing.com/api/comet-server/v1/room/join/m/'+mid,
      login: true,
      success: function (res) {
        console.log(res.data)
        let me = new Map()
        
        res.data.data.members.forEach(element => {
          me.set(element.userId,element)
        });
        that.setData({
          roomData: me
        })
        console.log(that.data.roomData)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  getRoomHistoryMessagesByLastId (id) {
    
  },
  sendMessage(e) {
    console.log(e)
    this.$data.inputMessage = e.detail.value
    if(this.data.isDanmu){
      this.sendDanmu()
    } else {
      this.sendRoomMessage()
    }    
  },
  createChatMessage (speak) {
   let sp = JSON.parse(speak)
   const that = this
   let msg;
   try {
      const m = this.data.roomData.get(sp.senderId)
      console.log("ddfkkkkk",m)
      // console.log(app.me.openId)
      msg = {
        type: 'chat',
        messageId: sp.messageId,
        sender: {
          nikeName: m.nickName,
          avatar: m.avatarUrl,
          userId: m.userId
        },
        time: sp.time,
        content: sp.content,
        isme: sp.senderId===app.me.openId
      }
    console.log(msg)
   } catch (e) {
     console.log(e)
   }
   return msg
  },
  createYourMessage (value){
    const that = this;
    try{
      const user = wx.getStorageSync('user')
      let msg = {
        messageId: '',
        type: 'me',
        sender: {
          senderId: '17',
          nikeName: user.nickName,
          avatar: user.avatarUrl
        },
        content: value,
        time: ''
      }
      return msg;
    }catch(e){
      console.log(e)
    }
    return undefined;
  },
  pushMessage(msg) {
    let messagess = this.data.messages;
    console.log(msg)
    msg.messageId = parseInt(this.data.lastMessageId)+1
    console.log(this.data.lastMessageId)
    messagess.push(msg)
    this.setData({
      messages: messagess,
      messageIndex: `${msg.messageId}`,
      lastMessageId: `${msg.messageId}`,
    })
  },
  payRequest() {
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success: function(res){
        console.log(res)
      },
      fail:function(res){
        console.log(res)
      }
   })
  },
  sendRpMessage(res){
    // 信道当前不可用
    if (!app.tunnel || !app.tunnel.isActive()) {
      // this.pushMessage(createSystemMessage('您还没有加入群聊，请稍后重试'));
      console.log('您还没有加入群聊，请稍后重试')
      if (app.tunnel.isClosed()) {
          app.openTunnel(()=>{
            this.getUserInfo()
            this.joinToRoomById(this.data.mid)
          })
      }
      return;
    }
    setTimeout(() => {
      
      if (this.data.inputMessage && app.tunnel) {
        console.log(app)
        const msg = { 
          content: res,
          senderId: app.me.openId,
          receiverId: this.data.mid,
          time: '',
          type: 'PRICE'
        }
        console.log("send:",msg)
        app.tunnel.emit('price', msg)
        console.log(this.data.inputMessage)
        this.setData({ inputMessage: '' })
      } else {
        console.log(app.tunnel)
        console.log(this.data.inputMessage)
      }
    })
  },
  sendRoomMessage() {
    // 信道当前不可用
    if (!app.tunnel || !app.tunnel.isActive()) {
      // this.pushMessage(createSystemMessage('您还没有加入群聊，请稍后重试'));
      console.log('您还没有加入群聊，请稍后重试')
      if (app.tunnel.isClosed()) {
          app.openTunnel(()=>{
            this.getUserInfo()
            this.joinToRoomById(this.data.mid)
          })
      }
      return;
    }
    setTimeout(() => {
      
      if (this.data.inputMessage && app.tunnel) {
        console.log(app)
        const msg = { 
          content: this.data.inputMessage,
          senderId: app.me.openId,
          receiverId: this.data.mid,
          time: '',
          type: 'ROOM'
         }
        console.log("send:",msg)
        app.tunnel.emit('room', msg)
        console.log(this.data.inputMessage)
        this.setData({ inputMessage: '' })
      } else {
        console.log(app.tunnel)
        console.log(this.data.inputMessage)
      }
    })
  },
  getUserInfo () {
    if(!app.me) {
      qcloud.request({
        method: 'GET',
        url: config.service.userUrl,
        success: (res)=> {
          console.log(res.data.data)
          app.me = res.data.data
          console.log(this.me)
        },
        fail: function(err) {
          console.log(err)
        }
      })
    }
  },
  sendDanmu(){
    // 信道当前不可用
    if (!app.tunnel || !app.tunnel.isActive()) {
      // this.pushMessage(createSystemMessage('您还没有加入群聊，请稍后重试'));
      console.log('您还没有加入群聊，请稍后重试')
      if (app.tunnel.isClosed()) {
          app.openTunnel(()=>{
            this.getUserInfo()
            this.joinToRoomById(this.data.mid)
          })
      }
      return;
    }
    setTimeout(() => {
      
      if (this.data.inputMessage && app.tunnel) {
        console.log(app)
        const msg = { 
          content: this.data.inputMessage,
          senderId: app.me.openId,
          receiverId: this.data.mid,
          time: '',
          type: 'BAR'
         }
        console.log("send:",msg)
        app.tunnel.emit('bar', msg)
        console.log(this.data.inputMessage)
        this.setData({ inputMessage: '' })
      } else {
        console.log(app.tunnel)
        console.log(this.data.inputMessage)
      }
    })
  },
  sendImg(){
    // 信道当前不可用
    if (!app.tunnel || !app.tunnel.isActive()) {
      // this.pushMessage(createSystemMessage('您还没有加入群聊，请稍后重试'));
      console.log('您还没有加入群聊，请稍后重试')
      if (app.tunnel.isClosed()) {
          app.openTunnel(()=>{
            this.getUserInfo()
            this.joinToRoomById(this.data.mid)
          })
      }
      return;
    }
    setTimeout(() => {
      if (this.data.inputMessage && app.tunnel) {
        console.log(app)
        const msg = { 
          content: this.data.inputMessage,
          senderId: app.me.openId,
          receiverId: this.data.mid,
          time: '',
          type: 'IMG'
         }
         console.log("send:",msg)
        app.tunnel.emit('img', msg)
         console.log(this.data.inputMessage)
        this.setData({ inputMessage: '' })
      } else {
        console.log(app.tunnel)
        console.log(this.data.inputMessage)
      }
    })
  },
  sendVote(){
    // 信道当前不可用
    if (!app.tunnel || !app.tunnel.isActive()) {
      // this.pushMessage(createSystemMessage('您还没有加入群聊，请稍后重试'));
      console.log('您还没有加入群聊，请稍后重试')
      if (app.tunnel.isClosed()) {
          app.openTunnel(()=>{
            this.getUserInfo()
            this.joinToRoomById(this.data.mid)
          })
      }
      return;
    }
    setTimeout(() => {
      
      if (this.data.inputMessage && app.tunnel) {
        console.log(app)
        const msg = { 
          content: this.data.inputMessage,
          senderId: app.me.openId,
          receiverId: this.data.mid,
          time: '',
          type: 'VOTE'
         }
         console.log("send:",msg)
        app.tunnel.emit('vote', msg)
         console.log(this.data.inputMessage)
        this.setData({ inputMessage: '' })
      } else {
        console.log(app.tunnel)
        console.log(this.data.inputMessage)
      }
    })
  },
  getRoomMessage(){
    qcloud.request({
      method: 'GET',
      url: '',
      success(res){
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })
  },
  obar(e){
    this.$data.isDanmu = !this.$data.isDanmu
    if(this.$data.isDanmu){
      wx.showToast({
        title:'弹幕模式开启'
      })
      event.on('bar',this,(bar)=>{
        console.log('room收到弹幕消息',bar)
        this.bindbt(bar)
      })
    } else {
      wx.showToast({
        title:'弹幕模式关闭'
      })
      event.remove('bar',this)
    }
  },
  torp(e){
    console.log('navigate')
    wx.navigateTo({
      url: '../red-paper/setting/index'
    })
  },
  bindbt: function (bar) {
    console.log('发射弹幕',bar)
    const msg = JSON.parse(bar)
    if(msg.content!==undefined)
    {
      console.log(msg.content)
      doommList.push(new Doomm(msg.content, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 10), getRandomColor()));
      this.setData({
        doommData: doommList
      })
    }
  },
  pushRpMessage(price){
    let sp = JSON.parse(price)
    const that = this
    let msg;
    try {
       const m = this.data.roomData.get(sp.senderId)
       console.log("ddfkkkkk",m)
       // console.log(app.me.openId)
       msg = {
         type: 'rp',
         messageId: sp.messageId,
         sender: {
           nikeName: m.nickName,
           avatar: m.avatarUrl,
           userId: m.userId
         },
         time: sp.time,
         content: {
           title: 'dfdf',
           words:'dkfjdkf'
         },
         isme: sp.senderId===app.me.openId
       }
      console.log(msg)
      let messagess = this.data.messages;
      console.log(msg)
      msg.messageId = parseInt(this.data.lastMessageId)+1
      console.log(this.data.lastMessageId)
      messagess.push(msg)
      this.setData({
        messages: messagess,
        messageIndex: `${msg.messageId}`,
        lastMessageId: `${msg.messageId}`,
      })
    } catch (e) {
      console.log(e)
    }
  }
})

var doommList = [];
var i = 0;
class Doomm {
  constructor(text, top, time, color) {
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    let that = this;
    this.id = i++;
    setTimeout(function () {
      doommList.splice(doommList.indexOf(that), 1);
      page.setData({
        doommData: doommList
      })
    }, this.time * 1000)
  }
}
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}