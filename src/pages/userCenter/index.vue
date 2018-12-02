<template>
  <div>
    用户中心页面
    <img src="../../../static/banner.jpg"/>
    <div>{{testname}}</div>
    <button @click="changeName">testname</button>
    <!-- <div v-for="(item, index) in imgList" :key="index">{{item}}</div> -->
    <swiper class="swiper"  
            @change="getHeight"
            :previous-margin="50"
            :next-margin="50"
            
            :indicator-dots="true" 
            :autoplay="false" 
            :interval="5000" 
            :duration="800">
        
            <swiper-item v-for="(item, index) in images" :key="index">
                <image :src="item.url" class="slide-image" />
            </swiper-item>
        
    </swiper> 

  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      testname: "张瀚文",
      swiperH: "", //swiper高度
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
    swiperchange() {
      console.log("change");
    },
    getHeight(e) {
      console.log("swiper change");
      let winWid = wx.getSystemInfoSync().windowWidth - 2 * 50; //获取当前屏幕的宽度
      console.log(e,winWid);
      // let imgh = e.detail.height; //图片高度
      // let imgw = e.detail.width;
      // let sH = winWid * imgh / imgw + "px";
      // this.swiperH = sH;
    },
    changeName() {
      console.log(this);
      this.testname = "夏洛语";
    }
  }
};
</script>

<style>
swiper {
  padding-top: 30px;
}
.slide-image {
  width: 100%;
  display: block;
  transform: scale(0.8);
  transition: all 0.3s ease;
}
.slide-image.le-active {
  transform: scale(1);
}
</style>
