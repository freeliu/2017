/**
 * Created by olive on 2016/11/29
 * 封装公共方法和属性
 */
'use strict'

let webDomain = window.location.origin

if (webDomain.indexOf("local") > -1 || webDomain.indexOf("192") > -1) {
  webDomain = "";
}

const apiUrl = webDomain + "/api/";

const api = {
  responseCode: {
    success: 0,
    noLogin: -1001,
    noAuthority: -1002
  },
  login: "http://localhost:8080/static/login.js",
};

/**
 * 显示加载图标
 */
function showLoading() {
  var loadingHtml = `<div id="global-loading"><div  class="sk-fading-circle">
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
</div></div> `;
  if ($("#global-loading").length === 0) {
    $("body").append(loadingHtml);
  }
  $("#global-loading").show(300);
};
/**
 * 隐藏加载图标
 */
function hideLoading() {
  $("#global-loading").hide(300);
};

/**
 * 显示删除二次确认 todo:解耦
 */
function confirmDelete(confirmFun, msg) {
  msg = msg || "确定删除吗？";
  let randomID = "dialog_" + Math.random().toString().replace(".", "");
  let $dialog = $("<div>", {id: randomID, 'class': 'dialog'});
  $dialog.html(`  
         <div class="mask" onclick="this.parentNode.remove()"></div>
         <div class="dialog-delete">
        <img onclick="this.parentNode.parentNode.remove()" src="static/img/icon-close.png" width="15" height="14">
        <h4>${msg}</h4>
        <a href="javascript:void (0)"  id="btn_confirm_${randomID}"  onclick="this.parentNode.parentNode.remove()"  tabindex="1" class="btn-red-lg w-110">删除</a>
        <a href="javascript:void(0)" tabindex="2" onclick="this.parentNode.parentNode.remove()" class="btn-gray-lg-plain w-110">取消</a>
        </div>`
  );
  $("body").append($dialog);
  $("[id^=btn_confirm_]", $dialog).click(function () {
    if (typeof (confirmFun) === "function") {
      confirmFun();
    }
  })
};


function confirm(confirmFun, msg, btnName) {
  btnName = btnName || "确定";
  let randomID = "dialog_" + Math.random().toString().replace(".", "");
  let $dialog = $("<div>", {id: randomID, 'class': 'dialog'});
  $dialog.html(`  
         <div class="mask" onclick="this.parentNode.remove()"></div>
         <div class="dialog-delete">
        <img onclick="this.parentNode.parentNode.remove()" src="static/img/icon-close.png" width="15" height="14">
        <h4>${msg}</h4>
        <a href="javascript:void (0)"  id="btn_confirm_${randomID}"  onclick="this.parentNode.parentNode.remove()"  tabindex="1" class="btn-green-lg w-110">${btnName}</a>
        <a href="javascript:void(0)" tabindex="2" onclick="this.parentNode.parentNode.remove()" class="btn-gray-lg-plain w-110">取消</a>
        </div>`
  );
  $("body").append($dialog);
  $("[id^=btn_confirm_]", $dialog).click(function () {
    if (typeof (confirmFun) === "function") {
      confirmFun();
    }
  })
};

function downLoadExcel(file, fileName, btnName) {
  btnName = btnName || "下载";
  let msg = "数据已导出，请点击下载";
  let randomID = "dialog_" + Math.random().toString().replace(".", "");
  let $dialog = $("<div>", {id: randomID, 'class': 'dialog'});
  $dialog.html(`  
         <div class="mask" onclick="this.parentNode.remove()"></div>
         <div class="dialog-delete">
        <img onclick="this.parentNode.parentNode.remove()" src="static/img/icon-close.png" width="15" height="14">
        <h4>${msg}</h4>
        <a href="${file}" id="btn_confirm_${randomID}" download="${fileName}.xlsx" title="${fileName}.xlsx"  onclick="this.parentNode.parentNode.remove()"  tabindex="1" class="btn-green-lg w-110">${btnName}</a>
        <a href="javascript:void(0)" tabindex="2" onclick="this.parentNode.parentNode.remove()" class="btn-gray-lg-plain w-110">取消</a>
        </div>`
  );
  $("body").append($dialog);
  $("[id^=btn_confirm_]", $dialog).click(function () {
    if (typeof (confirmFun) === "function") {
      confirmFun();
    }
  })
};


