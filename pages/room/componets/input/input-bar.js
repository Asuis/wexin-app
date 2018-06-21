// pages/room/componets/input/input-bar.js
import grace from '../../../../grace/index'
grace.component({
  /**
   * 组件的属性列表
   */
  properties: {
    inputMessage:{
      type: 'string',
      default: 'hello',
      observer: function(newValue, oldValue){
        this.setData({
          input: newValue
        })
        console.log(newValue)
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    doommData: [],
    showFeature: true,
    input: '',
    isDanmu: false,
    featureList: [
      {
        name: '弹幕',
        pic: '/img/danmu.png',
        type: 'bar',
        isPress: false
      },
      {
        name: '图片',
        type:'pic',
        pic: '/img/icon-picture.png',
        isPress: false
      },
      {
        name: '红包',
        type: 'rp',
        pic: '/img/red-p.png',
        isPress: false
      },
      {
        name: '投票',
        type: 'vote',
        pic: '/img/ranking.png',
        isPress: false
      },
      {
        name: 'player',
        type:'player',
        pic:'/img/ranking.png',
        isPress: false
      },
      {
        name: 'pusher',
        type: 'pusher',
        pic: '/img/ranking.png',
        isPress: false
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showFeature() {
      this.setData({
        showFeature : !this.data.showFeature
      })
    },
    hidden() {
      this.setData({
        showFeature: true
      })
    },
    changeInputContent (e) {
      console.log(this.data.inputMessage)
      this.setData({
        input: e.detail.value
      })
      // this.triggerEvent('send',{value: e.detail.value},{})
    },
    send () {
      this.triggerEvent('send',{value: this.data.input},{})
    },
    press (e) {
      console.log("press",e)
      let list = this.data.featureList
      list[e.currentTarget.dataset.id].isPress = true
      this.setData({
        featureList: list
      })
    },
    to (e) {
      console.log("to",e)
      let list = this.data.featureList
      let feature = list[e.currentTarget.dataset.id];
      feature.isPress = false
      this.setData({
        featureList: list
      })
      console.log(feature)
      switch(feature.type) {
        case 'bar':
          this.$data.isDanmu = !this.$data.isDanmu
          this.triggerEvent('ba')
          break;
        case 'pic':
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], 
            sourceType: ['album', 'camera'], 
            success: function(res) {
              //上传并发送图片信息
              res.tempFiles
            },
          })
          break;
        case 'rp':
          //跳转到红包设置页面
          this.triggerEvent('rp')
          break;
        case 'vote':
          //跳转到抽奖设置页面
          wx.navigateTo({
            url: '../../../../quiz/index'
          })
          break;
        case 'player':
          console.log('oooooooo')
          this.triggerEvent('pla')
          break;
        case 'pusher':
          console.log('xxxxxxxx')        
          this.triggerEvent('pus')
          break;
      }
    }
  }
})