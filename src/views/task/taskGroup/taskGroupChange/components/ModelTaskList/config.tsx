import { TableData, TableDataTips } from '/@/components/MTable';
import { MPConfirm, MPConfirmConfig } from '/@/components/MPConfirm';
import { Tag } from 'ant-design-vue';
import { useEditCacheStore } from '/@/store/modules/editCache';
import { useGo } from '/@/hooks/web/usePage';

const tableTitle = (doSomeTing: any): TableData[] => {
  return [
    {
      title: '应用名称',
      field: 'applicationName',
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
        const { row, rowIndex } = scope;
        const go = useGo();
        const options: MPConfirmConfig[] = [
          {
            title: '编辑',
            onClick: () => {
              useEditCacheStore().setTaskEdit(row);
              return go('taskEdit');
            },
          },
          {
            title: '移除',
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

export { tableTitle };
