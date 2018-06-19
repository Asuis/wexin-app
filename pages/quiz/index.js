// pages/quiz/index.js
import grace from '../../grace/index'
const app = getApp()
var Zan = require('../../zan-ui/index')
import * as echarts from '../../ec-canvas/echarts'


let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110],
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}



grace.page(Object.assign({}, Zan.Select, Zan.TopTips,{

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        padding: 0,
        value: '1',
        name: 'A.kdjfkdfjkdfj',
      },
      {
        padding: 0,
        value: '2',
        name: 'B.dfjfjdhfjddfh',
      },
    ],
    value: '',
    quiz:{
      focus: true,
      title: '收货人',
      placeholder: '名字'
    },
    questions:{
      title: '好地方的回复',
      selections: [
        {
          select: 'A',
          value: 'dhfjkdf'
        }
      ]
    },

    checked: {
      base: -1,
      color: -1,
      form: -1
    },

    activeColor: '#4b0',
    ec: {
      onInit: initChart
    }
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  formSubmit(event) {
    console.log('[zan:field:submit]', event.detail.value);
    this.showZanTopTips(`选中的值为${event.detail.value.formtest}`);
  },
  handleZanSelectChange({ componentId, value }) {
    this.setData({
      [`checked.${componentId}`]: value
    });
  },
  addSelect(){
    let quiz = this.data.questions

    let se = {
      select: String.fromCharCode(65+quiz.selections.length),
      value: ''
    }
    quiz.selections.push(se)
    this.setData({
      questions: quiz
    })
  }
}))