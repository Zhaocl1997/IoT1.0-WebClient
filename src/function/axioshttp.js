import axiosObj from 'axios'
import { authHeader } from './auth';
import { config } from './config';
import { aes, sign } from './crypto';

//实例化axios对象
const axios = axiosObj.create({
    baseURL: config.apiUrl,
    // timeout: 1000,            // 超时毫秒数  
    withCredentials: true     // 携带认证信息cookie
})

//请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers = authHeader()
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

/**
* get/post/put/delete 方式请求，url传参
* @param url 请求url
* @param params 参数
* @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
*/
const get = (url, params, level) => axios(getConfig(url, 'get', true, params, level))
    .then(res => successback(res))
    .catch(error => errback(error));

const post = (url, params, level) => axios(getConfig(url, 'post', true, params, level))
    .then(res => successback(res))
    .catch(error => errback(error));

const put = (url, params, level) => axios(getConfig(url, 'put', false, params, level))
    .then(res => successback(res))
    .catch(error => errback(error));

const del = (url, params, level) => axios(getConfig(url, 'delete', true, params, level))
    .then(res => successback(res))
    .catch(error => errback(error));


// 参数转换
const param2String = data => {
    console.log('data', data);
    if (typeof data === 'string') {
        return data;
    }
    let ret = '';
    for (let it in data) {
        let val = data[it];
        if (typeof val === 'object' && //
            (!(val instanceof Array) || (val.length > 0 && (typeof val[0] === 'object')))) {
            val = JSON.stringify(val);
        }
        ret += it + '=' + encodeURIComponent(val) + '&';
    }
    if (ret.length > 0) {
        ret = ret.substring(0, ret.length - 1);
    }
    return ret;
};

// 错误回调函数
const errback = error => {
    if (error.response) { // 请求已经发出，服务器响应的状态码为非2xx
        error.message = '服务器响应异常,请联系系统管理（' + error.message + '）'
    } else if (error.request) { // 发出了请求，没有收到响应 
        error.message = '网络连接异常,请联系系统管理（' + error.message + '）'
    } else if (error.status === false) {
        error.message = '错误（' + error.message + '）'
    } else {
        error.message = '未知错误（' + error.message + '）'
    }
    console.log(error.message)
    return Promise.reject({ status: false, message: error.message })
};

// 成功回调函数
const successback = res => {
    if (res.status === 200) {
        if (res.data.status === "000000") {
            return Promise.resolve(
                {
                    status: true,
                    data: res.data.data
                }
            );
        } else if (res.data.status === "999999") {
            return Promise.reject(
                {
                    status: false,
                    message: res.data
                }
            );
        } else {
            return Promise.reject(
                {
                    status: false,
                    message: "未知格式数据"
                }
            );
        }
    }
};


/**
* @param url 请求url
* @param method get,post,put,delete
* @param isjson 是否json提交参数
* @param params 参数
* @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
*/
const getConfig = (url, method, isjson, params, level = 0) => {
    let config_ = {
        url,
        method,
        // params, data,
        headers: {
            level
        }
    };

    // 时间戳
    if (level === 1) { // 加密
        params = { encrypt: aes.en(JSON.stringify(params)) };
    } else if (level === 2) { // 签名
        let timestamp = new Date().getTime();
        // 获取token
        let token = this.$store.state.token;
        if (!token) {
            token = JSON.parse(sessionStorage.getItem('user')).token;
            this.$store.state.token = token;
        }
        // 签名串
        let signstr = sign(token, timestamp, params);
        console.log('token', token);
        console.log('signstr', signstr);
        config_.headers = {
            level,
            timestamp,
            signstr
        };
    }

    // 表单提交参数
    if (!isjson) {
        config_.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config_.responseType = 'text';
        config_.transformRequest = [function (data) {
            return param2String(data);
        }];
    }

    // 设置参数
    if (method in { 'get': true, 'delete': true }) {
        config_.params = params;
    } else if (method in { 'post': true, 'put': true, }) {
        config_.data = params
        //config_.data.moduleid = module?module:'';
    }

    return config_;
};

// 统一方法输出口
export default {
    axios,
    get,
    post,
    put,
    del
};