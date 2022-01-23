import VueRouter from 'vue-router';
import routes from 'scripts/router/routes';

const router = new VueRouter({
  mode: 'history',
  routes,
});
export default router;
