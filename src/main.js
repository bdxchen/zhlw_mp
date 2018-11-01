import Vue from "vue";
import App from "./App";
import "mpvue-weui/src/style/weui.css";
import MpvueRouterPatch from "mpvue-router-patch";
import store from "./store/index";

Vue.config.productionTip = false;
App.mpType = "app";

Vue.prototype.$store = store;
Vue.use(MpvueRouterPatch);

const app = new Vue(App);

app.$mount();
