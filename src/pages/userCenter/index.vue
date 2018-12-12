<template>
  <div>
    用户中心页面
    <div :class="{test: test===true}">{{nowIdx}}</div>
    
    <swiper class="swiper"  
            @change="swiperChange"
            :previous-margin="50"
            :next-margin="50"
            :indicator-dots="true" 
            :autoplay="false" 
            :interval="5000" 
            :duration="800">
        
            <swiper-item v-for="(item, index) in images"
                         
                          :key="index">
                <image  :class="{ 'le-active': nowIdx===index }" @load='getHeight'  :src="item.url" class="le-img" :style='{height: swiperH}' />
            </swiper-item>
        
    </swiper> 

  </div> 
</template>

<script>
//import { swiper } from "@/common/js/swiper.js";
export default {
  components: {},

  data() {
    return {
      testname: "张瀚文",
      swiperH: "", //swiper高度
      test: true,
      nowIdx: 0, //当前swiper索引
      imgList: [
        //图片列表
        "/assets/img/banner.jpg",
        "/assets/img/banner.jpg",
        "/assets/img/banner.jpg"
      ],
      images: [
        {
          url: "../../../static/banner.jpg"
        },
        {
          url: "../../../static/banner.jpg"
        },
        {
          url: "../../../static/banner.jpg"
        }
      ]
    };
  },

  created() {},
  methods: {
    
    getHeight(e) {
      
      let winWid = wx.getSystemInfoSync().windowWidth - 2 * 50; //获取当前屏幕的宽度
      console.log(e,winWid);
      let imgh = e.target.height; //图片高度
      let imgw = e.target.width;
      let sH = winWid * imgh / imgw + "px";
      this.swiperH = sH;
    },
    swiperChange(e) {
      console.log("eee", e);
      this.nowIdx = e.target.current;
    }
    
  }
};
</script>

<style>
swiper {
  padding-top: 30px;
}
.test {
  background: #ccc;
}
.le-img {
  width: 100%;
  display: block;
  transform: scale(0.8);
  transition: all 0.3s ease;
}
.le-img.le-active {
  transform: scale(1);
}
</style>
