import Vue from 'vue'
import App from './App.vue'
import VueCompositionAPI from '@vue/composition-api'

import 'ant-design-vue/dist/antd.css';

Vue.use(VueCompositionAPI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
