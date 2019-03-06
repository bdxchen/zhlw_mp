<template>
  <div class="content">
    <div class="top">
      <img class="topbg" src="/static/img/topbg.png" />
      
      <img class="avatar" :src="designerInfo.Cameraman_img"/>
      <i class="contact-icon iconfont">&#xe668;</i>
      <button open-type="contact" class="contact-btn"></button>
    </div>
    <div class="designer-info">
        <div class="name">{{designerInfo.Cameraman_name}}</div>
        <div style="margin-top:5px;" @click="modalShow" class="btn">预约摄影师</div>
        <div style="margin-top:5px;" class="btn">摄影师作品集</div>
    </div>
    <div v-show="modalFlag" class="modal-wrapper">
      <div class="modal">
        <div @click="modalHide" class="close-modal"><i class="icon iconfont">&#xe603;</i></div>
        <div class="date-wrapper">
          <picker 
            mode="date" 
            :value="date" 
            start="2018-01-01" 
            @change="bindDateChange"> 
                  <p class="picker">
                    <text class="icon iconfont">&#xe66a;</text>选择预约日期： {{date}}
                  </p>
          </picker>
        </div>
        <div class="time-wrapper">
          <picker @change="bindTimeChange" @cancel="bindTimeCancel" :value="index" :range="timeArray" range-key="time">
            <view class="picker"><text class="icon iconfont">&#xe608;</text>选择预约时间： {{time}}</view>
          </picker>
        </div>
        <div @click="postTest" class="complete-btn">预约提交</div>
      </div>
    </div>
    <div class="main">
      <div class="picture-wrapper">
        <div class="picture" v-for="(item, index) in designerImgs" :key="index">
          <img @click="wxImgShow(item)" :src="item.image"/>
        </div>
        
      </div>  
      
      
      
      
      
    </div>
    <div class="bottom">
      <img src="/static/img/bottombg.png" />
    </div>
    
  </div>
</template>

