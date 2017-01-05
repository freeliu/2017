/**
 * Created by olive on 2017/1/5.
 * 路由配置,给main.js引用（也可以直接在）
 */
//正常加载
import app1 from "../../pages/App1.vue";

//懒加载
const app2 = resolve => require(['../../pages/App2'], resolve)

export default[
    {path: '/app1', component: app1},
    {path: '/app2', component: app2},
    {path: '*', component: app1}
    ]

