import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default function () {
  const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: () => import('./components/home.vue')
      },
      {
        path: '/demo',
        component: () => import('./components/demo.vue')
      }
    ]
  });
  return router;
}