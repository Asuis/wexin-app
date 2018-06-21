// pages/room/componets/message/message.js
import grace from '../../../../grace/index'
grace.component({
  /**
   * 组件的属性列表
   */
  properties: {
    messages:{
      type: Array
    },
    toMessage: {
      type: String,
      value: '0',
      observer: function (e) {
        console.log(e)
      }
    },
    roomHeight:{
      type:Number,
      default: 504,
      observer: function (e) {
        console.log(e)
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPopup: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    togglePopup(e) {
      console.log(e)
      console.log('shoshohwsoh')
      this.setData({
        showPopup: !this.data.showPopup
      });
    },
    getRp(e){
      console.log('getRp', e)
      this.setData({
        showPopup: !this.data.showPopup
      })
      this.triggerEvent('jump',{rid: e.currentTarget.id},{})
    },
    test(){
      console.log('test')
    }
  }
})
