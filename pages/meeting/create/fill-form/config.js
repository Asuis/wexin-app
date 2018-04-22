module.exports = {
  // 基础类型输入框配置
  mdata: {
    "desc": "string",
    "endTime": "2018-04-17T07:18:16.811Z",
    "meetingId": 0,
    "place": "string",
    "starTime": "2018-04-17T07:18:16.812Z",
    "title": "string",
  },
  base: {
    confirmation: {
      title: '验证码',
      type: 'textarea'
    },
    name: {
      focus: true,
      title: '会议名称',
      placeholder: '名称'
    },
    tel: {
      error: true,
      title: '联系电话',
      inputType: 'number',
      placeholder: '请输入手机号'
    },
    address: {
      title: '地点',
      type: 'textarea',
      placeholder: '请输入详细地址'
    },
    disabled: {
      title: '用户信息',
      disabled: true,
      value: '输入框已禁用'
    },
    desc: {
      title: '描述',
      type: 'textarea',
      placeholder: '会议描述'
    },
    time: {
      title: '时间'
    }
  },
  // 无标题输入框
  notitle: {
    placeholder: '请输入收货人姓名',
    componentId: 'textarea:test'
  },
  // 圆角输入框
  radius: {
    totalPrice: {
      right: true,
      mode: 'wrapped',
      title: '消费总额',
      inputType: 'number',
      placeholder: '询问收银员后输入'
    },
    excludePrice: {
      right: true,
      error: true,
      mode: 'wrapped',
      title: '不参与优惠金额',
      inputType: 'number',
      placeholder: '询问收银员后输入'
    },
    notitle: {
      mode: 'wrapped',
      inputType: 'number',
      placeholder: '请输入消费金额'
    }
  },
  // Form 中使用输入框
  form: {
    name: {
      placeholder: '请输入收货人姓名',
      componentId: 'form:test:name'
    },
    tel: {
      name: 'tel',
      inputType: 'tel',
      placeholder: '请输入收货人手机号码',
      componentId: 'form:test:tel'
    },
  }
};