<template>
  <div class="content">
    <div class="header">
      <div class="header-img">
        <img :src="img"/>
      </div>
      <div class="header-title">{{title}}</div>
      
    </div>
    <div class="main">
      <div class="jianjie">
        <text>简介</text>
      </div>
      <div class="border">
        <img src="/static/img/border.jpg"/>
        <div class="triangle"></div>
      </div>
      <div class="active-content">
        <div style="padding:10px 0;">活动简介</div>
        <rich-text :nodes="content"></rich-text>
      </div>
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
      img: '',
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
        this.img = res.img_url;
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
  
  .header {
    width: 100%;
    height: 340rpx;
    background:#fff;
    
    position: relative;
    .header-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 10px;
      img {

        width: 100%;
        height: 100%;
      }
    }
    .header-title {
      position: absolute;
      bottom: 20rpx;
      right: 30rpx;
      font-size: 22px;
      font-weight: 400;
      color: #fff;
    }
  }
  .main {
    margin-top: 13px;
    .jianjie {
      height: 50px;
      line-height: 50px;
      text {
        color: #f4c51f;
        border-bottom: 1px solid #f4c51f;
        padding-bottom: 8px;
        margin-left:40px; 
      }
    }
    .border {
      width: 100%;
      height: 50rpx;
      position: relative;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50rpx;
      }
      .triangle {
        position: absolute;
        top: 0;
        left: 86rpx;
        
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 15px 30px 15px;
        border-color: transparent transparent #fff transparent;
      }
    }
    .active-content {
      padding: 10px 25px;
    }
  }
}
</style>
