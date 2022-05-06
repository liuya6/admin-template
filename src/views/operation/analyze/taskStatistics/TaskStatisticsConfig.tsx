import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';
import RenderDemo from '/@/views/demo/form/BasicForm/components/RenderDemo/index.vue';
import { useGo } from '/@/hooks/web/usePage';
import { Popconfirm } from 'ant-design-vue';
import { delAppInfo } from '/@/api/app/AppApi';
import { MPConfirm, MPConfirmConfig } from '/@/components/MPConfirm';
import { MOptionsConfig } from '/@/components/MOptions/type';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '应用名称',
      component: 'Input',
      field: 'name',
      colProps: {
        span: 5,
      },
    },
    {
      label: '任务',
      component: 'Input',
      field: 'name',
      colProps: {
        span: 5,
      },
    },
    {
      label: '时间段',
      component: 'RangePicker',
      field: 'periodTime',
      colProps: {
        span: 6,
      },
    },
  ];
};

const tableTitle = (): TableData[] => {
  return [
    {
      title: '应用名称',
      field: 'name',
    },
    {
      title: '任务名称',
      field: '',
    },
    {
      title: '人数限制',
      field: '',
    },
    {
      title: '点击量',
      field: '',
    },
    {
      title: '参与人数',
      field: '',
    },
    {
      title: '下载数',
      field: '',
    },
    {
      title: '任务完成数',
      field: '',
    },
    {
      title: '任务完成金额',
      field: '',
    },
  ];
};

export { schemas, tableTitle };
