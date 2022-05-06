import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';

const schemas = (timeList: any[]): FormSchema[] => {
  return [
    {
      label: '渠道',
      field: 'channelName',
      component: 'Input',
      colProps: {
        span: 5,
      },
    },
    {
      label: '用户趋势',
      field: 'type',
      component: 'Select',
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [
          {
            label: '新增用户',
            value: 1,
          },
          {
            label: '活跃用户',
            value: 2,
          },
          {
            label: '累计用户',
            value: 3,
          },
          {
            label: '崩溃数',
            value: 4,
          },
          {
            label: '活跃用户构成',
            value: 5,
          },
          {
            label: '平均单次使用时长',
            value: 6,
          },
          {
            label: '平均日使用时长',
            value: 7,
          },
          {
            label: '平均日启动时长',
            value: 8,
          },
        ],
      },
    },
    {
      label: '时间筛选',
      component: 'RangePicker',
      field: 'fieldTime',
      colProps: {
        span: 7,
      },
      defaultValue: timeList,
    },
  ];
};

const tableTitle = (): TableData[] => {
  return [
    {
      title: '日期',
      field: 'date',
    },
    {
      title: '新增用户',
      field: 'newUser',
    },
    {
      title: '活跃用户',
      field: 'activityUser',
    },
    {
      title: '累计用户',
      field: 'totalUser',
    },
    {
      title: '崩溃数',
      field: 'collapse',
    },
    {
      title: '活跃用户构成',
      field: 'activeComposition',
    },
    // {
    //   title: '新用户占比',
    //   field: 'cs',
    // },
    {
      title: '平均单次使用时长',
      field: 'avgSingleUseTime',
      headerTips: '分钟',
      minWidth: 130,
    },
    {
      title: '平均日使用时长',
      field: 'avgDayUseTime',
      headerTips: '分钟',
      minWidth: 130,
    },
    {
      title: '平均日启动次数',
      field: 'avgDayRunTimes',
      minWidth: 130,
    },
  ];
};

export { schemas, tableTitle };
