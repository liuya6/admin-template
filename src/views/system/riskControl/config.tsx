import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';

const schemas = (timeList: any[]): FormSchema[] => {
  return [
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
      title: '操作时间',
      field: 'operateTime',
    },
    {
      title: '操作人',
      field: 'operateManager',
    },
    {
      title: '原数据',
      field: 'sourceData',
    },
    {
      title: '修改后数据',
      field: 'targetData',
    },
    // {
    //   title: '操作内容',
    //   field: 'cs',
    // },
  ];
};

export { schemas, tableTitle };
