<template>
  <div class="content">
    <div class="top">
      <image class="topbg" src="/static/img/topbg.png" mode="widthFix"/>
    </div>
    <div class="title">预约设计师</div>
    <scroll-view
      scroll-y
      @scrolltoupper="upper"
      @scrolltolower="lower"
      :style="{height:scroll_height}"
      class="scrollview">
      <view style="height: 80rpx"></view>
      <view @click="chooseDesigner(item)" class="designer-list" v-for="item in photoGraphersList" :key="item.id">
        <div class="designer-avatar">
          <img src="/static/img/avatar.jpg"/>
        </div>
        <div class="designer-info">
          <div class="name">{{item.Cameraman_name}}</div>
          <div class="position">拍摄总监</div>
          <div class="style">{{item.Cameraman_style}}</div>
          <div class="number">
            <div class="yuyue"><i class="icon iconfont">&#xe66f;</i>123人预约</div>
            <div class="haoping"><i class="icon iconfont">&#xe668;</i>123人好评</div>
          </div>
        </div>
      </view>
    </scroll-view>
    <div class="bottom">
      <image class="botimg" src="/static/img/bottombg.png" mode="widthFix"/>
    </div>
  </div>
</template>

<script>
import {get, post} from "@/http/api"
export default {
  components: {},
  data() {
    return {
      scroll_height: '',
      photoGraphersList: []
    };
  },
  onLoad(options) {
    let windowHeight = wx.getSystemInfoSync().screenHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().screenWidth // 屏幕的宽度
    this.scroll_height = windowHeight * 750 / windowWidth - 280 - 40 + 'rpx'
  },
  methods: {
    chooseDesigner(item) {
      console.log(item)
      const path = 'designerInfo/main'
      this.$router.push({ path: `../${path}`, query: {
        Cameraman_id: item.Cameraman_id
      } });
    },
    getPhotographersList() {
      let params = {
        url: '/edit_cameraman_info/',
      }
      get(params).then(res=>{ 
        console.log(res)
        this.photoGraphersList = res
      })
    },
    upper() {
      console.log('下拉刷新！')
    },

    lower() {
      console.log('上拉加载！')
    }
  },
  mounted(){
    this.getPhotographersList()
  },
}
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
  .title {
    width: 100%;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    z-index: 10;
  }
  .top{
    width:100%;
    height:200rpx;
    position:fixed;
    z-index:10;
    top: 0;
    left: 0;
    .topbg {
      width: 100%;
      height: 100%;
    }
  }
  .scrollview {
    margin-top: 50rpx;
    .designer-list {
      width: 730rpx;
      height: 280rpx;
      margin: 0 auto;
      box-shadow:10rpx 10rpx 10rpx rgba(15,16,15,0.13);
      display: flex;
      flex-direction: row;
      margin-bottom: 15px;
      .designer-avatar {
        width: 280rpx;
        height: 280rpx;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .designer-info {
        flex: 1;
        background: #fff;
        .name {
          font-size: 35rpx;
          text-align: center;
          line-height: 80rpx;
        }
        .position,.style {
          font-size: 26rpx;
          line-height: 50rpx;
          text-align: center;
          color: #1b4a5d;
        }
        .number {
          color: #959999;
          font-size: 25rpx;
          line-height: 80rpx;
          .yuyue {
            float: left;
            margin-left: 50rpx;
          }
          .haoping {
            float: right;
            margin-right: 50rpx;
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
    height: 80rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index:10;
    .botimg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
