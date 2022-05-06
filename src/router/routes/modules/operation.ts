import type { AppRouteModule } from '/@/router/types';

import { LAYOUT, getParentLayout } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const operation: AppRouteModule = {
  path: '/operation',
  name: 'Operation',
  component: LAYOUT,
  redirect: '/operation/operationManage',
  meta: {
    orderNo: 10,
    icon: 'icon-park-outline:reverse-operation-out',
    title: t('routes.operation.operation'),
  },
  children: [
    {
      path: 'operationManage',
      name: 'OperationManage',
      component: () => getParentLayout('OperationManage'),
      redirect: '/operation/operationManage/ad',
      meta: {
        icon: 'ant-design:fund-projection-screen-outlined',
        title: t('routes.operation.operationManage'),
      },
      children: [
        {
          path: 'ad',
          name: 'Ad',
          component: () => import('/@/views/operation/manage/advertise/AdvertiseManager.vue'),
          meta: {
            icon: 'ri:advertisement-line',
            title: t('routes.operation.ad'),
          },
        },
      ],
    },
    {
      path: 'operationAnalyze',
      name: 'OperationAnalyze',
      component: () => getParentLayout('OperationAnalyze'),
      redirect: '/operation/operationAnalyze/ad',
      meta: {
        icon: 'ant-design:interaction-outlined',
        title: t('routes.operation.operationAnalyze'),
      },
      children: [
        {
          path: 'userAnalyze',
          name: 'UserAnalyze',
          component: () => import('/@/views/operation/analyze/userAnalyze/index.vue'),
          meta: {
            icon: 'carbon:user-profile',
            title: t('routes.operation.userAnalyze'),
          },
        },
        {
          path: 'keepAnalyze',
          name: 'KeepAnalyze',
          component: () => import('/@/views/operation/analyze/keepAnalyze/index.vue'),
          meta: {
            icon: 'ic:sharp-manage-history',
            title: t('routes.operation.keepAnalyze'),
          },
        },
        {
          path: 'taskStatistics',
          name: 'TaskStatistics',
          component: () => import('/@/views/operation/analyze/taskStatistics/TaskStatistics.vue'),
          meta: {
            icon: 'ic:baseline-sticky-note-2',
            title: t('routes.operation.taskStatistics'),
          },
        },
      ],
    },
  ],
};

export default operation;
