import type { AppRouteModule } from '/@/router/types';

import { LAYOUT, getParentLayout } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const task: AppRouteModule = {
  path: '/task',
  name: 'Task',
  component: LAYOUT,
  redirect: '/task/taskList',
  meta: {
    orderNo: 10,
    icon: 'ic:outline-task',
    title: t('routes.task.task'),
  },
  children: [
    {
      path: 'taskList',
      name: 'TaskList',
      component: () => import('/@/views/task/taskList/index.vue'),
      meta: {
        icon: 'ic:sharp-list-alt',
        title: t('routes.task.taskList'),
      },
    },
    {
      path: 'taskAdd',
      name: 'TaskAdd',
      component: () => import('/@/views/task/taskList/taskChange/index.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.task.taskAdd'),
      },
    },
    {
      path: 'taskEdit',
      name: 'TaskEdit',
      component: () => import('/@/views/task/taskList/taskChange/index.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.task.taskEdit'),
      },
    },
    {
      path: 'taskGroup',
      name: 'TaskGroup',
      component: () => import('/@/views/task/taskGroup/index.vue'),
      meta: {
        icon: 'ic:outline-group-remove',
        title: t('routes.task.taskGroup'),
      },
    },
    {
      path: 'taskGroupAdd',
      name: 'TaskGroupAdd',
      component: () => import('/@/views/task/taskGroup/taskGroupChange/index.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.task.taskGroupAdd'),
      },
    },
    {
      path: 'taskGroupEdit',
      name: 'TaskGroupEdit',
      component: () => import('/@/views/task/taskGroup/taskGroupChange/index.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.task.taskGroupEdit'),
      },
    },
    {
      path: 'topic',
      name: 'TaskTopic',
      component: getParentLayout('TaskTopic'),
      redirect: '/task/topic/bounty',
      meta: {
        icon: 'ic:baseline-subject',
        title: t('routes.task.taskTopic'),
      },
      children: [
        {
          path: 'bounty',
          name: 'TaskTopicBounty',
          component: () => import('/@/views/task/taskTopic/bounty/BountyTask.vue'),
          meta: {
            icon: 'ic:sharp-account-balance',
            title: t('routes.task.taskTopicBounty'),
          },
        },
        {
          path: 'daily',
          name: 'TaskTopicDaily',
          component: () => import('/@/views/task/taskTopic/daily/index.vue'),
          meta: {
            icon: 'ic:sharp-add-task',
            title: t('routes.task.taskTopicDaily'),
          },
        },
        {
          path: 'long',
          name: 'TaskTopicLong',
          component: () => import('/@/views/task/taskTopic/long/LongTask.vue'),
          meta: {
            icon: 'ic:outline-assessment',
            title: t('routes.task.taskTopicLong'),
          },
        },
      ],
    },
  ],
};

export default task;
