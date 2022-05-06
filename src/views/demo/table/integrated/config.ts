import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '姓名',
      component: 'Input',
      field: 'name',
      colProps: {
        span: 5,
      },
    },
    {
      label: '地址',
      component: 'Input',
      field: 'address',
      colProps: {
        span: 5,
      },
    },
    {
      label: '地址',
      component: 'Input',
      field: 'address',
      colProps: {
        span: 5,
      },
    },
    {
      label: '地址',
      component: 'Input',
      field: 'address',
      colProps: {
        span: 5,
      },
    },
    {
      label: '地址',
      component: 'Input',
      field: 'address',
      colProps: {
        span: 5,
      },
    },
    {
      label: '地址',
      component: 'Input',
      field: 'address',
      colProps: {
        span: 5,
      },
    },
    {
      label: '地址',
      component: 'Input',
      field: 'address',
      colProps: {
        span: 5,
      },
    },
    {
      label: '地址',
      component: 'Input',
      field: 'address',
      colProps: {
        span: 5,
      },
    },
    {
      label: '地址',
      component: 'Input',
      field: 'address',
      colProps: {
        span: 5,
      },
    },
  ];
};

const tableTitle = (): TableData[] => {
  return [
    {
      title: '基础信息',
      children: [
        {
          title: '姓名',
          field: 'name',
          headerTips: 'cs',
        },
        {
          title: '地址',
          field: 'address',
          headerTips: '2222',
        },
        {
          title: 'number',
          field: 'no',
          headerTips: '2222',
        },
      ],
    },
    {
      title: 'beginTime',
      field: 'beginTime',
      headerTips: ['测试headerTip', '测试headerTip2', '测试headerTip3'],
    },
    {
      title: 'endTime',
      field: 'endTime',
      headerTips: () => {
        return ['endTime', 'endTime222'];
      },
    },
    {
      title: '状态',
      field: 'status',
    },
  ];
};

export { schemas, tableTitle };
