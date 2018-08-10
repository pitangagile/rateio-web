/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
// #region external
import ExternalMaster from '@/components/external/_master/';
import ExternalSignin from '@/components/external/signin/';
// #region internal
import InternalMaster from '@/components/internal/_master/';
import InternalCostCenter from '@/components/internal/costcenter/';
import InternalManage from '@/components/internal/manage/';
import InternalReporting from '@/components/internal/reporting/';
import InternalHoliday from '@/components/internal/holiday/';
import InternalSchedule from '@/components/internal/schedule';
import InternalSettings from '@/components/internal/settings/';
import InternalHelp from '@/components/internal/help/';
import InternalPeriod from '@/components/internal/period/';
import InternalEmployee from '@/components/internal/employee';
import InternalFileUpload from '@/components/internal/fileupload';
// #endregion internal
import NavigationGuards from './navigations.guards';
// import ExternalSignUp from '@/components/external/sign-up/';
// #endregion external

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
          name: 'signin',
          component: ExternalSignin,
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
          name: 'settings',
          component: InternalSettings,
        },
        {
          path: 'fileupload',
          name: 'fileupload',
          component: InternalFileUpload,
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
          path: 'help',
          name: 'help',
          component: InternalHelp,
        },
        {
          path: 'period',
          name: 'period',
          component: InternalPeriod,
        },
        {
          path: 'employee',
          name: 'employee',
          component: InternalEmployee,
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
