<template>
  <div class="details" style="height:100%;">
    <x-header :title="this.$route.name" @on-click-back="goBack" :left-options="{preventGoBack: true}"
              style="background-color:#409eff;">
    </x-header>
    <div style="height:calc(100% - 138px);overflow-x: hidden;padding-bottom:50px;-webkit-overflow-scrolling : touch;">
      <!-- img -->
      <x-img :src="details.src"
             :default-src="details.defaultSrc" :offset="-100" style="display: block;"></x-img>
      <!-- 详情table -->
      <x-table>
        <tbody>
        <tr>
          <td colspan="2" style="text-align:left;padding:0 10px;">
            {{details.title}}
          </td>
        </tr>
        <tr>
          <td colspan="2" style="text-align:left;padding:0 10px;">
            {{details.type}}
          </td>
        </tr>
        <tr>
          <td colspan="2" style="text-align:left;padding:0 10px;">
            {{details.unit_name}}
          </td>
        </tr>
        <tr>
          <td v-for="data in details.other" style="text-align:left;padding:0 10px;"><span style="color:#666;">{{data.label}}：</span>
            {{data.value}}
          </td>
        </tr>
        </tbody>
      </x-table>
    </div>
    <!-- 按钮 -->
    <x-button :gradients="['#409eff', '#409eff']" @click.native="$router.push('/detailed')"><i
      class="iconfont icon-jia"> 添加入库明细</i></x-button>
  </div>
</template>

<script type="es6">
  import {XTable, XImg, XButton, XHeader} from 'vux'

  export default {
    components: {
      XTable, XImg, XButton, XHeader
    },
    data() {
      return {
        details: {
          src: "http://img1.imgtn.bdimg.com/it/u=1170036766,1916028111&fm=200&gp=0.jpg",
          defaultSrc: "http://apps.dev.pujiajia.com/static/images/wap/top_slider_loading.gif",
          title: '乙肝-上海生物研究所-0.5ml-D-普醇10ug液安',
          type: '一类疫苗',
          unit_name: "上海生物制品研究所",
          other: [
            {
              label: '计量单位',
              value: '支'
            }, {
              label: '包装规格',
              value: '0.5ML'
            }
          ]
        }
      }
    },
    methods: {
      // 路由变化监听事件
      routerChange() {
        this.loadingRemove();
        this.details.title = "疫苗" + this.$utils.getUrlKey("id");
      },
      //  通过postMessage调用iframe父组件的方法
      goBack() {
        let link = window.location.href.split("#");
        window.parent.postMessage('CloseLwYmdanan', link[0]);
      }
    },
    mounted() {
      this.loadingRemove();
    },
    watch: {
      "$route": "routerChange"  // 路由变化监听事件
    },
  }
</script>

<style>
  .details img {
    width: 100%;
  }
</style>
