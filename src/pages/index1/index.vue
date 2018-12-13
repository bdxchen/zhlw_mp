<template>
  <div class="content">
    <div class="top">
      <img class="topbg" src="/static/img/topbg.png" />
      <div class="avatar-wrapper">
        <div class="avatar"></div>
        <div class="name">逆袭懂得</div>
      </div>
    </div>
    <div class="main">
      <div class="menu-wrapper">
        <div class="menu-item">
          <img src="/static/img/zuopin.png" />
          <p>作品</p>
        </div>
        <div class="menu-item">
          <img src="/static/img/yuyue.png" />
          <p>预约</p>
        </div>
        <div class="menu-item">
          <img src="/static/img/huodong.png" />
          <p>活动</p>
        </div>
        <div class="menu-item">
          <img src="/static/img/gengduo.png" />
          <p>更多</p>
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
                        :src="item.url" class="le-img" />
            </swiper-item>
        
    </swiper> 
    </div>
    <div class="bottom">
      <img src="/static/img/bottombg.png" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      motto: "Hello World",
      swiperH: "", //swiper高度
      nowIdx: 0, //当前swiper索引
      images: [
        {
          url: "/static/banner.jpg"
        },
        {
          url: "/static/banner.jpg"
        },
        {
          url: "/static/banner.jpg"
        },
        {
          url: "/static/banner.jpg"
        }
      ]
    };
  },

  methods: {
    getHeight(e) {
      
      let winWid = wx.getSystemInfoSync().windowWidth - 2 * 50; //获取当前屏幕的宽度
      let imgh = e.target.height; //图片高度
      let imgw = e.target.width;
      let sH = winWid * imgh / imgw + "px";
      this.swiperH = sH;
      console.log('hhhhhhh',sH)
    },
    swiperChange(e) {
      this.nowIdx = e.target.current;
    }
  },

  created() {}
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
    height: 300rpx;
    position: relative;
    display: flex;
    align-items: center;
    .avatar-wrapper {
      width: 500rpx;
      height: 150rpx;
      display: flex;
      align-items: center;
      margin-left: 50rpx;
      .avatar {
        background: wheat;
        float: left;
        width: 150rpx;
        height: 150rpx;
        border-radius: 150rpx;
        border: 1px solid #fff;
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
