import type { AppRouteModule } from '/@/router/types';

import { LAYOUT, getParentLayout } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const demo: AppRouteModule = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  redirect: '/demo/base',
  meta: {
    orderNo: 10,
    icon: 'fa6-solid:democrat',
    title: t('routes.demo.demo'),
  },
  children: [
    {
      path: 'base',
      name: 'DemoBase',
      redirect: '/demo/base/one',
      component: getParentLayout('Base'),
      meta: {
        icon: 'akar-icons:vue-fill',
        title: t('routes.demo.base'),
      },
      children: [
        {
          path: 'one',
          name: 'One',
          component: () => import('/@/views/demo/base/one/index.vue'),
          meta: {
            icon: 'akar-icons:vue-fill',
            title: t('routes.demo.one'),
          },
        },
        {
          path: 'two',
          name: 'Two',
          component: () => import('/@/views/demo/base/two/index.vue'),
          meta: {
            icon: 'akar-icons:vue-fill',
            title: t('routes.demo.two'),
          },
        },
        {
          path: 'three',
          name: 'Three',
          component: () => import('/@/views/demo/base/three/index1.vue'),
          meta: {
            icon: 'akar-icons:vue-fill',
            title: t('routes.demo.three'),
          },
        },
      ],
    },
    {
      path: 'form',
      name: 'DemoForm',
      component: () => import('/@/views/demo/form/BasicForm/index.vue'),
      meta: {
        icon: 'ant-design:form-outlined',
        title: t('routes.demo.form'),
      },
    },
    {
      path: 'shrinkForm',
      name: 'DemoShrinkForm',
      component: () => import('/@/views/demo/form/ShrinkForm/index.vue'),
      meta: {
        icon: 'ant-design:form-outlined',
        title: t('routes.demo.shrinkForm'),
      },
    },
    {
      path: 'table',
      name: 'DemoTable',
      component: () => import('/@/views/demo/table/BasicTable/index.vue'),
      meta: {
        icon: 'ant-design:table-outlined',
        title: t('routes.demo.table'),
      },
    },
    {
      path: 'integrated',
      name: 'Integrated',
      component: () => import('/@/views/demo/table/integrated/index.vue'),
      meta: {
        icon: 'ic:outline-integration-instructions',
        title: t('routes.demo.integrated'),
      },
    },
  ],
};

export default demo;
