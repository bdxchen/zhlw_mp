<template>
  <div class="content">
    <div class="top">
      <image class="topbg" src="/static/img/topbg.png" mode="widthFix"/>
    </div>
    <view class="swiper-tab">
        <view class="swiper-tab-item" :class="{'active': currentTab==0}" data-current="0" @tap="clickTab">我的</view>
        <view class="swiper-tab-item" :class="{'active': currentTab==1}" data-current="1" @tap="clickTab">我喜欢的</view>
    </view>
    <swiper 
      :current="currentTab" 
      duration="300"  
      @change="swiperTab"
      :style="{height:scroll_height}">
      <swiper-item >
        <view style="display:none">
          <image v-for="item in images" :key="item.id" :id="item.id" :src="item.pic" @load="onImageLoad"></image>
        </view>
        <scroll-view 
          class="scrollview" 
          scroll-y="true" 
          :style="{height:scrollH + 'px'}" 
          @scrolltolower="loadImages">
          <view style="width:100%">
            <view class="img_item">
              <div style="height: 90rpx"></div>
              <div class="flowPic" v-for="item in col1" :key="item.id">
                <image :src="item.pic" :style="{height:item.height + 'rpx'}" ></image>
                <div class="imgbottom"></div>
              </div>
            </view>
            <view class="img_item">
              <div style="height: 90rpx"></div>
              <div class="flowPic" v-for="item in col2" :key="item.id">
                <image :src="item.pic" :style="{height:item.height + 'rpx'}" ></image>
                <div class="imgbottom"></div>
              </div>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
      <swiper-item>
        <scroll-view 
          class="scrollview" 
          scroll-y="true" 
          :style="{height:scrollH + 'px'}" 
          @scrolltolower="loadImages">
          <view style="width:100%">
            <view class="img_item">
              <div style="height: 90rpx"></div>
              <div class="flowPic" v-for="item in col1" :key="item.id">
                <image :src="item.pic" :style="{height:item.height + 'rpx'}" ></image>
                <div class="imgbottom"></div>
              </div>
            </view>
            <view class="img_item">
              <div style="height: 90rpx"></div>
              <div class="flowPic" v-for="item in col2" :key="item.id">
                <image :src="item.pic" :style="{height:item.height + 'rpx'}" ></image>
                <div class="imgbottom"></div>
              </div>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
     
      currentTab: 0,
      scroll_height: '',
      scrollH: 0,
      imgWidth: 345,
      col1H: 0,
      col2H: 0,
      loadingCount: 0,
      images: [],
      col1: [],
      col2: []
    };
  },

  onLoad(options) {
    let windowHeight = wx.getSystemInfoSync().screenHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().screenWidth // 屏幕的宽度
    this.scroll_height = windowHeight * 750 / windowWidth - 200 - 40 + 'rpx'
    wx.getSystemInfo({
        success: (res) => {
            let ww = res.windowWidth;
            let wh = res.windowHeight;
            let scrollH = wh;
            this.scrollH = scrollH
            this.loadImages();
        }
    })
  },

  methods: {
    swiperTab(e) {
      console.log(e)
      this.currentTab = e.target.current;
    },
    //点击切换
    clickTab(e) {
      if (this.currentTab === e.currentTarget.dataset.current) {
        return false;
      } else {
        this.currentTab = e.currentTarget.dataset.current
      }
    },
    upper() {
      console.log('下拉刷新！')
    },
    lower() {
      console.log('上拉加载！')
    },
    onImageLoad(e) {
        let imageId = e.target.id;
        let oImgW = e.target.width;         //图片原始宽度
        let oImgH = e.target.height;        //图片原始高度
        let imgWidth = this.imgWidth;       //图片设置的宽度
        let scale = imgWidth / oImgW;       //比例计算
        let imgHeight = oImgH * scale;      //自适应高度
        let images = this.images;
        let imageObj = null;

        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            if (img.id === imageId) {
                imageObj = img;
                break;
            }
        }
        
        imageObj.height = imgHeight;
        let loadingCount = this.loadingCount - 1;
        let col1 = this.col1;
        let col2 = this.col2;
        if (this.col1H <= this.col2H) {
            this.col1H += imgHeight;
            col1.push(imageObj);
        } else {
            this.col2H += imgHeight;
            col2.push(imageObj);
        }
        if (!loadingCount) {
            this.images = [];
        }
        this.loadingCount = loadingCount;
        this.col1 = col1;
        this.col2 = col2;
    },
    loadImages: function () {
        let images = [
          { pic: "/static/banner1.png", height: 0 },
          { pic: "/static/banner2.png", height: 0 },
          { pic: "/static/banner3.png", height: 0 },
          { pic: "/static/banner4.png", height: 0 },
          { pic: "/static/banner5.png", height: 0 },
          { pic: "/static/banner.jpg", height: 0}
        ];
        let baseId = "img-" + (+new Date());
        for (let i = 0; i < images.length; i++) {
            images[i].id = baseId + "-" + i;
        }
        this.loadingCount = images.length,
        this.images = images
    }
  },
  mounted() {
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
    width:100%;
    height:200rpx;
    position:fixed;
    top: 0;
    left: 0;
    z-index: 10;
    .topbg {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-tab{
    width: 100%;
    text-align: center;
    height: 100rpx;
    font-size: 32rpx;
    line-height: 88rpx;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    z-index:10;
    .swiper-tab-item{
      width: 375rpx;
      height: 100rpx;
      margin: 0 50rpx;
      color:#FFF;
    }
    .active{
      color:#FFF;
      border-bottom: 6rpx solid #323c46;
    }
  }
  swiper{
    text-align: center;
    margin-top: 100rpx;
    .scrollview{
      display: flex; 
      flex-flow: column wrap;
      .img_item {
        width: 345rpx;
        float: left;
        margin-left: 20rpx; 
        image{
          width: 100%;
        }
        .flowPic{
          width:345rpx;
          height:auto;
          float: left;
          border-radius:6rpx;
          overflow:hidden;
          margin-bottom: 25rpx;
          image{
            width: 100%;
            display: block;
          }
          .imgbottom{
            height: 80rpx;
            background: #FFF;
          }
        }
      }
    }
  }
}  



</style>
