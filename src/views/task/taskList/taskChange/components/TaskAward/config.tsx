import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';
import { MPConfirm, MPConfirmConfig } from '/@/components/MPConfirm';

const tableTitle = (doSomeTing: any): TableData[] => {
  return [
    {
      title: '序号',
      field: '',
      render: (scope: any) => {
        const { rowIndex } = scope;
        return rowIndex + 1;
      },
    },
    {
      title: '奖励描述',
      field: 'taskDesc',
    },
    {
      title: '行为',
      field: 'actionType',
      formatter: (data: any) => (data === 1 ? '注册' : data === 2 ? '在线' : ''),
    },
    {
      title: '时长',
      field: 'duration',
    },
    {
      title: '奖励（元）',
      field: 'reward',
    },
    {
      title: '操作',
      width: 150,
      render: (scope: any) => {
        const { row, rowIndex } = scope;
        const options: MPConfirmConfig[] = [
          {
            title: '编辑',
            onClick: () => {
              doSomeTing('edit', row);
            },
          },
          {
            title: '删除',
            btnConfig: {
              danger: true,
            },
            confirmConfig: {
              title: '确定删除吗？',
            },
            onConfirm: () => {
              doSomeTing('delete', rowIndex);
            },
          },
        ];

        return <MPConfirm options={options} />;
      },
    },
  ];
};

const schemas = (): FormSchema[] => {
  return [
    {
      label: '奖励描述',
      field: 'taskDesc',
      component: 'InputTextArea',
      colProps: {
        span: 20,
      },
      required: true,
    },
    {
      label: '行为',
      field: 'actionType',
      component: 'Select',
      colProps: {
        span: 20,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '注册',
            value: 1,
          },
          {
            label: '在线',
            value: 2,
          },
        ],
      },
    },
    {
      label: '时长',
      field: 'duration',
      component: 'InputNumber',
      suffix: '小时',
      colProps: {
        span: 20,
      },
      required: true,
    },
    {
      label: '奖励',
      field: 'reward',
      component: 'InputNumber',
      suffix: '元',
      colProps: {
        span: 20,
      },
      required: true,
    },
  ];
};

export { tableTitle, schemas };
