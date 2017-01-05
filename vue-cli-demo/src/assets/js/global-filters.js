/**
 * Created by olive on 2017/1/5.
 * 全局过滤器，给main.js引用
 */
    // 普通过滤器
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
    }
}

//枚举值过滤器
import enums from "./enums.js";

for(let k in enums)
{
    filters[k]=function (val) {
        return enums[k][val];
    }
}
export default filters;
