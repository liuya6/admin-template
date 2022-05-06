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
    // {
    //   label: '留存数/留存率',
    //   field: 'type',
    //   component: 'Select',
    //   colProps: {
    //     span: 5,
    //   },
    //   componentProps: {
    //     options: [
    //       {
    //         label: '留存数',
    //         value: 1,
    //       },
    //       {
    //         label: '留存率',
    //         value: 2,
    //       },
    //     ],
    //   },
    // },
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
      field: 'time',
    },
    {
      title: '新增用户',
      field: 'addUsers',
    },
    ...(function () {
      const list: any = [];

      Array(30)
        .fill(0)
        .forEach((item: 0, index: number) => {
          list.push({
            title: `${index + 1}天后`,
            field: `keep${index + 1}`,
          });
        });

      return list;
    })(),
  ];
};

export { schemas, tableTitle };
