import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => { require.ensure([], () => { resolve(require('@/views/Layout/Login')) }) } // 登录
const Home = resolve => { require.ensure([], () => { resolve(require('@/views/Home')) }) } // 主页面框架

const Index = resolve => { require.ensure([], () => { resolve(require('@/views/Layout/Index')) }) } // 首页

const Details = resolve => { require.ensure([], () => { resolve(require('@/views/Details/Details')) }) } // 装备详情
const Detailed = resolve => { require.ensure([], () => { resolve(require('@/views/Detailed/Detailed')) }) } // 新增明细
const Msg = resolve => { require.ensure([], () => { resolve(require('@/views/Msg/Msg')) }) } // 新增明细
const NotFound = resolve => { require.ensure([], () => { resolve(require('@/views/Layout/404')) }) } // 错误404

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '错误界面',
      hidden: true
    },
    {
      path: '*',
      name: '404',
      hidden: true,// 隐藏，在菜单中不显示
      redirect: {path: '/404'}
    },
    {
      path: '/',
      name: '主页面',
      component: Home,
      redirect: {path: '/index'},
      children: [
        {path: '/index', component: Index, name: '疫苗档案', meta:{ link: '#/details' }}
      ]
    },
    {path: '/details', component: Details, name: '疫苗档案详情'},
    {path: '/detailed', component: Detailed, name: '添加入库明细'},
    {path: '/msg', component: Msg, name: '上传提示消息'}
  ]
})