//显示消息后自动关闭
function popMsg(msgStr, callback, mSecond) {
  showMsg(msgStr);
  mSecond = mSecond || 2000;
  setTimeout(function () {
    hideMsg();
    $.isFunction(callback) ? callback() : null;
  }, mSecond);
};

function showMsg(msgStr) {
  var msg = '<div id="msg"  style="position: fixed;z-index:9999; left: 0;right: 0;top: 0;bottom: 0;display: none;align-items: center;justify-content: center"> ' +
    '<div  style="background-color: rgba(40, 40, 40, 0.75); border-radius: 5px;color: white;padding: 20px;display: inline-block" > </div> </div>';
  if ($('#msg').length == 0) {
    $('body').append(msg);
  }
  $("#msg div").text(msgStr);
  $("#msg").css('display', 'flex');
}

function hideMsg() {
  $("#msg").hide(300);
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
  if (auth) {
    formatData.auth = auth
  }
  if (data) {
    formatData.data = JSON.stringify(data);
  }
  xhr = $.ajax({
    url: url
    , data: formatData
    , type: type
    , dataType: 'json'
    , success: function (jsonData) {
      //登录失效后跳转到登录页
      if (jsonData.code == '-1001') {
        localStorage.removeItem('auth');
        popMsg(jsonData.msg, function () {
          // window.location = _this.weChatAuthUrl;
          // vm.$router.push("login");
        }, 2000)
      }
      else {
        if ($.isFunction(callback)) {
          callback(jsonData);
        }
      }
    }
    , error: function (msg) {
      //一般是服务器异常
      console.dir(msg);
    }
  });
  //百度统计
  // if (_hmt) {
  //   _hmt.push(['_trackEvent', "api调用",  url]);
  // opt_value 测试，结论：智能填数字
  // opt_value：事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据
  // _hmt.push(['_trackEvent', "api调用_opt_value_num_1", `api请求,from page:${location.href}` , url, 1]);
  // }
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
  return ajax(url, data, 'get', callback);
};


//格式化时间
function formatDateTo_yyyy_MM_dd(date) {
  if (!isNaN(date)) {
    date = new Date(parseInt(date));
  }
  var yyyy = date.getFullYear(),
    MM = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
    dd = date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
  return yyyy + '-' + MM + '-' + dd;
}
//获取url参数值
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

//浏览器信息
let browser = function () {
  let browser = {isIE: false, ieVersion: -1, isEdge: false};
  let ua = navigator.userAgent.toLowerCase();
  //用于检测是否ie，及其版本
  if (ua.indexOf("edge") > -1) {
    browser.isEdge = true;
  } else if (ua.indexOf("rv:11") > -1) {
    browser.isIE = true;
    browser.ieVersion = 11;
  } else if (ua.indexOf("msie") > -1) {
    browser.isIE = true;
    browser.ieVersion = parseInt(ua.toLowerCase().match(/msie ([\d.]+)/)[1]);
  }

  browser.platform = {
    isMac: navigator.platform.toUpperCase().indexOf('MAC') >= 0
  };

  // browser.isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;
  browser.isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i) ? true : false;
  browser.isSafari = false;
  browser.isChrome = false;
  if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') > -1) {
      browser.isChrome = true;
    } else {
      browser.isSafari = true;
    }
  }
  return browser;
}()

//复制对象，原对象属性修改不影响新对象属性
function clone(obj) {
  // if (null == obj || "object" != typeof obj) return obj;
  // var copy = obj.constructor();
  // for (var attr in obj) {
  //   if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  // }

  return JSON.parse(JSON.stringify(obj));
}

// 创建并发送form表单
function createAndSendForm(action, paramObj) {
  let form = document.createElement("form");
  document.body.appendChild(form);
  form.method = "POST";
  form.action = action;
  for (let k in paramObj) {
    let element1 = document.createElement("input");
    element1.name = k
    element1.value = paramObj[k];
    element1.type = 'hidden'
    form.appendChild(element1);
  }
  form.submit();
}

/**
 *
 * @param cname {string}
 * @returns {string}
 */
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


const localStorageKeys = {
  userName: "userName"
}
const sessionStorageKeys = {
  from: "from"
}
const cookieKeys = {
  auth: "auth"
}


export default {
  showLoading,
  hideLoading,
  confirmDelete,
  postJson,
  getJson,
  api,
  popMsg,
  showMsg,
  hideMsg,
  confirm,
  getUrlParam,
  browser,
  clone,
  downLoadExcel,
  createAndSendForm,
  sessionStorageKeys,
  localStorageKeys,
  cookieKeys,
  getCookie
}







