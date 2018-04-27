<template>
  <div style="width:100%;height: 100%;overflow: hidden;">
    <x-header slot="header" :title="this.$route.name"  @on-click-back="goBack" :left-options="{preventGoBack: true}"
              style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#409eff;">
      <a slot="right" style="color:#fff;" @click="showPopupFilter">
        <i class="iconfont icon-sousuo" style="font-size:20px;"></i>
        <small style="vertical-align: top;">筛选</small>
      </a>
    </x-header>
    <!-- 数据展示列表 -->
    <flexbox :gutter="0" style="height: 100%;overflow: hidden;">
      <!-- 左侧菜单 -->
      <flexbox-item :span="1/4" style="height: 100%;overflow: hidden;background:#f2f2f2;">
        <div style="height: 100%;overflow-x: hidden;">
          <group>
            <cell v-for="(item, index) in Menu.MenuData" :key="index" :title="item.label" style="background:#f2f2f2;"
                  :class="{leftMenuActive: index==Menu.selectItem }"
                  @click.native="leftMenuClick(index, item.id)"></cell>
          </group>
        </div>
      </flexbox-item>
      <!-- 右侧数据 -->
      <flexbox-item :span="3/4" style="height: 100%;position: relative;"
                    :style="loadingShow==true?'':'overflow-x: hidden;'">
        <panel :list="list" :type="type" @on-click-item="showPopupComment"></panel>
        <new-loading v-show="loadingShow" style="position:absolute;width:100%;top:0;left:0;"></new-loading>
      </flexbox-item>
    </flexbox>
    <!-- 详情弹出层 -->
    <p-filter ref="popup" :popupWidth="popupWidth">
      <s-frame slot="Popup" @reset="show" v-if="PopupShow=='comment'" :id="id"></s-frame>
      <s-filter slot="Popup" @reset="submitLoad" v-if="PopupShow=='filter'"></s-filter>
    </p-filter>
  </div>
</template>

<script type="es6">
  import {Group, Cell, Flexbox, FlexboxItem, Panel, XHeader} from 'vux'
  import NewLoading from '@/components/loading.vue';

  export default {
    components: {
      Group,
      Cell,
      Flexbox,
      FlexboxItem,
      Panel,
      NewLoading,
      XHeader,
      PFilter: resolve => {
        require(['@/components/popupFilter.vue'], resolve)
      },
      SFrame: resolve => {
        require(['@/views/Frame.vue'], resolve)
      },
      SFilter: resolve => {
        require(['@/views/Popup/Filter.vue'], resolve)
      }
    },
    data() {
      return {
        PopupShow: "",//判断加载哪个组件
        popupWidth: '100%', //弹出层的宽度设置
        loadingShow: true,
        Menu: {
          selectItem: 0,
          MenuData: [
            {id: "1", label: "乙肝"},
            {id: "2", label: "结核"},
            {id: "3", label: "脊灰"},
            {id: "4", label: "百白破"},
            {id: "5", label: "流脑"},
            {id: "6", label: "乙脑"},
            {id: "7", label: "麻风"},
            {id: "8", label: "白破"},
            {id: "9", label: "麻腮风"},
            {id: "10", label: "甲肝"},
            {id: "11", label: "注射器"},
          ]
        },
        type: '1',
        list: [{
          id: '1',
          src: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2077675532,266705430&fm=58&bpow=599&bpoh=541',
          title: '北京北生研生物制品股份有限公司(原北京天坛)',
          desc: "编码：1000101 <br> 类别：一类"
        }, {
          id: '2',
          src: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=84002312,1010577506&fm=58',
          title: '上海生物',
          desc: '编码：1000101 <br> 类别：一类'
        }, {
          id: '3',
          src: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1376944227,1440664346&fm=58&bpow=0&bpoh=0',
          title: '北京北生研生物制品股份有限公司(原北京天坛)',
          desc: '编码：1000101 <br> 类别：一类'
        }, {
          id: '4',
          src: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=653318044,3480602337&fm=58',
          title: '北京北生研生物制品股份有限公司(原北京天坛)',
          desc: '编码：1000101 <br> 类别：二类'
        }, {
          id: '5',
          src: 'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=4061423503,842733867&fm=202&src=765&mola=new&crop=v1',
          title: '北京北生研生物制品股份有限公司(原北京天坛)',
          desc: '编码：1000101'
        }, {
          id: '11',
          src: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2077675532,266705430&fm=58&bpow=599&bpoh=541',
          title: '北京北生研生物制品股份有限公司(原北京天坛)',
          desc: '编码：1000101 <br> 类别：一类、二类'
        }, {
          id: '21',
          src: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=84002312,1010577506&fm=58',
          title: '北京北生研生物制品股份有限公司(原北京天坛)',
          desc: '编码：1000101 <br> 类别：一类'
        }, {
          id: '31',
          src: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1376944227,1440664346&fm=58&bpow=0&bpoh=0',
          title: '北京北生研生物制品股份有限公司(原北京天坛)',
          desc: '编码：1000101 <br> 类别：一类'
        }, {
          id: '41',
          src: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=653318044,3480602337&fm=58',
          title: '北京北生研生物制品股份有限公司(原北京天坛)',
          desc: '编码：1000101 <br> 类别：二类'
        }, {
          id: '51',
          src: 'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=4061423503,842733867&fm=202&src=765&mola=new&crop=v1',
          title: '北京北生研生物制品股份有限公司(原北京天坛)',
          desc: '编码：1000101'
        }],
        id: ""
      }
    },
    mounted() {
      if (!sessionStorage.getItem('warn')) {
        this.alert("提示", "试用应用的演示数据，仅供APP体验，试用期间该弹窗可暂时关闭！", "知道了", this.setSession); //使用main中的全局方法调用弹窗
      }

      this.loadingRemove();
      this.getIndexData();
    },
    methods: {
      //设置sessionstorage来打开warn弹窗
      setSession() {
        sessionStorage.setItem('warn', 'yes');
      },
      //  通过postMessage调用iframe父组件的方法
      goBack() {
        let link = parent.window.location.href.split("#");
        window.parent.postMessage('closeLwFrame', link[0]);
      },
      //打开详情
      showPopupComment(item) {
        this.PopupShow = "comment";
        this.popupWidth = "100%";
        this.id = item.id;
        this.show();
      },
      //打开筛选
      showPopupFilter() {
        this.PopupShow = "filter";
        this.popupWidth = "87%";
        this.show();
      },
      //打开详情
      show() {
        this.$refs.popup.show(); //  调用子组件的方法
      },
      //左侧菜单点击事件
      leftMenuClick(index, id) {
        this.Menu.selectItem = index;
        this.getIndexData();
      },
      //加载数据&&初始化
      getIndexData() {
        this.loadingShow = true; //数据加载时的loading
        setTimeout(() => {
          this.loadingShow = false;
        }, 500);
      },
      //弹出的子组件filter调用的父组件index的方法
      submitLoad() {
        this.show();
        this.getIndexData();
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  img {
    width: 100%;
  }
</style>
<style>
  .leftMenuActive {
    background: #fff !important;
  }
</style>
