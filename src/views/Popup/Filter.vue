<template>
  <div style="height: 100%;">
    <div style="height:calc(100% - 42px);overflow-x: hidden;">
      <group title="搜索">
        <!-- 输入框组 -->
        <x-input placeholder="搜索名称/编号" v-model="search">
          <i slot="label" class="iconfont icon-sousuo1" style="padding-right:10px"></i>
        </x-input>
      </group>
      <!-- 单选组 -->
      <group :title="clooerType.title">
        <checker
          v-model="clooerType.selected"
          radio-required
          type="radio"
          default-item-class="demo5-item"
          selected-item-class="demo5-item-selected"
          style="margin-top:10px;display: flex;"
        >
          <checker-item v-for="(data, index) in clooerType.data" :key="index" :value="data.id"
                        style="margin-bottom:10px;">{{data.title}}
          </checker-item>
        </checker>
      </group>
    </div>
    <!-- 底部button -->
    <flexbox :gutter="0">
      <flexbox-item>
        <x-button @click.native="reset">重置</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button :gradients="['#409eff', '#409eff']" @click.native="submit">确定</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script type="es6">
  import {
    Group,
    XInput,
    XButton,
    Flexbox,
    FlexboxItem,
    Checker,
    CheckerItem,
    PopupPicker,
    XSwitch,
    Popup
  } from 'vux'

  export default {
    components: {
      Group, XInput, XButton, Flexbox, FlexboxItem, Checker, CheckerItem, PopupPicker, XSwitch, Popup
    },
    data() {
      return {
        search: '',
        popupStyle: {
          'z-index': '552'
        },
        clooerType: {}
      }
    },
    mounted() {
      this.filterCondition();
    },
    methods: {
      //筛选数据加载
      filterCondition() {
        this.clooerType = {
          title: '类型',
          selected: "1",
          data: [
            {id: '1', title: '全部'},
            {id: '2', title: '一类'},
            {id: '3', title: '二类'},
            {id: '4', title: '物资'}
          ]
        };
      },
      //确认
      submit() {
        this.$emit('reset'); //  调用父组件的方法
      },
      //重置方法
      reset() {
        this.search = "";
        this.value4 = [];
        this.filterCondition();
      }
    }
  }
</script>

<style scoped>
  .demo5-item {
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    flex: 1;
    margin: 0 8px;
    font-size: 12px;
  }

  .demo5-item-selected {
    background: #ffffff url(../../assets/checker-active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }
</style>
