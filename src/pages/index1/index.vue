<template>
  <div class="container">
    <div class="top">

    </div>
    <div class="main">
      {{motto}}
    </div>
    <div class="bottom"></div>
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
.container{
  background: red;
  width: 100%;
  height: 100%;
  display: flex;
  .top{
    height: 50px;
    background: #ccc;
  }
  .bottom {
    height: 50px;
    background: #ccc;
  }
  .main{
    flex: 1;
    overflow: auto;
  }
}
</style>
