/**
 * @fileOverview 微信小程序的入口文件
 */

var qcloud = require('./vendor/qcloud-weapp-client-sdk/index');
var config = require('./config');

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
        qcloud.setLoginUrl(config.service.loginUrl);
    },
    method:{
      /**
  * 点击「登录」按钮，测试登录功能
  */
      doLogin() {
        console.log('正在登录');

        // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
        qcloud.login({
          success(result) {
            console.log('登录成功', result);
          },

          fail(error) {
            console.log('登录失败', error);
          }
        });
      },

      /**
       * 点击「清除会话」按钮
       */
      clearSession() {
        // 清除保存在 storage 的会话信息
        qcloud.clearSession();
        showSuccess('会话已清除');
      },

      /**
       * 点击「请求」按钮，测试带会话请求的功能
       */
      doRequest() {
        // qcloud.request() 方法和 wx.request() 方法使用是一致的，不过如果用户已经登录的情况下，会把用户的会话信息带给服务器，服务器可以跟踪用户
        qcloud.request({
          // 要请求的地址
          url: this.data.requestUrl,

          // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
          login: true,

          success(result) {
            console.log('request success', result);
          },

          fail(error) {
            console.log('request fail', error);
          },

          complete() {
            console.log('request complete');
          }
        });
      },
      joinRoom(roomId){

      },
      exitRoom(roomId){

      },
      openTunnel() {
        // 创建信道，需要给定后台服务地址
        var tunnel = this.tunnel = new qcloud.Tunnel(this.data.tunnelUrl);
        // 监听信道内置消息，包括 connect/close/reconnecting/reconnect/error
        tunnel.on('connect', () => {
          console.log('WebSocket 信道已连接');
          this.setData({ tunnelStatus: 'connected' });
        });
        tunnel.on('close', () => {
          console.log('WebSocket 信道已断开');
          this.setData({ tunnelStatus: 'closed' });
        });
        tunnel.on('reconnecting', () => {
          console.log('WebSocket 信道正在重连...')
          showBusy('正在重连');
        });
        tunnel.on('reconnect', () => {
          console.log('WebSocket 信道重连成功')
          showSuccess('重连成功');
        });
        tunnel.on('error', error => {
          showModel('信道发生错误', error);
          console.error('信道发生错误：', error);
        });
        // 监听自定义消息（服务器进行推送）
        tunnel.on('room', speak => {
          showModel('信道消息', speak);
          console.log('收到说话消息：', speak);
        });
        tunnel.on('bar', speak => {
          showModel('信道消息', speak);
          console.log('收到弹幕消息：', speak);
        });
        tunnel.on('vote', speak => {
          showModel('信道消息', speak);
          console.log('收到投票消息：', speak);
        });
        tunnel.on('notice', speak => {
          showModel('信道消息', speak);
          console.log('收到通知消息：', speak);
        });
        // 打开信道
        tunnel.open();
        this.setData({ tunnelStatus: 'connecting' });
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
       * 点击「测试重连」按钮，测试重连
       * 也可以断开网络一段时间之后再连接，测试重连能力
       */
      testReconnect() {
        // 不通过 SDK 关闭连接，而是直接用微信断开来模拟连接断开的情况下，考察 SDK 自动重连的能力
        wx.closeSocket();
      },

      /**
       * 点击「关闭信道」按钮，关闭已经打开的信道
       */
      closeTunnel() {
        if (this.tunnel) {
          this.tunnel.close();
        }
        this.setData({ tunnelStatus: 'closed' });
      }
    }
});