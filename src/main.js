import Vue from 'vue'
import VueRx from 'vue-rx';

import App from './App.vue'

import { timer, interval } from 'rxjs/observable';
import { pipe, takeUntil } from 'rxjs/operators';

Vue.use(VueRx, { timer, interval, pipe, takeUntil });

new Vue({
  el: '#app',
  render: h => h(App)
})
