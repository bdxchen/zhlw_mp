<template>
  <div class="content">
    <div class="top">
      <image class="topbg" src="/static/img/topbg.png" mode="widthFix"/>
    </div>
    <div class="title">我的预约</div>
    <div class="main">
      <div @click="godesignerList" class="add">添加预约</div>
      <div v-for="(item,index,arr) in arr" :key="index" class="appointment">
        <div class="time">
          <div class="name-box">摄影师：{{item.name}} </div>
          <div class="time-box">时 间：{{item.date}} {{timeObj[item.time_code]}}</div>
        </div>
        <div @click="cancel(arr,index)" class="btn">
          取消预约
        </div>
      </div>
      <!-- <div class="appointment">
        <div class="time">
          <div>张瀚文 20171239</div>
        </div>
        <div class="btn">
          取消预约
        </div>
      </div> -->
      <div v-show="arr.length==0" class="tip">
        还没有预约摄影师，请先去预约摄影师!
      </div>
    </div>
    <div class="bottom">
      <image class="botimg" src="/static/img/bottombg.png" mode="widthFix"/>
    </div>
  </div>
</template>

<script>
import {get, post} from "@/http/api"
export default {
  components: {},
  data() {
    return {
     
      timeObj :{
        1: '08:00 - 10:00',
        2: '10:00 - 12:00',
        3: '14:00 - 16:00',
        4: '16:00 - 18:00'
      },
      arr: []
    };
  },
  onLoad(options) {
    
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        //console.log(res)
        this.getMyyuyue(res.data.user_id);
      }
    })
    
  },
  methods: {
    cancel(item,index,arr) {
      console.log(item.id)
      let params = {
        url: `/delete_cameraman_time/${item.id}/`,
       
      }
      get(params).then(res=>{ 
        arr.splice(index,1);
        console.log('delete_cameraman_time',res)
       
      }) 
    },
    getMyyuyue(id) {
      let params = {
        url: `/get_student_yuyue/${id}/`,
       
      }
      get(params).then(res=>{ 
        console.log('111',res)
        this.arr = res
      }) 
    },
    godesignerList() {
      
      const path = 'designerList/main'
      this.$router.push({ path: `../${path}`, query: {
        
      } });
      
     
    }
    
    
  },
  mounted(){
   
  },
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
  background: #faecc7;
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
  .main {
    width: 100%;
    margin-top:130rpx; 
    flex: 1;
    overflow: auto;
    .tip {
      background: #fff;
      color: #366f7e;
      box-sizing: border-box;
      padding:50rpx;
      width: 95%;
      margin: 0 auto;
      height: 300rpx;
      border-radius:15rpx;

      border: 2px solid  #efcd6d

    }
    .add {
      height: 110rpx;
      line-height: 110rpx;
      text-align: center;
      background: #366f7e;
      width: 95%;
      margin: 0 auto 20rpx;
      color: #fff;
    }
    .appointment {
      background: #fff;
      width: 95%;
      box-sizing: border-box;
      padding: 0 20px;
      margin: 0 auto 20rpx;
      box-shadow:10rpx 10rpx 10rpx rgba(15,16,15,0.13);
      height: 180rpx;
     
      
      .time {
        width: 70%;
         height: 180rpx;
        float: left;
        
        .name-box {
          height: 90rpx;
          line-height: 90rpx;
         
           color: #1b4a5d;
        }
        .time-box {
           font-size: 14px;
          height: 90rpx;
          line-height: 90rpx;
          color: #1b4a5d;
        }
      }
      .btn {
        
        text-align: right;
        width: 30%;
        height: 180rpx;
        line-height: 180rpx;
        float: right;
        
      }
    }
  }
  .bottom {
    width: 100%;
    height: 50px;
    position: relative;
    .botimg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
