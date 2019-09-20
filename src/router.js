import Vue from 'vue';
import Router from 'vue-router';
import Cookie from 'js-cookie';
import Home from './views/Home.vue';
// import User from './models/User';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 要前端检查cookie的话可以这样
    if (Cookie.get('login_status')) {
      next(); // next必须要调用
      return;
    }
    next({ name: 'login' });

    // 或者调用接口，由后端进行校验【推荐】
    /* User.getUserInfo().then(() => {
      next();
    }); */
  } else {
    next();
  }
});
export default router;
