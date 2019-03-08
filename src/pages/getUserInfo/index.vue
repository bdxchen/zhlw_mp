<template>
  <div class="content">
    <div class="card">
      <div class="avatar"><img src="/static/avatar.png" alt=""></div>
      <div class="title">涩果摄影</div>
      <div class="contenttext">此小程序由涩果摄影定制，即将会使用您的公开信息(名称、头像等)进入小程序吗，请您确认。</div>
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo"  class="btn">点击进入</button>
    </div>
  </div>
</template>

<script>
export default {
  
  
  methods: {
    
    bindGetUserInfo(e) {
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData){
        //用户按了允许授权按钮
        this.$router.push({ path: `../index1/main`, query: {} });
      } else {
        //用户按了拒绝按钮
      }
    },
  },
  
};
</script>

<style lang="scss">
page {
  height: 100%;
}
.content{
  width: 100%;
  height: 100%;
  display: flex;
  background: #eff3f6;
  flex-direction: column;
  .card{
    width:686rpx;
    height:700rpx;
    margin:150rpx auto 0;
    background:#FFF;
    border-radius:10rpx;
    padding:0 70rpx;
    box-sizing:border-box;
    .avatar{
      width: 125rpx;
      height: 125rpx;
      margin: 90rpx auto 20rpx;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .title{
      height: 80rpx;
      font-size: 36rpx;
      text-align: center;
      line-height: 40rpx;
      border-bottom: 1px solid #e5e5e5;
    }
    .contenttext{
      font-size: 28rpx;
      line-height: 60rpx;
      color: #949494;
    }
    .btn{
      width: 520rpx;
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
      color: #FFF;
      font-size: 30rpx;
      margin: 20rpx auto 0;
      background: #ff4512;
      border-radius: 90rpx;
    }
  }
}
</style>
