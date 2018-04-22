// pages/meeting/create/select-type/select-type.js
var qcloud = require('../../../../vendor/qcloud-weapp-client-sdk/index');
var config = require('../../../../config');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    current_type: '',
    meeting_types: [
      {icon: '',title: ''}
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    next() {
      if (this.current_type!=='') {

      }
      this.submit();
    },
    submit() {
      const $this = this;
      qcloud.request({
        login: true,
        url: 'http://localhost:8080/v1/m/create',
        method: 'post',
        data: { "type": "1" },
        success: function (response) {
          console.log(response);
          if(response.code==='200') {

          }
          $this.triggerEvent('next', { "meetingId": response.data.data.meId}, {})
        },
        fail: function (err) {
          console.log(err);
        }
      }); 
    }
  }
})