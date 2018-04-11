// pages/meeting/fill-form/fill-form.js
const Zan = require('../../../../zan-ui/index');
const config = require('./config');
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
    config,
    time: '13:00'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    next: function () {
      console.log('hello');
      this.triggerEvent('nextt',{},{});
    }
  }
})
