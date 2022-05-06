import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/userList',
  meta: {
    orderNo: 10,
    icon: 'ic:outline-manage-accounts',
    title: t('routes.user.user'),
  },
  children: [
    {
      path: 'userList',
      name: 'UserList',
      component: () => import('/@/views/user/userList/index.vue'),
      meta: {
        icon: 'ic:outline-list-alt',
        title: t('routes.user.userList'),
      },
    },
  ],
};

export default user;
