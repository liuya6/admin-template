import type { AppRouteModule } from '/@/router/types';

import { LAYOUT, getParentLayout } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/configuration',
  meta: {
    orderNo: 10,
    icon: 'ic:round-system-security-update',
    title: t('routes.system.system'),
  },
  children: [
    {
      path: 'configuration',
      name: 'Configuration',
      component: () => import('/@/views/system/configuration/Configuration.vue'),
      meta: {
        icon: 'ic:round-construction',
        title: t('routes.system.configuration'),
      },
    },
    {
      path: 'risk',
      name: 'Risk',
      component: () => import('/@/views/system/riskControl/index.vue'),
      meta: {
        icon: 'ic:outline-pest-control',
        title: t('routes.system.risk'),
      },
    },
    {
      path: 'ipLimit',
      name: 'IpLimit',
      component: () => import('/@/views/system/ipLimit/index.vue'),
      meta: {
        icon: 'ic:outline-privacy-tip',
        title: t('routes.system.IpLimit'),
      },
    },
    {
      path: 'authority',
      name: 'Authority',
      component: getParentLayout('Authority'),
      redirect: '/system/authority/role',
      meta: {
        icon: 'ic:outline-security',
        title: t('routes.system.authority'),
      },
      children: [
        {
          path: 'role',
          name: 'Role',
          component: () => import('/@/views/system/authority/role/Role.vue'),
          meta: {
            icon: 'ic:twotone-manage-accounts',
            title: t('routes.system.role'),
          },
        },
        {
          path: 'account',
          name: 'Account',
          component: () => import('/@/views/system/authority/account/Account.vue'),
          meta: {
            icon: 'ic:outline-account-box',
            title: t('routes.system.account'),
          },
        },
      ],
    },
    {
      path: 'feedback',
      name: 'Feedback',
      component: () => import('/@/views/system/feedback/index.vue'),
      meta: {
        icon: 'ic:outline-feedback',
        title: t('routes.system.feedback'),
      },
    },
    {
      path: 'version',
      name: 'Version',
      component: () => import('/@/views/system/version/index.vue'),
      meta: {
        icon: 'ic:twotone-system-update-alt',
        title: t('routes.system.version'),
      },
    },
  ],
};

export default system;
