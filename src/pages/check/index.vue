<template>
  <div>
    <!-- <div class="logo">
      <img src="/static/avatar.png" />
      <text>涩果摄影</text>
    </div> -->
  </div>
</template>

<script>
import {get, post} from "@/http/api";
import fly from "@/http/config";
export default {
  data() {
    return {}
  },
  onShow() {
    this.getSetting()
    
    
  },
  
  onLoad() {
   
  },
  methods: {
    login() {
      let code ;
      let encryptedData;
      let iv;
      let that = this;
      wx.login({
        success(res) {
          console.log('login',res)
          code = res.code
          if (res.code) {
            wx.getUserInfo({
              success(res) {
                console.log('getUserInfo',res)
                encryptedData = res.encryptedData
                iv = res.iv

                wx.setStorage({
                  key:"wxInfo",
                  data:{
                    code:code,
                    encryptedData:encryptedData,
                    iv:iv
                  },
                  
                })

                
                that.getJwt(code,res.encryptedData,res.iv);
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    getJwt(code,encryptedData,iv) {
      let params = {
        url: '/api/enter/',
        data: {
          code: code,
          encryptedData:encryptedData,
          iv: iv
        }
      }
      post(params).then(res=>{ 
        console.log('getJwt',res)
        fly.interceptors.request.use((request) => {
          let req = request;
          req.headers["Authorization"] = `Bearer ${ res.access }`;
          return req;
        });
        wx.setStorage({
          key:"jwt",
          data:res.access,
          success:() => {
           // this.getUserInfo();
          }
        })
        
      })
    },

    getSetting(){
      // wx.showLoading({
      //   title: '加载中',
      // })

      let that = this
      wx.getSetting({
        success: function(res){
          console.log('getSetting',res)
          if (res.authSetting['scope.userInfo']) {
            //用户已经授权过
           
            wx.redirectTo({
              url: `../index1/main`
            })
           // that.$router.push({ path: `../index1/main`, query: {} });
          }else{
            console.log('用户未授权')
            wx.redirectTo({
              url: `../getUserInfo/main`
            })
            //that.$router.push({ path: `../getUserInfo/main`, query: {} });
          }
        }
      })
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
.logo {
  
}
</style>
