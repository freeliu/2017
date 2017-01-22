/**
 * Created by Administrator on 2016/12/10.
 * vue全局过滤器
 */

//v1.0版本原有过滤器，由于要改动较多，不统一放到枚举中
let filters = {
  //格式化日期成2016-10-05
  formatDateTo_yyyy_MM_dd(date) {
    if (!isNaN(date)) {
      date = new Date(parseInt(date));
    }
    var year = date.getFullYear(),
      MM = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
      dd = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    return year + '-' + MM + '-' + dd;
  },
  //格式化日期成2016年10月5日，一位日期不自动在前面加0
  chineseDateTime(date)
  {
    if (!isNaN(date)) {
      date = new Date(parseInt(date));
    }
    var year = date.getFullYear(),
      MM = date.getMonth() + 1,
      dd = date.getDate() ;
    return year + '年' + MM + '月' + dd+"日";
  }

}

import enums from "./enums.js";

for(let k in enums)
{
   filters[k]=function (val) {
     return enums[k][val];
   }
}
export default filters;
