var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var config = require('../../config');
function send() {
  qcloud.request({
    url: `https://${config.service.host}/meeting`,
    login: true,
    success: (res) =>{
      
    }
  })
}
function getUserDetails() {
  qcloud.request({
    url: `https://${config.service.host}/user`,
    login: true,
    success: (response) => {
      this.me = response.data.data.userInfo;
    }
  });
}