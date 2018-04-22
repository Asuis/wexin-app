// pages/meeting/fill-form/fill-form.js
const Zan = require('../../../../zan-ui/index');
const config = require('./config');
const moment = require('../../../../vendor/moment/we-moment.js');
var qcloud = require('../../../../vendor/qcloud-weapp-client-sdk/index');
var qconfig = require('../../../../config');
Component(Object.assign({}, Zan.Field,{
  /**
   * 组件的属性列表
   */
  properties: {
    meetingId:{
      type: 'string',
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    config,
    time: '13:00',
    config,
    value: 'test',
    logoUrl: 'http://res.mengxiangjing.com/53969178_p0_master1200.jpg',
    mform:{
      desc: { 
        title: '会议描述',
        placeholder: '会议描述',
        componentId: "desc"
      },
      endTime: { 
        title: '结束时间',
        placeholder: '结束时间',
        componentId: "endTime",
        value: '14:00'
      },
      meetingId: {
        componentId: "meetingId"
      },
      place: {
        title: '地点',
        placeholder: '地点',
        componentId: "place"
        },
      startTime: {
        title: '开始时间',
        placeholder: '开始时间',
        componentId: "starTime",
        value: '13:00'
        },
      title: {
        title: '会议名称',
        placeholder: '会议名称',
        componentId: "title"
        },
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    next: function () {
      console.log('hello');

      // this.triggerEvent('nextt',{},{});
    },
    formSubmit(event) {
      event.detail.value.startTime = this.data.mform.endTime.value;
      event.detail.value.endTime = this.data.mform.startTime.value;      
      event.detail.value.meetingId = this.data.meetingId;      
      console.log('[zan:field:submit]', event.detail.value);
      const $this = this;
      qcloud.request({
        login: true,
        url: 'http://localhost:8080/v1/m/update',
        method: 'post',
        data: event.detail.value,
        success: function (response) {
          console.log(response);
          $this.triggerEvent('nextt', {}, {});
        },
        fail: function (err) {
          console.log(err);
        }
      });
    },
    handleDateFieldClick(event) {
      console.log(event.detail)
    },
    handleChangeStart(e) {
      console.log(e.detail)
      this.setData({
        'mform.startTime.value':  this.getDate()+ ' '+e.detail.value
      });
    },
    handleChangeEnd(e) {
      console.log(e.detail)
      this.setData({
        'mform.endTime.value': this.getDate() + ' ' + e.detail.value
      });
    },
  getDate() {
    // 获取当前日期
    var date = new Date();

    // 获取当前月份
    var nowMonth = date.getMonth() + 1;

    // 获取当前是几号
    var strDate = date.getDate();

    // 添加分隔符“-”
    var seperator = "-";

    // 对月份进行处理，1-9月在前面添加一个“0”
    if (nowMonth >= 1 && nowMonth <= 9) {
      nowMonth = "0" + nowMonth;
    }

    // 对月份进行处理，1-9号在前面添加一个“0”
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
    var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
    return nowDate;
  },
  chooseLogo() {
    const $this = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        $this.setData({
          logoUrl: tempFilePaths[0]
        })
      },
    })
  }
  }
  })
)