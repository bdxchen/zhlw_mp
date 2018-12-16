<template>
  <div class="content">
    <div class="top">
      <img class="topbg" src="/static/img/topbg.png" />
      <!-- <img class="back" src="/static/img/back.png" /> -->
    </div>
    <div class="main">
      
      <div class="success-box" style="">
        <img class="success-img" src="/static/img/wancheng.png"/>
        <div class="success-info">
          预约完成！您的专属设计师将在1个小时内联系您，请保持手机畅通。
        </div>
      </div>
      <div class="designer-list">
        <div class="designer-avatar">
          <img src="/static/img/avatar.jpg"/>
        </div>
        <div class="designer-info">
          <div class="name">逆袭东东</div>
          <div class="position">拍摄总监</div>
          
          <div class="number">
            <div class="yuyue"><i class="icon iconfont">&#xe66f;</i>123人预约</div>
            <div class="haoping"><i class="icon iconfont">&#xe668;</i>123人好评</div>
          </div>
        </div>
      </div>
      <div class="designer-time">
        <div class="time1">预约时间</div>
        <div class="time2">2018/11/11</div>
      </div>
      <div class="goIndex">返回首页</div>
    </div>
    <div class="bottom">
      <img src="/static/img/bottombg.png" />
    </div>
    
  </div>
</template>

<script>

export default {
  components: {

  },

  data() {
    return {

    };
  },

  created() {

  }
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
  flex-direction: column;
  background: #faecc7;
  .top{
    width: 100%;
    height: 200rpx;
    position: relative;
    display: flex;
    align-items: center;
    
    .back {
      
      width: 80rpx;
      height: 80rpx;
      position: absolute;
      top: 10px;
      left: 10px;

    }
    .title {
      width: 100%;
      color: #fff;
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      z-index: 10;
    }
    .topbg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
     
    }
  }
  
  .main{
    width: 100%;
    padding-top:15px; 
    flex: 1;
    overflow: auto;
    
    .success-box {
      text-align:center;
      margin-top:-10px;
      .success-img {
        width: 60px;
        height: 60px;
        
        
      }
      .success-info {
        margin: 20rpx 0px;
        padding: 0 15px;
        font-size: 18px;
        
      }
      
    }
    .goIndex {
      width: 50%;
      background: #fff;
      border-radius: 5rpx;
      text-align: center;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 14px;
      margin: 20rpx auto;
      
    }
    .designer-time {
      box-sizing: border-box;
      height:80rpx;
      line-height: 80rpx;
      width: 95%;
      margin: 0 auto;
      
      color: #1b4a5d;
      padding: 0 80rpx;
      background:#fff;
      font-size: 14px;
      .time1 {
        float: left;
      }
      .time2 {
        float: right;
      }
    }
    .designer-list {
     
      width: 95%;
      height: 250rpx;
      margin: 0 auto;
      box-shadow:2px 2px 5px #ccc;
      display: flex;
      flex-direction: row;
      margin-bottom: 15px;
      background:#fff;
      .designer-avatar {
        width: 250rpx;
        height: 250rpx;
        display: flex;
        align-items: center;
        justify-content: center;
       
        img {
           border-radius: 200rpx;
          width: 200rpx;
          height: 200rpx;
        }
      }
      .designer-info {
        flex: 1;
        background: #fff;
        padding-top: 35rpx;
        .name {
          text-align: center;
        }
        .position,.style {
          font-size: 16px;
          text-align: center;
          color: #1b4a5d;
        }
        .number {
          color: #959999;
          font-size: 16px;
          .yuyue {
            float: left;
            margin-left: 15px;
          }
          .haoping {
            float: right;
            margin-right: 15px;
          }
          .icon {
            display: inline;
            font-size:38rpx;
            margin-right:5px;
          }
        }
       
      }
      
    }
    
    
  }
  .bottom {
    width: 100%;
    height: 50px;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
