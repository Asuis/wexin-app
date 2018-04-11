// pages/room/componets/input/input-bar.js
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
    showFeature: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showFeature() {
      this.setData({
        showFeature : !this.data.showFeature
      });
    },
    hidden() {
      this.setData({
        showFeature: true
      });
    }
  }
})
