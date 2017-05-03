/**
<<<<<<< HEAD
 * Created by olive on 2017/2/7.
 */
=======
 * Created by olive on 2017/2/8.
 */


//判断是否是本地环境
let isLocal = /127.0.0.1|localhost|192.168/.test(location.host);
let broswer = {
  isWeChat: navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger"
}

//todo 本地地址写测试环境api域名
let apiDomain = isLocal ? "//192.168.1.38" : location.origin;
let imgDomain = '//meishakeji-oss1.oss-cn-shenzhen.aliyuncs.com/';

// 获取微信登录地址
function getWeChatAuthUrl() {
  let weChatAuthUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
    "appid=todo" +
    "&redirect_uri=" + "todo: target.html?localUrl=" + encodeURI(location.href) +
    "&response_type=code" +
    "&scope=snsapi_userinfo" +
    "&state=fromHere" +
    "#wechat_redirect";
  return weChatAuthUrl
}


let api = {
  responseCode: {
    success: 0,
    loginFailArr: [
      -1001,//未登录或登录已失效
      -17,//微信接口错误，如直接打开分享过来的带code的链接
      -108//未知，其它项目遇到错误
    ]
  },
  login: apiDomain + "/api/login"
}


let getUrlParam = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


/**
 * @param  {String} url
 * @param {Object|null} data
 * @param {String} type
 * @param {Function}callback
 * @returns {xhr 异步对象}
 */
function ajax(url, data, type, callback) {
  let auth = localStorage.getItem("auth"),
    xhr = null,
    //后台要求的格式提交数据
    formatData = {}
  if (auth && type == 'post') {
    formatData.auth = auth
  }
  if (data) {
    formatData.data = JSON.stringify(data);
  }

  xhr = $.ajax({
    url: url,
    data: formatData,
    type: type,
    dataType: 'json',
    success: function (jsonData) {
      //登录失效后跳转到登录页,(无效登录返回码有多个)
      if (api.responseCode.loginFailArr.indexOf(jsonData.code) > -1) {
        localStorage.removeItem('auth');
        window.location = getWeChatAuthUrl();
      }
      else {
        if ($.isFunction(callback)) {
          callback(jsonData);
        }
      }
    },
    error: function (msg) {
      //一般是服务器异常
      console.dir(msg);
    }
  });

  return xhr;
};


/**
 * @param  {String} url
 * @param {Object|null} data
 * @param {Function} callback
 * @returns {XHR}
 */
function postJson(url, data, callback) {
  return ajax(url, data, 'post', callback);
};

/**
 * @param  {String} url
 * @param {Object|null} data
 * @param {Function} callback
 * @returns {XHR}
 */
function getJson(url, data, callback) {
  return ajax(url, data, 'post', callback);
};
export default {
  isLocal,
  imgDomain,
  getUrlParam,
  getWeChatAuthUrl,
  api,
  postJson,
  getJson

}
>>>>>>> 181c66a6798b22504de3683c117f0c56b295b8ea
