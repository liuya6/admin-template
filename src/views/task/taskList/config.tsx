import { Tag } from 'ant-design-vue';

import { FormSchema } from '/@/components/Form';
import { TableData, TableDataTips } from '/@/components/MTable';
import { MSwitch } from '/@/components/MSwitch';
import { MOptionsConfig } from '/@/components/MOptions/type';
import { MPConfirm, MPConfirmConfig } from '/@/components/MPConfirm';
import { MImg } from '/@/components/MImg';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '任务状态',
      component: 'Select',
      field: 'taskStatus',
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [
          {
            label: '所有',
            value: -1,
          },
          {
            label: '进行中',
            value: 0,
          },
          {
            label: '已结束',
            value: -1,
          },
        ],
      },
    },
    {
      label: '应用名称',
      component: 'Input',
      field: 'appName',
      colProps: {
        span: 5,
      },
    },
    {
      label: '任务名称',
      component: 'Input',
      field: 'taskName',
      colProps: {
        span: 5,
      },
    },
  ];
};

const options: MOptionsConfig[] = [
  {
    title: '新增任务',
    type: 'button',
    emitType: 'add',
  },
  {
    title: '批量操作',
    type: 'dropdown',
    btnConfig: {
      type: 'primary',
    },
    list: [
      {
        title: '批量删除',
        emitType: 'batchDelete',
      },
    ],
  },
];

const tableTitle = (changeShowStatus: any, doSomeTing: any): TableData[] => {
  return [
    {
      title: '全选',
      type: 'checkbox',
    },
    {
      title: '应用名称',
      field: 'applicationName',
      render: (scope) => {
        const { row } = scope;
        // return row.applicationLogo;
        return <MImg imgData={row.applicationLogo} text={row.applicationName} />;
      },
    },
    {
      title: '任务名称',
      field: 'name',
    },
    {
      title: '任务ID',
      field: 'id',
    },
    {
      title: '类型',
      field: 'rewardType',
      formatter: (data: any) => (data === 1 ? '短期' : data === 2 ? '长期' : '-'),
    },
    {
      title: '任务组',
      field: 'taskGroups',
      formatter: (data: any) => data.map((item: any) => item.name).join(','),
    },
    {
      title: '参与人次',
      field: 'joinMembers',
    },
    {
      title: '人数限制',
      field: 'limitMax',
    },
    {
      title: '总赏金',
      field: 'totalReward',
    },
    {
      title: '状态',
      field: 'taskStatus',
      render: (scope) => {
        const { row } = scope;
        const obj: { color: string; text: string } =
          row.taskStatus === 0
            ? {
                color: 'green',
                text: '进行中',
              }
            : row.taskStatus === 1
            ? {
                color: 'red',
                text: '已结束',
              }
            : {
                color: '',
                text: '',
              };
        return <Tag color={obj.color}>{obj.text} </Tag>;
      },
    },
    {
      title: '显示',
      field: 'showStatus',
      render: (scope) => {
        const { row } = scope;
        return (
          <MSwitch
            defaultValue={row.showStatus === 1}
            onChange={(value: boolean) => {
              changeShowStatus(value, row);
            }}
          />
        );
      },
    },
    {
      title: '有效期',
      field: 'lastLoginIp',
      render: (scope) => {
        const { row } = scope;
        const date = row.validateStart + row.validateEnd;
        return row.validateType === 0 ? '不限制' : date ? <TableDataTips text={date} /> : '-';
      },
    },
    {
      title: '操作',
      width: 150,
      render: (scope) => {
        const { row } = scope;
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
              doSomeTing('delete', row);
            },
          },
        ];

        return <MPConfirm options={options} />;
      },
    },
  ];
};

export { schemas, tableTitle, options };
