/**
 * Created by olive on 2017/2/10.
 * 处理新web api，浏览器还不支持的情况，如需使用Promise、fetch 给main.js引用
 */


import Promise from 'promise-polyfill';
import 'whatwg-fetch'

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}


