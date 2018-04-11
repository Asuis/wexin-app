/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'asuis.mynatapp.cc';
var host2 = '127.0.0.1:8090';
var host3 = 'www.aeiou.xin:8090';
var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `http://${host3}/wx/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `http://${host3}/wx/check`,

        // 测试的信道服务地址
        tunnelUrl: `https://${host}/wx/tunnel`,
    }
};

module.exports = config;