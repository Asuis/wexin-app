/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'asuis.mynatapp.cc';
var host2 = '127.0.0.1:8090';
var host3 = 'www.aeiou.xin:8090';
var host4 = 'asuis.mengxiangjing.com:8080/user-server'
const logic_host = 'http://127.0.0.1:8080';
const real_url = 'https://asuis.mengxiangjing.com/api' 
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${real_url}/user-server/wx/login`,

        userUrl: `${real_url}/user-server/wx/user`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${real_url}/user-server/wx/check`,

        // 测试的信道服务地址
        tunnelUrl: `${real_url}/comet-server/wx/tunnel`,
    },
    meeting: {
        searchByIdUrl: `${logic_host}/v1/m/search`,
        createMeetingByTypeUrl: `${logic_host}/v1/m/create`,
        updateMeetingUrl: `${logic_host}/v1/m/update`,
        uploadLogoUrl: `https://asuis.mengxiangjing.com/api/logic-server/v1/m/upload/token/logo`
    }
};

module.exports = config;