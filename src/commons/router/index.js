/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';

import ExternalMaster from '@/components/external/_master/';
import ExternalSignin from '@/components/external/signin/';

import InternalMaster from '@/components/internal/_master/';
import InternalCostCenter from '@/components/internal/costcenter/';
import InternalManage from '@/components/internal/manage/';
import InternalReporting from '@/components/internal/reporting/';
import InternalHoliday from '@/components/internal/holiday/';
import InternalSettings from '@/components/internal/settings/';
import InternalHelp from '@/components/internal/help/';
import InternalPeriod from '@/components/internal/period/';
import InternalEmployee from '@/components/internal/employee/';
import InternalReportings from '@/components/internal/reportings/'
import InternalFileUpload from '@/components/internal/fileupload/'

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
        // Full access
        {
          path: '',
          name: 'settings',
          component: InternalSettings,
          meta : {roles: ['colaborador', 'gerente', 'administrador']}
        },
        {
          path: 'reporting',
          name: 'reporting',
          component: InternalReporting,
          meta : {roles: ['colaborador', 'gerente', 'administrador']}
        },
        {
          path: 'holiday',
          name: 'holiday',
          component: InternalHoliday,
          meta : {roles: ['colaborador', 'gerente', 'administrador']}
        },
        {
          path: 'help',
          name: 'help',
          component: InternalHelp,
          meta : {roles: ['colaborador', 'gerente', 'administrador']}
        },
        // Gerente
        {
          path: 'reportings',
          name: 'reportings',
          component: InternalReportings,
          meta : {roles: ['gerente', 'administrador']}
        },
        {
          path: 'manage', // rateio
          name: 'manage',
          component: InternalManage,
          meta : {roles: ['gerente', 'administrador']}
        },
        // Administrador
        {
          path: 'fileupload',
          name: 'fileupload',
          component: InternalFileUpload,
          meta : {roles: ['administrador']}
        },
        {
          path: 'employee',
          name: 'employee',
          component: InternalEmployee,
          meta : {roles: ['administrador']}
        },
        {
          path: 'period',
          name: 'period',
          component: InternalPeriod,
          meta : {roles: ['administrador']}
        },
        {
          path: 'costcenter',
          name: 'costcenter',
          component: InternalCostCenter,
          meta : {roles: ['administrador']}
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
