import type { Ref } from 'vue';
import moment from 'moment';

import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';
import { MOptionsConfig } from '/@/components/MOptions';

const options: MOptionsConfig[] = [
  {
    title: '发布版本',
    type: 'button',
    emitType: 'add',
    btnConfig: {
      type: 'primary',
    },
  },
];

const tableTitle = (): TableData[] => {
  return [
    {
      title: '序号',
      render: (scope) => {
        const { rowIndex } = scope;
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      title: '更新内容',
      field: 'updateExplain',
    },
    {
      title: '更新版本',
      field: 'version',
    },
    {
      title: '版本code',
      field: 'versionNum',
    },
    {
      title: '是否强更',
      field: 'isMandatoryUpdate',
      formatter: (data: number) => (data === 1 ? '是' : data === 0 ? '否' : '-'),
    },
    {
      title: '系统',
      field: 'type',
      formatter: (data: number) => (data === 1 ? '安卓' : data === 2 ? 'IOS' : '-'),
    },
    {
      title: '下载地址',
      field: 'fileUrl',
    },
    {
      title: '创建时间',
      field: 'createTime',
      formatter: (data: Date) => moment(data).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];
};

const modalSchemas = (systemType: Ref): FormSchema[] => {
  return [
    {
      label: '强制更新',
      field: 'isMandatoryUpdate',
      component: 'RadioGroup',
      required: true,
      componentProps: {
        options: [
          {
            label: '是',
            value: 1,
          },
          {
            label: '否',
            value: 2,
          },
        ],
      },
    },
    {
      label: '系统',
      field: 'type',
      component: 'RadioGroup',
      required: true,
      componentProps: {
        options: [
          {
            label: '安卓',
            value: 1,
          },
          {
            label: 'ios',
            value: 2,
          },
        ],
        onChange: (data: any) => {
          systemType.value = data.target.value;
        },
      },
    },
    {
      label: '版本号',
      field: 'version',
      component: 'Input',
      required: true,
      helpMessage: ['安卓系统上传APK文件后自动获取版本号', '以避免误操作'],
    },
    {
      label: '更新内容',
      field: 'updateExplain',
      component: 'InputTextArea',
    },
    {
      label: 'APK文件',
      field: 'fileUrl',
      component: 'UploadFile',
      ifShow: systemType.value === 1,
      required: true,
      componentProps: ({ formModel }) => {
        return {
          onChange: (_, apiInfo) => {
            formModel.version = apiInfo.versionName;
          },
        };
      },
    },
    {
      label: '文件地址',
      field: 'fileUrl',
      component: 'Input',
      ifShow: systemType.value === 2,
      required: true,
    },
  ];
};

export { tableTitle, options, modalSchemas };
