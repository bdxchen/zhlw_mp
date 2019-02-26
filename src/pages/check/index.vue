<template>
  <div>

  </div>
</template>

<script>
import {get, post} from "@/http/api";
export default {
  data() {
    return {}
  },
  onShow() {
    this.getSetting()
    this.login()
    console.log('11111111111111111111111')
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
</style>
