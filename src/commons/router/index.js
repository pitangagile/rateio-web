import Vue from 'vue';
import Router from 'vue-router';

// #region external
import ExternalMaster from '@/components/external/_master/';
import ExternalHome from '@/components/external/home/';
import ExternalSignIn from '@/components/external/sign-in/';
import ExternalSignUp from '@/components/external/sign-up/';
// #endregion external

// #region internal
import InternalMaster from '@/components/internal/_master/';
import InternalDashboard from '@/components/internal/dashboard/';
// #endregion internal

import NavigationGuards from './navigations.guards';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'external',
      redirect: '/external',
    },
    {
      path: '/external/',
      component: ExternalMaster,
      meta: { requiresAuth: false },
      props: true,
      children: [
        {
          path: '',
          name: 'home',
          component: ExternalHome,
        },
        {
          path: 'signin',
          name: 'signin',
          component: ExternalSignIn,
        },
        {
          path: 'signup',
          name: 'signup',
          component: ExternalSignUp,
        },
      ],
    },
    {
      path: '/internal/',
      component: InternalMaster,
      meta: { requiresAuth: true },
      props: true,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: InternalDashboard,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  NavigationGuards.beforeEnter(to, from, next);
});

export default router;
