<template>
  <div class="content">
    <div class="top">
      <div class="title">个人资料</div>
      <img class="topbg" src="/static/img/topbg.png" />
      <div class="avatar">
        <open-data   type="userAvatarUrl"></open-data>
      </div>
      
      <!-- <img class="avatar" src="/static/img/avatar.jpg"/> -->
      <!-- <img class="back" src="/static/img/back.png" /> -->
      
    </div>
    <div class="main">
    <scroll-view>
     <div class="from-item">
       <div class="item-lable">姓名</div>
       <div class="item-box">
         <input class="ipt" 
                v-model="modelName"
                @blur="blurHandle" 
                @focus="focusHandle" 
                placeholder="请输入姓名"
                :disabled="isReadOnly"
                type="text"/>
       </div>
     </div>
     <div class="from-item">
       <div class="item-lable">性别</div>
       <div class="item-box">
        
        <radio-group class="radio-group" @change="radioChange">
            <radio class="radio radio-item" v-for="(item,index) in items" :key="index"  :value="item.name" :checked="item.checked">
                <text>{{item.value}}</text>
            </radio>
        </radio-group>

         <!-- <radio-group class="radio-group" @change="radioChange">
          <label class="radio" v-for="(item,index) in items1" :key="index">
            <radio :value="item.name" :checked="item.checked"/> {{item.value}}
          </label>
        </radio-group> -->
       </div>
     </div>
    <div class="from-item">
      <div class="item-lable">手机号</div>
      <div class="item-box">
        <input class="ipt" 
            
              @blur="phoneHandle"
              v-model="modelPhone"
              :disabled="isReadOnly"
              placeholder="请输入手机号"
              type="number"/>
      </div>
    </div>
    <div class="from-item">
      <div class="item-lable">学校</div>
      <div class="item-box">
        <input class="ipt" 
              v-model="modelSchool"
             :disabled="isReadOnly"
              placeholder="请输入学校名称"
              type="text"/>
      </div>
    </div>
    <div class="from-item">
      <div class="item-lable">专业</div>
      <div class="item-box">
        <input class="ipt" 
              v-model="modelSpeciality"
             :disabled="isReadOnly"
              placeholder="请输入专业名称"
              type="text"/>
      </div>
    </div>
    <div class="from-item">
      <div class="item-lable">微信</div>
      <div class="item-box">
        <input class="ipt" 
              v-model="modelWechat"
              :disabled="isReadOnly"
              placeholder="请输入微信"
              type="text"/>
      </div>
    </div>
    <div class="textarea-item">
      <div class="textarea-lable">个人经历</div>
      <div class="textarea-box">
       <textarea  :disabled="isReadOnly" v-model="modelInfo"></textarea>
      </div>
    </div>
    <!-- <div @click="goMyyuyue" class="from-item">
      <div class="item-lable">查看我的预约信息</div>
      <div class="item-box">
        
      </div>
    </div> -->
     <div v-show="!isReadOnly"  @click="postUserInfo" class="complete-btn">
       <img class="btn" src="/static/img/btn1.png"/>
       <div class="text">修改信息</div>
     </div>
    </scroll-view> 
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
      items1: [
        {name: 'USA', value: '美国'},
        {name: 'CHN', value: '中国', checked: 'true'},
        
      ],
      phoneFlag: false,
      xingbie: '',
      isReadOnly:false,
      user_id: '',
      modelName: '',
      //  modelSex: true,
      modelPhone: '',
      modelSchool: '',
      modelSpeciality: '',
      modelWechat: '',
      modelInfo: '',
      sexObj: [{name: false, value: '女'},
            {name: true, value: '男'},],
      items: [
        
      ]
    };
  },
  onShow() {
    this.getUserInfo();
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
    phoneHandle(e) {
      console.log(e.target.value)
      if(!(/^1(3|4|5|7|8)\d{9}$/.test(e.target.value))){ 
        wx.showModal({
          content: '电话号码格式有误，请重新填写。',
          showCancel: false,
          success:  (res) => {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
        this.phoneFlag = false
      } else {
        this.phoneFlag = true
      }
    },
    goMyyuyue() {
      
      const path = 'myYuyue/main'
      this.$router.push({ path: `../${path}`, query: {
        
      } });
    },
    getUserInfo() {
     
      let params = {
        url: '/get_student/'
       
      }
      post(params).then(res=>{
        console.log('get_student',res)
        this.modelName = res.student_name;
        this.modelPhone = res.student_phone;
        this.modelSchool = res.student_school;
        this.modelSpeciality = res.student_speciality;
        this.modelWechat = res.student_weixin;
        this.modelSex = res.student_sex
        this.modelInfo = res.student_info
        if(res.student_sex) {//男
          //this.items[1].checked= true
          this.items= [
            {name: false, value: '女'},
            {name: true, value: '男',checked: true},
          ]
        }else{//女
          //this.items[0].checked= true
          this.items= [
            {name: false, value: '女',checked: true},
            {name: true, value: '男'},
          ]
        }

      })
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
            student_info: this.modelInfo
            
          }
        
        }
        postJSON(params).then(res=>{ 
          console.log(res)
          wx.showModal({
            content: '提交成功',
            showCancel: false,
            success:  (res) => {
              if (res.confirm) {
                console.log('用户点击确定')

                if(this.$route.query.Cameraman_id){
                  const path = 'designerInfo/main'
                  this.$router.push({ path: `../${path}`, query: {
                    Cameraman_id: this.$route.query.Cameraman_id,
                  
                  } });
                }

              }
            }
          });
          
        }) 
        console.log('提交')
      
      } else {
        console.log('不全')
        wx.showModal({
          content: '请填写完全个人信息，谢谢',
          showCancel: false,
          success:  (res) => {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      }
      
      

    },
   changeSex(value) {
     console.log(value)
     this.modelSex = value
     
     
   },
    radioChange(e) {
     // this.xingbie = '123'
      
     this.changeSex(e.target.value)
     
    }
  },
};
</script>

<style lang="scss">

.content{
  width: 100%;
  // height: 100%;
  // display: flex;
  // flex-direction: column;
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
      overflow:hidden;

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
    // width: 100%;
    padding-top:15px; 
    // flex: 1;
    // overflow: auto;
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
          display: block;
           float: right;
          margin: 0 10px;
        }
        .ipt {
          text-align: right;
          height: 100%;
        }
      }
    }
    .textarea-item {
      .textarea-lable{
        font-size: 16px;
        text-align: center;
        margin: 5px 0;
      }
      .textarea-box {
        width: 100%;
        margin: 0 auto;
        textarea {
          background: #fcf3db;
           width:85%;
           margin: 0 auto;
          border-radius: 8px;
          box-sizing: border-box;
          padding: 10px;
          font-size:16px;
          
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
