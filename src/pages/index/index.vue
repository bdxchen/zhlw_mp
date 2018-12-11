<template>
  <div class="container">
    <div class="userinfo" @click="bindViewTap">
      <open-data type="userAvatarUrl"></open-data>
      <div class="userinfo-nickname">
        <open-data type="groupName" open-gid="xxxxxx"></open-data>
      </div>
    </div>
    <mp-button type="primary" size="large" btnClass="mb15">这是一个weui的按钮</mp-button>
    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>
    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/index1/main" class="counter">index</a>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>
    <a href="/pages/activity/main" class="counter">去往活动页面</a>
    <a href="/pages/appointment/main" class="counter">去往预约页面</a>
    <a href="/pages/appointmentComplete/main" class="counter">去往预约成功页面</a>
    <a href="/pages/cascadeFlow/main" class="counter">去往瀑布流页面</a>
    <a href="/pages/designerList/main" class="counter">去往设计师列表页面</a>
    <a href="/pages/downloadPic/main" class="counter">去往下载图片页面</a>
    <a href="/pages/userCenter/main" class="counter">去往用户中心页面</a>
  </div>
</template>

<script>
import card from "@/components/card";
import mpButton from "mpvue-weui/src/button";
export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {}
    };
  },

  components: {
    card,
    mpButton
  },

  methods: {
    bindViewTap() {
      const url = "../counter/main";
      console.log(123);
      //mpvue-router跳转
      this.$router.push({ path: url, query: {} });

      // 微信小程序原生跳转
      // wx.navigateTo({ url });
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    }
  },

  created() {

  }
};
</script>

<style lang="scss" scoped>
$b2: #f4f4f4;
$b3: #ccc;
$b5: #333;
$b4: #999;
$b1: #2da4ff;
$y2: #ff7b33;
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: $b4;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 0.2rem;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
