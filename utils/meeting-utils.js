//封装了meeting相关接口调用
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var config = require('../../config');
//创建通过会议
function create() {
  qcloud.request({
    login: true,
    url: 'http://localhost:8080/user',
    data: {"type":"1"},
    success: function (response) {
      console.log(response);
    },
    fail: function (err) {
      console.log(err);
    }
  });
}
//上传会议logo
function uploadLogo() {}
//查询推荐会议
function queryMeeting(typ,query) {}
//查询会议通过id
function findMeetingById(mid){}
//查询参加过的会议
function findMeetingHistory() {}
function findMeetingFriend() {}