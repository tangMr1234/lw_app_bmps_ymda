<template>
  <div class="details" style="height:100%;">
    <!-- 头部 -->
    <x-header :title="this.$route.name" @on-click-back="goBack" :left-options="{preventGoBack: true}"
              style="background-color:#409eff;">
    </x-header>
    <!-- 主体 -->
    <div style="height:calc(100% - 46px);overflow-x: hidden;-webkit-overflow-scrolling : touch;">
      <!-- 装备信息table -->
      <x-table full-bordered style="background-color:#fff;">
        <tbody>
        <tr>
          <td width="40%">
            <x-img :src="src"
                   :default-src="defaultSrc" :offset="-100"
                   style="display: block;"></x-img>
          </td>
          <td>{{commentName}}</td>
        </tr>
        </tbody>
      </x-table>
      <!-- 表单输入组 -->
      <group>

        <x-input title="批号：" placeholder="请输入批号" text-align="right" v-model="batches"
                 placeholder-align="right"></x-input>

        <calendar v-model="valid" title="有效期：" placeholder="请选择有效期" show-popup-header popup-header-title="请选择有效期"
                  :replace-text-list="replaceTextList"></calendar>

        <x-number :value="number" title="数量：" fillable width="100px" :min="1"></x-number>

        <calendar v-model="Initial" title="生产日期：" placeholder="请选择生产日期" show-popup-header popup-header-title="请选择生产日期"
                  :replace-text-list="replaceTextList"></calendar>

        <x-input type="number" title="批签发：" placeholder="请输入批签发" text-align="right" v-model="label"
                 placeholder-align="right"></x-input>

        <x-input type="number" title="价格：" placeholder="请输入价格" text-align="right" v-model="price"
                 placeholder-align="right"></x-input>

      </group>
      <box gap="20px 10px">
        <x-button :gradients="['#409eff', '#409eff']" @click.native="submit">确认</x-button>
      </box>
    </div>
    <!-- 提交时的loading -->
    <div v-transfer-dom>
      <loading :show="submitLoading" :text="submitText"></loading>
    </div>
    <!-- 验证时的alert -->
    <div v-transfer-dom>
      <alert v-model="alertShow" :title="alertTielt" :content="alertContent"></alert>
    </div>
  </div>
</template>

<script type="es6">
  import {
    XHeader,
    XImg,
    Group,
    XInput,
    XNumber,
    Calendar,
    Box,
    XButton,
    Loading,
    TransferDomDirective as TransferDom,
    Alert,
    XTable
  } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader, XImg, Group, XInput, XNumber, Calendar, Box, XButton, Loading, Alert, XTable
    },
    data() {
      return {
        src: "http://img1.imgtn.bdimg.com/it/u=1170036766,1916028111&fm=200&gp=0.jpg", //最终加载的详情的图片
        defaultSrc: "http://apps.dev.pujiajia.com/static/images/wap/top_slider_loading.gif", //默认的加载图应用于懒加载
        replaceTextList: {
          'TODAY': '今'
        }, //日历今天展示“今”字
        batches: '', //批号
        valid: '', //有效日期
        number: 1, //数量
        Initial: "", //生产日期
        label: '', //批签发
        price: '', //价格
        submitLoading: false, //提交数据时的loading
        submitText: "提交中", //提交数据时的loading的提示文字
        //下面alert三项是必填项没有填写完整的弹出层
        alertShow: false,
        alertTielt: '警告',
        alertContent: '本页均为必填(必选)项,请填写(选择)完整再提交',
        commentName: "乙肝-上海生物研究所-0.5ml-D-普醇10ug液安", //图片下的标题
      }
    },
    methods: {
      //确认提交
      submit() {
        if (this.batches == '' || this.valid == '' || this.Initial == '' || this.label == '' || this.price == '') {
          this.alertShow = true;
          setTimeout(() => {
            this.alertShow = false;
          }, 3000)
        } else {
          this.submitLoading = true;
          setTimeout(() => {
            this.submitLoading = false;
            parent.window.location.href = "#/msg"
          }, 500);
        }
      },
      // 返回上一页
      goBack() {
        this.$router.push('/details');
      }
    },
    mounted() {
      this.loadingRemove();
    }
  }
</script>

