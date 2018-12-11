<template>
  <div class="container">
    <div class="top">
      top
    </div>
    <div class="main">
      {{motto}}
    </div>
    <div class="bottom">
      bottom
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      motto: "Hello World"
    };
  },

  methods: {},

  created() {}
};
</script>

<style lang="scss">
page {
  height: 100%;
}
.container{
  background: red;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top{
    width: 100%;
    height: 50px;
    background: #000;
  }
  .bottom {
    width: 100%;
    height: 50px;
    background: #ccc;
  }
  .main{
    width: 100%;
    flex: 1;
    overflow: auto;
  }
}
</style>
