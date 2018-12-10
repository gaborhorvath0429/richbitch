import Vue from 'nativescript-vue'
import App from './components/App'
import Login from './components/Auth/Login'
import store from './store'
import VueDevtools from 'nativescript-vue-devtools'
const appSettings = require("tns-core-modules/application-settings");
Vue.use(require('vue-moment'));
if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.config.devtools = true;

store.commit('load');
store.subscribe((mutations, state) => {
  appSettings.setString("store", JSON.stringify(state));
});

store.dispatch('expenses/getAll');

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
