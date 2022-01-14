/* istanbul ignore file */

import 'styles/main.scss';
import Vue, { VNode } from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import router from 'scripts/router';
import Store from 'scripts/store';
import Layout from 'scripts/containers/Layout.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

const store = Store();

if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION MODE'); // eslint-disable-line no-console
}
if (process.env.NODE_ENV === 'development') {
  console.log('DEVELOPMENT MODE'); // eslint-disable-line no-console
}

// Webpack HMR interface.
interface ExtendedNodeModule extends NodeModule {
  hot: { accept: () => void };
}

let vm: Vue;

function main(): void {
  vm = new Vue({
    components: { Layout },
    router,
    store,
    render(h): VNode { return h(Layout); },
  }).$mount('#root');
  Vue.config.devtools = process.env.NODE_ENV !== 'production';
}

// Ensures DOM is fully loaded before running app's main logic.
// Loading hasn't finished yet...
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
  // `DOMContentLoaded` has already fired...
} else {
  main();
}

// Ensures subscriptions to Store are correctly cleared when page is left, to prevent "ghost"
// processing, by manually unmounting Vue components tree.
window.addEventListener('beforeunload', () => {
  vm.$destroy();
});

// Enables Hot Module Rendering.
if ((module as ExtendedNodeModule).hot) {
  (module as ExtendedNodeModule).hot.accept();
}
