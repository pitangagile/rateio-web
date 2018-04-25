import Vue from 'vue';
import Router from 'vue-router';

// #region external
import ExternalMaster from '@/components/external/_master/';
import ExternalHome from '@/components/external/home/';
import ExternalSignIn from '@/components/external/sign-in/';
// import ExternalSignUp from '@/components/external/sign-up/';
// #endregion external

// #region internal
import InternalMaster from '@/components/internal/_master/';
import InternalAllocation from '@/components/internal/allocation/';
import InternalAllocationMap from '@/components/internal/allocationmap/';
import InternalCostCenter from '@/components/internal/costcenter/';
import InternalDashboard from '@/components/internal/dashboard/';
import InternalManage from '@/components/internal/manage/';
import InternalReporting from '@/components/internal/reporting/';
import InternalHoliday from '@/components/internal/holiday/';
import InternalSchedule from '@/components/internal/schedule';
import InternalSettings from '@/components/internal/settings/';
import InternalHelp from '@/components/internal/help/';

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
        // {
        //   path: 'signup',
        //   name: 'signup',
        //   component: ExternalSignUp,
        // },
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
        {
          path: 'allocation',
          name: 'allocation',
          component: InternalAllocation,
        },
        {
          path: 'allocationmap',
          name: 'allocationmap',
          component: InternalAllocationMap,
        },
        {
          path: 'costcenter',
          name: 'costcenter',
          component: InternalCostCenter,
        },
        {
          path: 'manage',
          name: 'manage',
          component: InternalManage,
        },
        {
          path: 'reporting',
          name: 'reporting',
          component: InternalReporting,
        },
        {
          path: 'holiday',
          name: 'holiday',
          component: InternalHoliday,
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: InternalSchedule,
        },
        {
          path: 'settings',
          name: 'settings',
          component: InternalSettings,
        },
        {
          path: 'help',
          name: 'help',
          component: InternalHelp,
        },
      ],
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  NavigationGuards.beforeEnter(to, from, next);
});

export default router;
