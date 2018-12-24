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
            <!-- <div class="haoping"><i class="icon iconfont">&#xe668;</i>123人好评</div> -->
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
      <!-- <div class="date-wrapper">
        <picker 
          mode="date" 
          :value="date" 
          start="2015-09-01" 
          @change="bindDateChange"> 
                <p class="picker">
                        当前选择: {{date}}
                  </p>
        </picker>

      </div> -->
      
    </div>
    <div class="bottom">
      <img src="/static/img/bottombg.png" />
    </div>
    
  </div>
</template>

<script>
import {get, post,postJSON} from "@/http/api"
export default {
  components: {

  },

  data() {
    return {
      date:'',
      Cameraman_id: '',
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
  onLoad(options) {
    this.Cameraman_id = this.$router.currentRoute.query.Cameraman_id
    // this.getDesignerInfo(this.Cameraman_id);
    // this.getDesignerImg(this.Cameraman_id);
    console.log(this.$router.currentRoute)
    
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
    bindDateChange(e) {
      console.log(e)
      this.date = e.target.value
    },
    getDesignerInfo(Cameraman_id) {
      console.log(Cameraman_id)
      let params = {
        url: `/edit_cameraman_info/${Cameraman_id}/`,
        
      };
      get(params).then(res=>{ 
        console.log(res)
       
      }) 
    },
    getDesignerImg(Cameraman_id) {
      let params = {
        url: `/get_camerman_image/${Cameraman_id}/`,
        
      };
      get(params).then(res=>{ 
        console.log(res)
       
      }) 
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
swiper {
  margin-top: 20rpx;
 
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
            text-align: center;
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
