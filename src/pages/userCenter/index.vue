<template>
  <div class="content">
    <div class="top">
      <div class="title">个人资料</div>
      <img class="topbg" src="/static/img/topbg.png" />
      <!-- <open-data class="avatar"  type="userAvatarUrl"></open-data> -->
      <img class="avatar" src="/static/img/avatar.jpg"/>
      <!-- <img class="back" src="/static/img/back.png" /> -->
      
    </div>
    <div class="main">
      
     <div class="from-item">
       <div class="item-lable">姓名</div>
       <div class="item-box">
         <input class="ipt" 
                v-model="modelName"
                @blur="blurHandle" 
                @focus="focusHandle" 
                placeholder="请输入姓名"
                type="text"/>
       </div>
     </div>
     <div class="from-item">
       <div class="item-lable">性别</div>
       <div class="item-box">
         <radio-group class="radio-group" @change="radioChange">
          <label class="radio radio-item" v-for="(item,index) in items" :key="index">
            <radio :color="red" :value="item.name" :checked="item.checked" />{{item.value}}
          </label>
        </radio-group>
       </div>
     </div>
    <div class="from-item">
      <div class="item-lable">手机号</div>
      <div class="item-box">
        <input class="ipt" 
              v-model="modelPhone"
              
              placeholder="请输入手机号"
              type="text"/>
      </div>
    </div>
    <div class="from-item">
      <div class="item-lable">学校</div>
      <div class="item-box">
        <input class="ipt" 
              v-model="modelSchool"
             
              placeholder="请输入学校名称"
              type="text"/>
      </div>
    </div>
    <div class="from-item">
      <div class="item-lable">专业</div>
      <div class="item-box">
        <input class="ipt" 
              v-model="modelSpeciality"
             
              placeholder="请输入专业名称"
              type="text"/>
      </div>
    </div>
    <div class="from-item">
      <div class="item-lable">微信</div>
      <div class="item-box">
        <input class="ipt" 
              v-model="modelWechat"
              
              placeholder="请输入微信"
              type="text"/>
      </div>
    </div>
    <!-- <div @click="goMyyuyue" class="from-item">
      <div class="item-lable">查看我的预约信息</div>
      <div class="item-box">
        
      </div>
    </div> -->
     <div  @click="postUserInfo" class="complete-btn">
       <img class="btn" src="/static/img/btn1.png"/>
       <div class="text">完成</div>
     </div>
    </div>
      
    <div  class="bottom">
      <img  src="/static/img/bottombg.png" />
      
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
      user_id: '',
      modelName: '',
      modelSex: true,
      modelPhone: '',
      modelSchool: '',
      modelSpeciality: '',
      modelWechat: '',
      items: [
       
        {name: false, value: '女'},
        {name: true, value: '男',checked: true},
        
      ]
    };
  },
  onLoad() {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        //console.log(res)
        this.user_id = res.data.user_id;
      }
    })
  },
 
  methods: {
    goMyyuyue() {
      
      const path = 'myYuyue/main'
      this.$router.push({ path: `../${path}`, query: {
        
      } });
    },
    postUserInfo() {
      if(this.modelName!=""&&this.modelPhone!=""&&this.modelSchool!=""&&this.modelSpeciality!=""&&this.modelWechat!="") {
        let params = {
          url: `/edit_student_info/${this.user_id}/`,
          data: {
            student_name: this.modelName,
            student_sex: this.modelSex,
            student_phone: this.modelPhone,
            student_school: this.modelSchool,
            student_speciality: this.modelSpeciality,
            student_weixin: this.modelWechat,
            student_info: '我是一个test'
            
          }
        
        }
        postJSON(params).then(res=>{ 
          console.log(res)
        }) 
        console.log('提交')
        console.log(params)
      } else {
        console.log('不全')
      }
      
      

    },
   
    radioChange(e) {
      console.log(e)
      this.modelSex = e.target.value
      
    }
  },
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
  background: #fff;
  .top{
    width: 100%;
    height: 200rpx;
    position: relative;
    display: flex;
    align-items: center;
    
    .avatar {
      border-radius:200rpx;
      border: 2px solid #fff;
      width:160rpx;
      height:160rpx;

      position: absolute;
      top: 60rpx;
      left: 50%;
      margin-left: -80rpx;
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
      color: #1b4a5d;
      font-size: 18px;
      text-align: center;
      z-index: 10;
      position: absolute;
      top: 0;
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
    margin-top: 20px;
    .from-item {
      width:85%;
      margin: 0 auto;
      height: 90rpx;
      line-height: 90rpx;
      font-size: 16px;
      border-bottom: 1px solid #fae29d;
      margin-bottom: 5px;
      .item-lable {
        width: 40%;
        float: left;
        height: 100%;
      }
      .item-box {
        width: 59%;
        height: 100%;
        color: #1b4a5d;
        float: right;
        .radio-item {
          float: right;
        }
        .ipt {
          text-align: right;
          height: 100%;
        }
      }
    }
    
    .complete-btn {
      margin: 20px auto;
      width: 350rpx;
      height: 100rpx;
      text-align: center;
      line-height: 100rpx;
      
      // box-shadow:8rpx 8rpx 8rpx rgba(15,16,15,0.13);
      position: relative;
      .btn {
        position: absolute;
        top: 0;
        left: 0;
        width: 350rpx;
        height: 100rpx;
       
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
