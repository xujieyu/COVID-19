import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from "./router";
import { Picker, Popup } from 'vant';
import 'amfe-flexible'
import './assets/init.styl'
import 'vant/lib/picker/style';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Picker);
Vue.use(Popup);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
