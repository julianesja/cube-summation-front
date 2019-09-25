import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './plugins/axios'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

Vue.use(VueSweetalert2, options)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
