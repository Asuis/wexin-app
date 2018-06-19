// pages/meeting/create/select-type/select-type.js
var qcloud = require('../../../../vendor/qcloud-weapp-client-sdk/index');
var config = require('../../../../config');
import grace from '../../../../grace/index'
grace.component({
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
    ],
    type: "1"
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
        data: { "type": this.data.type },
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
    },
    selected(e){
      console.log(e)
      this.$data.type = e.currentTarget.dataset.tid
      console.log("now type:",this.$data.type)
    }
  }
})