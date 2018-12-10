<template>
  <div>
    下载图片页面
    
    <div class="bottom">
      <img class="img" src="/static/img/bottom.png">
    </div>
    <div class="bottom">
      <img class="img" src="/static/img/bottom1.png">
    </div>
    <div class="bottom">
      <img class="img" src="/static/img/topbg.png">
    </div>
    <div class="bottom">
      <img class="img" src="/static/img/bottombg.png">
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
  
  .bottom {
    width: 100%;
    height: 80px;
    background: #e58d;
    .img {
      width: 100%;
      height: 50px;
    }
  }
</style>
