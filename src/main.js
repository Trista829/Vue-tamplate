import Vue from "vue";
import App from "@/App.vue";
import router from "@router";
import store from "@store";
import VueLazyload from 'vue-lazyload'
import Vant from "vant";
import "vant/lib/index.less";
import {
  Tree
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets';

Vue.use(Vant);
Vue.use(VueLazyload)
Vue.use(Tree)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
