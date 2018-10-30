# 智华劳务小程序

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### 前端目录结构
```
├── src // 项目的源码编写文件
│ ├── components // 组件目录
│ ├── assets //静态资源
│ │ └── font // iconfont图标
│ │ └── img // 图片
│ │ └── js // js
│ ├── http //http请求配置文件
│ │ └── api // 接口调用文件
│ │ └── config //fly 配置文件
│ ├── pages //项目页面目录
│ ├── components //项目复用组件目录
│ ├── store //状态管理 vuex配置目录
│ │ └── index.js //我们组装模块并导出 store 的地方
│ │ └── module //store模块（内有示例代码）
│ ├── untils //工具函数目录
│ │ └── index.js
│ ├── App.vue // APP入口文件
│ ├── main.js // 主配置文件
│ ├── config.js // host等配置
```