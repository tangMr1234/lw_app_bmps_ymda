<template>
  <div style="height:100%;overflow: hidden;">
    <iframe :src="link+'?id='+id" class="mainFrame" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>
  </div>
</template>

<script type="es6">
  export default {
    components: {},
    props: ['id'],
    data() {
      return {
        link: ''
      }
    },
    mounted() {
      this.link = this.$route.meta.link;
      //监听postMessage变化来调用方法
      let _that = this;
      window.addEventListener('message', function (e) {
        if(e.data === "CloseLwYmdanan"){
          _that.goBack();
        }
      });
    },
    methods: {
      //  调用父组件的方法
      goBack() {
        this.$emit('reset');
      }
    }
  }
</script>

<style scoped>
  .mainFrame {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    min-width: 100%;
    *width:100%;
    width:1px;
  }
</style>