<script>
import {get, post,postJSON} from "@/http/api"
import MD5 from 'md5.js'
export default {
  components: {

  },

  data() {
    return {
      modalFlag: false,
      date:'',
      index: '',
      time: '',
      time_code: '',
      wxInfo: {},
      designerInfo: {},
      designerImgs:[],
      timeArray: [
        // {time:'08:00 - 10:00',time_code: 1},
        // {time:'10:00 - 12:00',time_code: 2},
        // {time:'14:00 - 16:00',time_code: 3},
        // {time:'16:00 - 18:00',time_code: 4}
      ],
      timeShow: false,
      Cameraman_id: '',
      swiperH: "", //swiper高度
      nowIdx: 0, //当前swiper索引
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
  onLoad(options) {
    // this.Cameraman_id = this.$route.query.Cameraman_id
    // this.getDesignerInfo(this.Cameraman_id);
    // this.getDesignerImg(this.Cameraman_id);
   
    
    // wx.getStorage({
    //   key: 'wxInfo',
    //   success: (res) => {
    //     console.log(res.data)
    //     this.wxInfo = res.data;
    //   }
    // })
    
  },
  onShow() {
    this.time = ''
    this.date = ''
    this.time_code = ''
    this.timeShow = false
    this.Cameraman_id = this.$route.query.Cameraman_id
    this.getDesignerInfo(this.Cameraman_id);
    this.getDesignerImg(this.Cameraman_id);
   
    
    wx.getStorage({
      key: 'wxInfo',
      success: (res) => {
        console.log(res.data)
        this.wxInfo = res.data;
      }
    })
  },
  methods: {
    modalShow() {
      this.modalFlag = true
      
    },
    modalHide() {
      console.log(111111111)
      this.modalFlag = false
      
    },
    likeClick(item) {
      console.log(item)
    },
    wxImgShow(item) {
      console.log(item)
      wx.previewImage({
        current: item.image, // 当前显示图片的http链接
        urls: [item.image] // 需要预览的图片http链接列表
      })
    },
    goBannerInfo(item) {
      console.log(item)
      const path = 'worksList/main'
      this.$router.push({ path: `../${path}`, query: {
        Cameraman_id: this.Cameraman_id
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
    bindDateChange(e) {
     
      this.date = e.target.value
      this.getDateStatus(this.Cameraman_id,e.target.value)
    },
    bindTimeChange(e) {
      console.log(e)
      
      this.index = e.target.value
      this.time = this.timeArray[e.target.value].time
      this.time_code = this.timeArray[e.target.value].time_code
      console.log(this.timeArray[e.target.value].time_code)
     
    },
    bindTimeCancel() {
      //this.timeShow = false
    },
    parseDateStatus(arr) {
     
      let box = [];
      let timearr = [
        {time:'08:00 - 10:00',time_code: 1},
        {time:'10:00 - 12:00',time_code: 2},
        {time:'14:00 - 16:00',time_code: 3},
        {time:'16:00 - 18:00',time_code: 4}
      ]
      if(arr.length==0) {
        this.timeArray = timearr;
      }else{
        for(let i = timearr.length - 1; i >= 0; i--) {
          for(let n=0; n<arr.length; n++) {
            if(timearr[i].time_code == arr[n].time_code) {
              console.log(timearr)
              timearr.splice(i, 1)
              break
            }
          }
        }
        this.timeArray = timearr
      }
      console.log('要显示是time',this.timeArray)
    },
    getDateStatus(Cameraman_id,date) {
      let params = {
        url: /get_cameraman_time/,
        data: {
          Cameraman_id: Cameraman_id,
          date: date
        }
        
      };
      postJSON(params).then(res=>{ 
        console.log('查看某一天的时间',res)
        this.parseDateStatus(res)
        this.timeShow = true
      }) 
    },
    //预约点击
    postTest() {
      wx.getStorage({
        key: 'userInfo',
        success: (res) => {
          this.postCameramanTime(this.Cameraman_id,this.date,this.time_code,res.data.user_id)
        }
      })
      
    },
    postCameramanTime(Cameraman_id,date,time_code,user_id) {
      if(time_code==''||date=='') {
        console.log('时间不完全')
        wx.showModal({
          content: '请选择预约时间',
          showCancel: false,
          success:  (res) => {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
        return
      }
      console.log(time_code,date)
      let dateCode = date.split('-').join("")
      let params = {
        url: `/api/pay2/`,
        data: {
          Cameraman_id: Cameraman_id,
          date: dateCode,
          time_code: time_code,
        }
      };
      
      post(params).then(res=>{ 
        console.log(res)
        if(res.code ==5) {
          wx.showModal({
            //title: '弹窗标题',
            content: '请先完善您的个人信息，才可以预约摄影师。',
            confirmText: "确定",
            cancelText: "取消",
            success:  (res) => {
              console.log(res);
              if (res.confirm) {
                console.log('确定')
                //去完善信息 userCenter/main
                const path = 'userCenter/main'
                this.$router.push({ path: `../${path}`, query: {
                  Cameraman_id: Cameraman_id,
                } });
              } else {
                console.log('取消')

              }
            }
          });
        }else{
          wx.requestPayment({
            'timeStamp': res.time_stamp.toString(),
            'nonceStr': res.nonce_str,
            'package': `prepay_id=${res.prepay_id}`,
            'signType': 'MD5',
            'paySign': res.sign,
            'success': (res) =>{ 
              console.log('requestPayment',res)
              wx.showModal({
                content: '支付并预约成功',
                showCancel: false,
                success:  (res) => {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    const path = 'myYuyue/main'
                    this.$router.push({ path: `../${path}`, query: {} });
                  }
                }
              });
              
            },
            'fail':(res) =>{ 
              console.log(res)
              wx.showModal({
                content: '取消预约',
                showCancel: false,
                success:  (res) => {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              });
            }
          })
        }
    
          this.time = ''
          this.date = ''
          this.time_code = ''
          this.timeShow = false
          this.modalFlag = false
        
      }) 
    },
    getDesignerInfo(Cameraman_id) {
      console.log(Cameraman_id)
      let params = {
        url: `/edit_cameraman_info/${Cameraman_id}/`,
        
      };
      get(params).then(res=>{ 
        console.log('getDesignerInfo',res)
        this.designerInfo = res
      }) 
    },
    getDesignerImg(Cameraman_id) {
      let params = {
        url: `/get_cameraman_image/${Cameraman_id}/`,
        
      };
      get(params).then(res=>{ 
        this.designerImgs = res
        console.log('摄影师作品',res)
       
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
  background: #fff;
  .top{
    width: 100%;
    height: 200rpx;
    position: relative;
    display: flex;
    align-items: center;
    .contact-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 50px;
      height: 50px;
      font-size: 58rpx;
      text-align: center;
      line-height: 50px;

    }
    .contact-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 50px;
      height: 50px;
      opacity: 0;
    }
    .avatar {
      width: 90px;
      height: 90px;
      border-radius: 100px;
      position: absolute;
      left: 50%;
      top:20%;
      margin-left: -45px;
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
  .designer-info {
    margin-top: 10px;
    // display: flex;
    // justify-content: center;
    .name {
      text-align: center;
    }
    .btn {
      width: 90%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      color: #fff;
      background: #f4c51f;
      margin: 0 auto;
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
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.1);
    z-index: 50;
    .modal {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 90%;
      height: 210px;
      border-radius: 8px;
      background: #f4c51f;
      .close-modal {
        padding: 5px;
        font-size: 22px;
        color: #fff;
        position: absolute;
        top: -2px;
        right:0;
      }
      .date-wrapper {
        font-size: 16px;
        box-sizing: border-box;
        padding: 0 30rpx;
        margin-top: 65rpx;
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        // background: wheat;
        // text-align: center;
        color: #fff;
        
        .picker {
          box-sizing: border-box;
          padding: 0 20rpx;
          border-radius: 5px;
          border: 1px solid #fff;
          .icon {
            font-size: 22px;
            margin-right: 5px;
          }
        }
      }
      .time-wrapper {
        font-size: 16px;
        margin-top: 20px;
        box-sizing: border-box;
        padding: 0 30rpx;
      
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        // background: wheat;
        // text-align: center;
        color: #fff;
        .picker {
          box-sizing: border-box;
          padding: 0 20rpx;
          border-radius: 5px;
          border: 1px solid #fff;
          .icon {
            font-size: 22px;
            margin-right: 5px;
          }
        }
      }
      .complete-btn {
        background: #fff;
        margin: 20px auto 0;
        width: 90%;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        border-radius: 5px;
        border: 1px solid #fff;
        text-align: center;
        color: #f4c51f;
        // box-shadow:8rpx 8rpx 8rpx rgba(15,16,15,0.13);
       
        
        


      }
    }

  }
  
  .main{
    width: 100%;
    flex: 1;
    overflow: auto;
    .picture-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content:space-between;
      box-sizing: border-box;
      padding: 5px 20px;
      
      .picture {
        margin: 5px 0;
        width: 320rpx;
        height: 320rpx;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .swiperItem {
      position: relative;
      .like {
        position:absolute;
        width: 100rpx;
        height: 100rpx;
        bottom: 0px;
        right: 0px;
        margin-left: -60rpx;
        z-index:2;
        
        border-radius: 100rpx;
        text-align: center;
        line-height: 100rpx;
        .icon {
          font-size: 70rpx;
          color: #fff;
        }
        .like-active{
          color: #f4c51c;
        }
      }
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
