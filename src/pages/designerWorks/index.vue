<template>
  <div class="content">
    <div class="top">
      <img class="topbg" src="/static/img/topbg.png" />
      
     
    </div>
    <div class="main">
      
      <div class="main-top">
        <div class="work-wrapper">
          <img class="work"  @click.stop="wxImgShow" :src="image"/>
          <!-- <img class="like" src="/static/img/xinxin.png"> -->
          <div @click.stop="likeClick" class="like" >
           <i class="icon iconfont" :class="{ 'like-active': likeFlag }">&#xe632;</i>
          </div>
        </div>
      </div>
       <div class="main-bottom">
         

       </div>
      
    </div>
    <div class="bottom">
      
      <img src="/static/img/bottombg.png" />
      
      
    </div>
    
  </div>
</template>

<script>
import {get, post} from "@/http/api"
export default {
  components: {

  },

  data() {
    return {
      date:'',
      image: '',
      id: '',
      likeFlag: false
    };
  },
  onLoad() {
    this.image = this.$route.query.image
    this.id = this.$route.query.id
  },
  methods: {
    bindDateChange(e) {
      console.log(e)
      this.date = e.target.value
    },
    likeClick() {
      if(this.likeFlag) {
        

         let params = {
          url: '/delete_user_like/',
          data: {
            id: this.id
          }
        }
        get(params).then(res=>{ 
          console.log(res)
          this.likeFlag = false
        
        })
      }else{
        
        //喜欢
        let params = {
          url: '/make_user_like/',
          data: {
            id: this.id
          }
        }
        get(params).then(res=>{ 
          console.log(res)
          this.likeFlag = true
        
        })
      }
      console.log(this.likeFlag)
    },
    wxImgShow() {
      console.log(1234)
      wx.previewImage({
        current: this.image, // 当前显示图片的http链接
        urls: [this.image] // 需要预览的图片http链接列表
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
    .main-top {
      height: 30%;
      width: 100%;
      
      .work-wrapper {
        position: relative;
        
        width: 100%;
        height: 300rpx;

        .work {
          position:absolute;
          width:80%;
          height:500rpx;
          margin-left: 10%;
          z-index:1;
          box-shadow:15rpx 15rpx 15rpx rgba(15,16,15,0.13);

        }
        .like {
          position:absolute;
          width: 120rpx;
          height: 120rpx;
          bottom: -250rpx;
          left: 50%;
          margin-left: -60rpx;
          z-index:2;
          background: #61b8c0;
          border-radius: 100rpx;
          text-align: center;
          line-height: 120rpx;
          .icon {
            font-size: 70rpx;
            color: #fff;
          }
          .like-active{
            color: #f4c51c;
          }
        }
      }
      
    }
    .main-bottom {
      height: 70%;
      width: 100%;
      background: #f4c51c;
      position: relative;
      .btns-wrapper {
        width: 100%;
        position: absolute;
        bottom: 10rpx;
        display: flex;
        flex-direction: row;
        justify-content:space-around;
        .download-btn {
          margin: 20px auto;
          width: 330rpx;
          height: 90rpx;
          text-align: center;
          line-height: 90rpx;
          
          // box-shadow:8rpx 8rpx 8rpx rgba(15,16,15,0.13);
          position: relative;
          .btn {
            position: absolute;
            top: 0;
            left: 0;
            width: 330rpx;
            height: 90rpx;
          
          }
          .text {
            width: 200rpx;
            color: #fff;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -100rpx;
          }
        }
        .complete-btn {
          margin: 20px auto;
          width: 330rpx;
          height: 90rpx;
          text-align: center;
          line-height: 90rpx;
          
          // box-shadow:8rpx 8rpx 8rpx rgba(15,16,15,0.13);
          position: relative;
          .btn {
            position: absolute;
            top: 0;
            left: 0;
            width: 330rpx;
            height: 90rpx;
          
          }
          .text {
            width: 200rpx;
            color: #fff;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -100rpx;
          }


        }
      }
    }
    
  }
  .bottom {
    width: 100%;
    height: 50px;
    position: relative;
    background: #f4c51c;
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
