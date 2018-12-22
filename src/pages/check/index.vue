<template>
  <div>

  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    getSetting(){
      let that = this
      wx.getSetting({
        success: function(res){
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
    this.getSetting()
  }
};
</script>

<style lang="scss">
page {
  height: 100%;
}
</style>
