//引入 fly
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();
var config = require("@/config")

//配置请求基地址
// //定义公共headers
// fly.config.headers={xx:5,bb:6,dd:7}
// //设置超时
fly.config.timeout = 20000;
// //设置请求基地址
fly.config.baseURL = config.host;

//添加请求拦截器
// wx.getStorage({
//   key: 'jwt',
//   success (res) {
//     fly.interceptors.request.use((request) => {
//       //给所有请求添加自定义header
//       let req = request;
//       // req.headers["X-Tag"] = "flyio";
//       req.headers["Authorization"] = `Bearer ${ res.data }`;
//       return req;
//     });
//   } 
// })

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data;
  },
  (err) => {
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
);
// Vue.prototype.$http=fly //将fly实例挂在vue原型上

export default fly;