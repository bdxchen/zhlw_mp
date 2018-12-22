<template>
  <div class="content">
    <div class="top">
      <img class="topbg" src="/static/img/active-1.jpg" />
      
     
    </div>
    <div class="main">
      <div class="active-content">
        
      </div>
      
      
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
      date:'',
    };
  },
  methods: {
    bindDateChange(e) {
      console.log(e)
      this.date = e.target.value
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
.content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #faecc7;
  .top{
    width: 100%;
    height:550rpx;
    position: relative;
    display: flex;
    align-items: center;
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 100px;
      position: absolute;
      left: 50%;
      top: 25%;
      margin-left: -50px;
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
  
  .main{
    width: 100%;
    padding-top:15px; 
    flex: 1;
    overflow: auto;
    position: relative;
     .active-content {
       width: 80%;
       height: 80%;
       position: absolute;
       margin-left: 10%;
       background: #fae29d;
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
