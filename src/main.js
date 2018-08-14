

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'assets/css/reset.css'   //  引入初始样式
import 'assets/style.css'
import App from './App'
import router from './router'
//日期格式化
import moment from 'moment'
Vue.prototype.$moment = moment;
// 用法举例 this.$moment(new Date()).format('YYYY-MM-DD')

//过滤器
import * as filters from './api/filter.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// rem转换插件
import 'lib-flexible/flexible'
// ui组件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/index'

Vue.use(MintUI)
import * as VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



