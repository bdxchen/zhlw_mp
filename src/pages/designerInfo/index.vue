<template>
  <div class="content">
    <div class="top">
      <img class="topbg" src="/static/img/topbg.png" />
      
      <img class="avatar" src="/static/img/avatar.jpg"/>
    </div>
    <div class="main">
      <div class="designer-info">
        <div class="name">逆袭东东</div>
          <div class="position">拍摄总监</div>
          <div class="number">
            <div class="yuyue"><i class="icon iconfont">&#xe66f;</i>123人预约</div>
            <div class="haoping"><i class="icon iconfont">&#xe668;</i>123人好评</div>
          </div>
      </div>
      <div class="date-wrapper">
        <picker 
          mode="date" 
          :value="date" 
          start="2015-09-01" 
          @change="bindDateChange"> 
                <p class="picker">
                        当前选择: {{date}}
                  </p>
        </picker>

      </div>
      
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
      date:'',
    };
  },
  methods: {
    bindDateChange(e) {
      console.log(e)
      this.date = e.target.value
    }
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
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 100px;
      position: absolute;
      left: 50%;
      top: 25%;
      margin-left: -50px;
    }
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
    .date-wrapper {
      width: 100%;
      height: 200rpx;
      background: wheat;
    }
    .designer-info {
      margin-top: 20px;
      // display: flex;
      // justify-content: center;
      .name {
        text-align: center;
      }
      .position {
        text-align: center;
        font-size: 16px;
        color:  #959999;
      }
      .number {
        color: #959999;
        font-size: 16px;
        .yuyue {
            float: left;
            margin-left: 20%;
          }
        .haoping {
          float: right;
          margin-right: 20%;
        }
        .icon {
          display: inline;
          font-size:38rpx;
          margin-right:5px;
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
