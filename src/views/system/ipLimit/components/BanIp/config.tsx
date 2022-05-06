import type { Ref } from 'vue';

import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';
import { MPConfirmConfig, MPConfirm } from '/@/components/MPConfirm';
import { MOptionsConfig } from '/@/components/MOptions';

const schemas = (): FormSchema[] => {
  return [
    {
      label: 'ip地址',
      component: 'Input',
      field: 'ip',
      colProps: {
        span: 5,
      },
    },
  ];
};

const options: MOptionsConfig[] = [
  {
    title: '新增禁用ip',
    type: 'button',
    emitType: 'add',
    btnConfig: {
      type: 'primary',
    },
  },
];

const tableTitle = (doSomeTing: any): TableData[] => {
  return [
    {
      title: 'ip地址',
      field: 'ip',
    },
    {
      title: '位置',
      field: 'area',
    },
    {
      title: '操作人',
      field: 'createName',
    },
    {
      title: '开始时间',
      field: 'createTime',
    },
    {
      title: '结束时间',
      field: 'endTime',
    },
    {
      title: '操作',
      render: (scope) => {
        const { row } = scope;
        const options: MPConfirmConfig[] = [
          {
            title: '编辑',
            onClick: () => {
              doSomeTing('edit', row);
            },
          },
        ];
        return <MPConfirm options={options} />;
      },
    },
  ];
};

const modalSchemas = (isShortTerm: Ref<boolean>): FormSchema[] => {
  return [
    {
      label: '禁用IP地址',
      field: 'ip',
      component: 'Input',
      colProps: {
        span: 18,
      },
      required: true,
    },
    {
      label: '禁用时间',
      field: 'timeType',
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: '短期',
            value: 0,
          },
          {
            label: '永久',
            value: 1,
          },
        ],
        onChange: (data: any) => {
          isShortTerm.value = data.target.value === 0;
        },
      },
      colProps: {
        span: 18,
      },
    },
    {
      label: '短期天数',
      component: 'Input',
      field: 'days',
      suffix: '天',
      colProps: {
        span: 18,
      },
      ifShow: isShortTerm.value,
    },
  ];
};

export { schemas, tableTitle, options, modalSchemas };
