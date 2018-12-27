<template>
  <div class="content">
    <div class="top">
      <img class="topbg" src="/static/img/topbg.png" />
      <div class="avatar-wrapper">
        <div class="avatar">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <open-data class="name" type="userNickName"></open-data>
      </div>
    </div>
    <div class="main">

      <div class="menu-wrapper">
        <div  v-for="(item,index) in menuData" :key="index" class="menu-item">
          <img :src="item.imgUrl" @click="goTargetPath(item.targetPath)" />
          <p>{{item.name}}</p>
        </div>
       
      </div>
     
      <swiper class="swiper"  
            @change="swiperChange"
            :previous-margin="50"
            :next-margin="50"
            :indicator-dots="true" 
            :autoplay="false" 
            :interval="2000" 
            :style="{height:swiperH}"
            :duration="800">
            
            <swiper-item v-for="(item, index) in images"
                          :key="index">
                <image  @load="getHeight" 
                        :style="{height:swiperH}"
                        :class="{ 'le-active': nowIdx===index }"  
                        :src="item.image" class="le-img" />
            </swiper-item>
        
    </swiper> 
    <div class="activeimg-wrapper">
      <div style="margin-right:-70px" class="active-img"></div>
      <div style="margin-left:-70px" class="active-img"></div>
    </div>
    </div>
    <div class="bottom">
      <img src="/static/img/bottombg.png" />
    </div>
  </div>
</template>

<script>
import {get, post} from "@/http/api";
import MD5 from 'md5.js'

export default {
  data() {
    return {
      userInfo: null,
      menuData: [{
        name:'作品',
        imgUrl: '/static/img/zuopin.png',
        targetPath:'cascadeFlow/main'
      },{
        name:'预约',
        imgUrl: '/static/img/yuyue.png',
        targetPath: 'myYuyue/main',
        // targetPath:'designerList/main'
      },{
        name:'活动',
        imgUrl: '/static/img/huodong.png',
        targetPath:'activityList/main'
      },{
        name:'更多',
        imgUrl: '/static/img/gengduo.png',
        targetPath:'userCenter/main'
      }],
      motto: "Hello World",
      swiperH: "", //swiper高度
      nowIdx: 0, //当前swiper索引
      bannerList: [],
      images: [
        {
          image: "/static/banner.jpg"
        },
        {
          image: "/static/banner.jpg"
        },
        {
          image: "/static/banner.jpg"
        },
        {
          image: "/static/banner.jpg"
        }
      ]
    };
  },

  methods: {
    getHeight(e) {
      
      let winWid = wx.getSystemInfoSync().windowWidth - 2 * 50; //获取当前屏幕的宽度
      let imgh = e.target.height; //图片高度
      let imgw = e.target.width;
      let h = winWid * imgh / imgw ;
      let sH = (h-20) + "px"

      this.swiperH = sH ;
    },
    swiperChange(e) {
      this.nowIdx = e.target.current;
    },
    goTargetPath(path) {
       this.$router.push({ path: `../${path}`, query: {} });
    },
    getUserInfo() {
     
      let params = {
        url: '/get_student/'
       
      }
      post(params).then(res=>{
        console.log('get_student',res)
        wx.setStorage({
          key:"userInfo",
          data: res//JSON.stringify(res)
        })
      })
    },
    getJwt(code,encryptedData,iv) {
      let params = {
        url: '/api/enter/',
        data: {
          code: code,
          encryptedData:encryptedData,
          iv: iv
        }
      }
      post(params).then(res=>{ 
        console.log('getJwt',res)
        
        wx.setStorage({
          key:"jwt",
          data:res.access,
          success:() => {
            this.getUserInfo();
          }
        })
        
      })
    },
    login() {
      let code ;
      let encryptedData;
      let iv;
      let that = this;
      wx.login({
        success(res) {
          console.log('login',res)
          code = res.code
          if (res.code) {
            wx.getUserInfo({
              success(res) {
                console.log('getUserInfo',res)
                encryptedData = res.encryptedData
                iv = res.iv

                wx.setStorage({
                  key:"wxInfo",
                  data:{
                    code:code,
                    encryptedData:encryptedData,
                    iv:iv
                  },
                  
                })

                that.userInfo = res.userInfo
                that.getJwt(code,res.encryptedData,res.iv);
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    getBanner() {
      let params = {
        url: '/get_rotation_chart/',
      }
      get(params).then(res => {
        console.log('banner',res)
        this.bannerList = res
      })
    }
  },
  onLoad(options) {
    this.login();
    this.getBanner();
    console.log('md555555555555555',new MD5().update('42').digest('hex'))
  },
  created() {
    
  }
};
</script>

<style lang="scss">
page {
  height: 100%;
}
swiper {
  margin-top: 20rpx;
 
}
.content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top{
    width: 100%;
    height: 250rpx;
    position: relative;
    display: flex;
    align-items: center;
    .avatar-wrapper {
      width: 500rpx;
      height: 150rpx;
      display: flex;
      align-items: center;
      margin-left: 50rpx;
      margin-top:-50rpx;

      .avatar {
        
        float: left;
        width: 140rpx;
        height: 140rpx;
        border-radius: 50%;
        margin-right:10rpx;
        overflow: hidden;

        .img {
          border-radius: 150rpx;
          border: 2px solid #fff;
          width: 100%;
          height: 100%;
        }
      }
      .name {
        margin-left: 20rpx;
        float: left;  
      }
    }
    .topbg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
  
  .main{
    width: 100%;
    flex: 1;
    overflow: auto;
    
    .le-img {
      width: 100%;
      display: block;
      transform: scale(0.8);
      border-radius: 15rpx;
      transition: all 0.3s ease;
    }
    .le-img.le-active {
      transform: scale(1);
      z-index: 10
    }
    .menu-wrapper {
      width: 100%;
      height: 200rpx;
      display: flex;
      flex-direction: row;
      justify-content:space-around;
      align-items: center;
      text-align: center;
      font-size: 14px;
      .menu-item {
        width: 100rpx;
        height: 150rpx;
        img {
          border-radius: 100rpx;
          border: 1px solid #efcd6d;
          width: 90rpx;
          height: 90rpx;
        }
      }
      
    }
    .activeimg-wrapper {
      margin-top: 50rpx;
      width: 100%;
      height: 340rpx;
      display: flex;
      flex-direction: row;
      justify-content:space-around;

      .active-img {
        width: 220rpx;
        height: 220rpx;
        border-radius: 15rpx;
        border: 2px solid #efcd6d;
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
