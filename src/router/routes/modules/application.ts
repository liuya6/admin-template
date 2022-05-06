import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const application: AppRouteModule = {
  path: '/app',
  name: 'App',
  component: LAYOUT,
  redirect: '/app/appList',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: t('routes.application.app'),
  },
  children: [
    {
      path: 'appList',
      name: 'AppList',
      component: () => import('/@/views/application/appList/AppList.vue'),
      meta: {
        icon: 'ci:list-checklist-alt',
        title: t('routes.application.appList'),
      },
    },
    {
      path: 'appListChange',
      name: 'AppListChange',
      component: () => import('/@/views/application/appList/change/AppListChange.vue'),
      meta: {
        icon: 'ci:list-checklist-alt',
        title: t('routes.application.appListChange'),
        hideMenu:true,
      },
    },
  ],
};

export default application;
