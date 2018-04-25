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
    is_loading: false,
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
      this.setData({
        is_loading: true
      })
      qcloud.request({
        login: true,
        url: config.meeting.createMeetingByTypeUrl,
        method: 'post',
        data: { "type": "1" },
        success: function (response) {
          console.log(response);
          if(response.code==='200') {

          }
          $this.setData({
            is_loading: false
          })
          $this.triggerEvent('next', { "meetingId": response.data.data.meId}, {})
        },
        fail: function (err) {
          this.data.is_loading = false;
          console.log(err);
        }
      }); 
    }
  }
})