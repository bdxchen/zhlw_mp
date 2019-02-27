<template>
  <div class="content">
    <div class="top">
      <img class="topbg" src="/static/img/topbg.png" />
      <div class="edit-wrapper">
        <i class="icon iconfont">&#xe669;</i>
      </div>
      <div class="avatar-wrapper">
        <div class="avatar" @click="goUserCenter">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <open-data class="name" type="userNickName"></open-data>
      </div>
      <div @click="moreFlagclick" class="moreBtn"><i class="icon iconfont">&#xe696;</i></div>
      <div v-show="moreFlag" class="moreBox">
        
        <div @click="goMyCollection" class="moreItem">我的收藏</div>
        <button open-type="contact" class="moreItem contbtn">联系客服</button>
        <!-- <div @click="showMyImg"  class="moreItem">展示自我</div> -->
      </div>
    </div>
    <div class="main">

      <div class="menu-wrapper">
        <div  v-for="(item,index) in menuData" :key="index" class="menu-item">
          <img :src="item.imgUrl" @click="goTargetPath(item.targetPath)" />
          <p>{{item.name}}</p>
          <div v-show="item.point" class="new-point"></div>
        </div>
       
      </div>
     
      <swiper class="swiper"  
            @change="swiperChange"
            :previous-margin="50"
            :next-margin="50"
            :indicator-dots="false" 
            :autoplay="true" 
            :interval="5000" 
            :style="{height:swiperH}"
            :duration="800">
            
            <swiper-item v-for="(item, index) in bannerList"
                          @click="goBannerList"
                          :key="index">
                <image  @load="getHeight"
                        
                        :style="{height:swiperH}"
                        :class="{ 'le-active': nowIdx===index }"  
                        :src="item.image" class="le-img" />
            </swiper-item>
        
    </swiper> 
    <div v-if="activityList" class="activeimg-wrapper" >
      <div style="margin-right:-10px" class="active-img" @click="goActive">
        <img :src="activityList.img_url||''"/>
      </div>
      <div v-if="moreList" style="margin-left:-10px" class="active-img" @click="goMore">
         <img :src="moreList.img_url||''"/>
      </div>
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
      moreFlag: false,
      userInfo: null,
      menuData: [{
        name:'作品',
        imgUrl: '/static/img/zuopin.png',
        targetPath:'cascadeFlow/main',
        point: false
      },{
        name:'预约',
        imgUrl: '/static/img/yuyue.png',
        targetPath: 'myYuyue/main',
        point: false
        // targetPath:'designerList/main'
      },{
        name:'活动',
        imgUrl: '/static/img/huodong.png',
        targetPath:'activityList/main',
        point: false
      },{
        name:'更多',
        imgUrl: '/static/img/gengduo.png',
        targetPath:'expandList/main',
        point: false
      }],
      motto: "Hello World",
      swiperH: "", //swiper高度
      nowIdx: 0, //当前swiper索引
      bannerList: [],
      activityList:{},
      moreList: {},
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
  onShow() {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        this.getUserInfo();
      }
    })
  },
  onLoad(options) {
    //this.login();
    this.getBanner();
    this.getActivityList();
    this.getMoreList();
    wx.showShareMenu({
      withShareTicket: true
    })
    
  },
  methods: {
    showMyImg() {
      
      wx.showModal({
        title: '温馨提示',
        content: '此功能是上传您的认为优质的摄影作品并且可以在本小程序对外展示',
        confirmText: "确定",
        cancelText: "取消",
        success:  (res) => {
          console.log(res);
          if (res.confirm) {
            wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album'],
            success(res) {
              // tempFilePath可以作为img标签的src属性显示图片
              const tempFilePaths = res.tempFilePaths
              console.log(res)
            }
          })
          } else {
            console.log('取消')
          }
        }
      });
    },
    getSetting(){
     
      let that = this
      wx.getSetting({
        success: function(res){
          console.log('getSetting',res)
          if (res.authSetting['scope.userInfo']) {
            //用户已经授权过
            that.$router.push({ path: `../index1/main`, query: {} });
          }else{
            that.$router.push({ path: `../getUserInfo/main`, query: {} });
          }
        }
      })
    },
    goMyCollection() {
      this.moreFlag = false
      this.$router.push({ path: `../${'collectionList/main'}`, query: {} });
    },
    moreFlagclick() {
      if(this.moreFlag) {
        this.moreFlag = false
      } else {
         this.moreFlag = true
      }
    },
    goUserCenter() {
      this.$router.push({ path: `../${'userCenter/main'}`, query: {} });
      //this.$router.push({ path: `../${'userInfo/main'}`, query: {} });
    },
    goBannerList() {
      
      this.$router.push({ path: `../${'bannerList/main'}`, query: {
         
      } });
    },
    getHeight(e) {
      
      let winWid = wx.getSystemInfoSync().windowWidth - 2 * 50; //获取当前屏幕的宽度
      let imgh = e.target.height; //图片高度
      let imgw = e.target.width;
      let h = winWid * imgh / imgw ;
      let sH = (h-20) + "px"

      this.swiperH = '188px' ;
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
        //true是不显示红点
        if(res.new_base_event){
          this.$set(this.menuData[2],'point',false)
        }else{
          this.$set(this.menuData[2],'point',true)
        }
        if(res.new_more_event){
          this.$set(this.menuData[3],'point',false)
        }else{
          this.$set(this.menuData[3],'point',true)
        }
        
      
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
    },
    getActivityList() {
      let params = {
        url: '/get_event_list_easy/',
        data: {
          event_type: 'base'
        }
      }
      get(params).then(res=>{ 
        console.log('getActivityList',res)
        this.activityList = res.data[0]
      
      })
    },
    getMoreList() {
      let params = {
        url: '/get_event_list_easy/',
        data: {
          event_type: 'more'
        }
      }
      get(params).then(res=>{ 
        console.log('getMoreList',res)
        this.moreList = res.data[0]
      
      })
    },
    
    goActive() {
      this.$router.push({ path: `../${'activity/main'}`, query: {
        id: this.activityList.id
      } });
    },
    goMore() {
      this.$router.push({ path: `../${'activity/main'}`, query: {
         id: this.moreList.id
      } });
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
  .top{
    width: 100%;
    height: 230rpx;
    position: relative;
    display: flex;
    align-items: center;
    .moreBtn {
      position: absolute;
      top: 0;
      right: 10px;
      .icon {
        font-size: 38px;
      }
      

    }
    .moreBox {
      background:  rgba(10, 10, 10, 0.5);
      padding: 5px;
      border-radius: 5px;
      position: absolute;
      top: 20px;
      right: 40px;
      

     .contbtn {
       background: transparent;
       line-height:1;
       border: none;

     }
      .moreItem {
        padding: 8px;
        font-size: 14px;
        color: #fff;
      }
    }
    .edit-wrapper {
      position: absolute;
      top: 0px;
      left: 170rpx;
      width: 50rpx;
      height:50rpx;
      text-align: center;
      line-height: 50rpx;
      
    }
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
        border:2px solid #fff;
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
    position: relative;
    swiper {
      margin-top: 20rpx;
     
    }
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
      height: 170rpx;
      display: flex;
      flex-direction: row;
      justify-content:space-around;
      align-items: center;
      text-align: center;
      font-size: 14px;
      
      
      .menu-item {
        width: 100rpx;
        height: 150rpx;
        position: relative;
        .new-point {
          position: absolute;
          top: 0px;
          right: 0px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background: red;
        }
        img {
          border-radius: 100rpx;
          border: 1px solid #efcd6d;
          width: 90rpx;
          height: 90rpx;
        }
      }
      
    }
    .activeimg-wrapper {
      // position: absolute;
      // bottom: 5%;
       margin-top: 50rpx;
      width: 100%;
      height: 230rpx;
      display: flex;
      flex-direction: row;
      justify-content:space-around;

      .active-img {
        width: 300rpx;
        height: 260rpx;
        border-radius: 15rpx;
        border: 2px solid #efcd6d;
        img {
          width: 100%;
          height: 100%;
          border-radius: 15rpx;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 80rpx;
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
