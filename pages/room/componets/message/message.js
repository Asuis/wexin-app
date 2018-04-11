// pages/room/componets/message/message.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // msg_data:{
    //   last_msg_id:'',
    //   msg:[

    //   ]
    // }
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
    togglePopup() {
      this.setData({
        showPopup: !this.data.showPopup
      });
    },
  }
})
