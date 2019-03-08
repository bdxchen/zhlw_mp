<template>
  <div class="content">
    <div class="top">
      <image class="topbg" src="/static/img/topbg.png" mode="widthFix"/>
    </div>
    <div class="title">预约摄影师</div>
    <scroll-view
      scroll-y
      @scrolltoupper="upper"
      @scrolltolower="lower"
      :style="{height:scroll_height}"
      class="scrollview">
      <div class="designer-wrapper">
        <view @click.stop="chooseDesigner(item)" class="designer" v-for="(item,index) in photoGraphersList" :key="index">
          <div class="avatar">
            <img :src="item.Cameraman_img"/>
          </div>
          <div class="info">
            <div class="name">
              摄影师：{{item.Cameraman_name}}
            </div>
            <div class="icon-box">
              <text class="icon iconfont">&#xe60c;</text>{{item.Cameraman_yuyue}}人预约
              <text class="icon iconfont">&#xec7f;</text>{{item.Cameraman_points}}人好评
            </div>
          </div>
        </view>
      </div>
      
    </scroll-view>
    <div class="bottom">
      <image class="botimg" src="/static/img/bottombg.png" mode="widthFix"/>
    </div>
  </div>
</template>

<script>
import {get, post,postJSON} from "@/http/api"
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
  onShow() {
    this.getPhotographersList()
  },
  methods: {
    giveLike(item) {
      
      let params = {
        url: '/add_cameraman_points/',
        data:{
          Cameraman_id:item.Cameraman_id
        }
      }
      post(params).then(res=>{ 
        console.log('点赞',res)
        if(res.code==0){
          item.Cameraman_points++
        }else if(res.code==2){
          wx.showModal({
          content: '您已经给摄影师点过赞了',
          showCancel: false,
          success:  (res) => {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
        }
      })

    },
    chooseDesigner(item) {
      console.log(item)
    
      const path = 'designerInfo.1/main'
      this.$router.push({ path: `../${path}`, query: {
        Cameraman_id: item.Cameraman_id,
       
      } });
    },
    getPhotographersList() {
      let params = {
        url: '/edit_cameraman_info/',
      }
      get(params).then(res=>{ 
        console.log(res)
        this.photoGraphersList = res.data
      })
    },
    upper() {
      console.log('下拉刷新！')
    },

    lower() {
      console.log('上拉加载！')
    }
  },
  //
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
  background: #fff;
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
    padding-top: 80rpx;
   
    .designer-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content:space-between;
      box-sizing: border-box;
      .designer {
        width: 330rpx;
        height: 400rpx;
        margin: 0 auto;
        box-shadow:10rpx 10rpx 10rpx #ede381;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 15px;
        .avatar {
          width: 100%;
          height: 290rpx;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info{
          
          height: 110rpx;
          .name {
            height: 50%;
            font-size: 14px;
            font-weight: 100;

          }
          .icon-box {
            height: 50%;
            font-size: 12px;
            font-weight: 100;
            text-align: right;
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
