<template>
  <div class="content">
    <div class="top">
      <img class="topbg" src="/static/img/topbg.png" />
    </div>
    <div class="main">

    </div>
    <div class="bottom">
      <img src="/static/img/bottombg.png" />
    </div>
    
  </div>
</template>

<script>

export default {
  components: {

  },

  data() {
    return {

    };
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
  .top{
    width: 100%;
    height: 350rpx;
    position: relative;
    display: flex;
    align-items: center;
    
    .topbg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
  
  .main{
    width: 100%;
    flex: 1;
    overflow: auto;
    
    
    
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
