<template>
  <div class="content">
    <div class="top">
      <img class="topbg" src="/static/img/active-1.jpg" />
      
      <div class="active-title">
        {{title}}
      </div>

      <div class="active-content">
       {{content}}
      </div>
    </div>
    <div class="main">
      
      
      
    </div>
    <div class="bottom">
      
      <img src="/static/img/bottombg.png" />
      
      
    </div>
    
  </div>
</template>

<script>
import {get, post} from "@/http/api"
export default {
  components: {

  },

  data() {
    return {
      title: '',
      content: '',
      date:'',
    };
  },
  methods: {
    getActivity(id) {
      let params = {
        url: `/get_event/${id}/`,
      }
      get(params).then(res=>{ 
        console.log(res)
        this.title = res.title;
        this.content = res.content;
        
      })
    },
    bindDateChange(e) {
      console.log(e)
      this.date = e.target.value
    }
  },
  onLoad() {
    console.log(this.$route.query)
    this.id= this.$route.query.id
    this.getActivity(this.id);
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
    .active-title {
      padding: 5px 10px;
      border-top: 2px solid #000;
      border-bottom: 2px solid #000;
      margin: 0 auto;
      z-index: 10;
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
    .active-content {
      box-shadow:10rpx 10rpx 10rpx rgba(15,16,15,0.13);
       box-sizing: border-box;
       padding: 20rpx;
       width: 80%;
       height: 80%;
       position: absolute;
       bottom:-60%;
       z-index: 10;
       margin-left: 10%;
       background: #fae29d;
     } 
  }
  
  .main{
    width: 100%;
    padding-top:15px; 
    flex: 1;
    overflow: auto;
    position: relative;
     
    
    
    
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
