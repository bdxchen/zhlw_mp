<template>
  <div>

  </div>
</template>

<script>
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
    getSetting(){
     
      let that = this
      wx.getSetting({
        success: function(res){
          console.log('getSetting',res)
          if (res.authSetting['scope.userInfo']) {
            //用户已经授权过
            that.$router.push({ path: `../index1/main`, query: {} });
          }else{
            that.$router.push({ path: `../getUserInfo/main`, query: {} });
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
