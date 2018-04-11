// pages/room/componets/dialog/redpaper-dialog/red-dialog.js
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
    showPopup: false,
    showLeftPopup: false,
    showRightPopup: false,
    showTopPopup: false,
    showBottomPopup: false
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

    toggleLeftPopup() {
      this.setData({
        showLeftPopup: !this.data.showLeftPopup
      });
    },

    toggleRightPopup() {
      this.setData({
        showRightPopup: !this.data.showRightPopup
      });
    },

    toggleBottomPopup() {
      this.setData({
        showBottomPopup: !this.data.showBottomPopup
      });
    },

    toggleTopPopup() {
      this.setData({
        showTopPopup: !this.data.showTopPopup
      });
    }
  },
})
