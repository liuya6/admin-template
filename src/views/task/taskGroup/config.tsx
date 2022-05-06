import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';
import { MSwitch } from '/@/components/MSwitch';
import { MOptionsConfig } from '/@/components/MOptions/type';
import { MPConfirmConfig, MPConfirm } from '/@/components/MPConfirm';
import { useGo } from '/@/hooks/web/usePage';
import { useEditCacheStoreWithOut } from '/@/store/modules/editCache';

const editCache = useEditCacheStoreWithOut();

const schemas = (): FormSchema[] => {
  return [
    {
      label: '任务组',
      component: 'Input',
      field: 'name',
      colProps: {
        span: 5,
      },
    },
  ];
};

const options: MOptionsConfig[] = [
  {
    title: '新增任务组',
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
  const go = useGo();
  return [
    {
      title: '全选',
      type: 'checkbox',
    },
    {
      title: '任务组',
      field: 'name',
    },
    {
      title: '任务数',
      field: 'taskNums',
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
      title: '操作',
      render: (scope) => {
        const { row } = scope;
        const options: MPConfirmConfig[] = [
          {
            title: '编辑',
            onClick: () => {
              editCache.setTaskGroupEdit(row);
              go('taskGroupEdit');
            },
          },
          {
            title: '删除',
            emitType: 'delete',
            confirmConfig: {
              title: '确定删除吗',
            },
            btnConfig: {
              type: 'link',
              danger: true,
            },
            onConfirm: (emitType: string) => {
              doSomeTing(emitType, row);
            },
          },
        ];
        return <MPConfirm options={options} />;
      },
    },
  ];
};

export { schemas, tableTitle, options };
