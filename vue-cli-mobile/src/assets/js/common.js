/**
 * Created by olive on 2017/2/8.
 */

//判断是否是本地环境
let isLocal = /127.0.0.1|localhost|192.168/.test(location.host);

//todo 本地地址写测试环境api域名
let apiDomain = isLocal ? "" : location.origin;
let imgDomain = '//meishakeji-oss1.oss-cn-shenzhen.aliyuncs.com/';

let api = {
  responseCode: {
    success: 0,
    noLogin: -1001
  },
  login: apiDomain + "/api/login"
}

export default {
  isLocal,
  imgDomain,
  api
}
