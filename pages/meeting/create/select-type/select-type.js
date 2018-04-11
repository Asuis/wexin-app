// pages/meeting/create/select-type/select-type.js
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
      this.triggerEvent('next',{},{})
    },
    submit() {
      
    }
  }
})