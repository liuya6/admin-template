import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';
import RenderDemo from '/@/views/demo/form/BasicForm/components/RenderDemo/index.vue';
import { useGo } from '/@/hooks/web/usePage';
import { Popconfirm } from 'ant-design-vue';
import { delAppInfo } from '/@/api/app/AppApi';
import { MPConfirm, MPConfirmConfig } from '/@/components/MPConfirm';
import { MOptionsConfig } from '/@/components/MOptions/type';

const changePath = '/app/appListChange';
const delHint = '确定删除当前条目？';
const sureHint = '确定';
const cancelHint = '取消';
export const options: MOptionsConfig[] = [
  {
    title: '+新增应用',
    type: 'button',
    emitType: 'add',
    btnConfig: {
      type: 'primary',
    },
  },
];
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
  ];
};

const tableTitle = (router, delItem, editItem): TableData[] => {
  return [
    {
      title: '应用名称',
      field: 'name',
    },
    {
      title: '类型',
      field: 'type',
    },
    {
      title: '版本',
      field: 'versionNo',
    },
    {
      title: 'APK大小',
      field: 'fileSize',
    },
    {
      title: '下载量',
      field: 'downloadTimes',
    },
    {
      title: '更新时间',
      field: 'updateTime',
    },
    // {
    //   title: '操作',
    //   field: 'operate',
    //   render: (callBack: any) => {
    //     const row = callBack.row;
    //     return (
    //       <div class="ant-row-center">
    //         <a
    //           onClick={() => {
    //             editItem(row);
    //           }}
    //         >
    //           编辑
    //         </a>
    //         <div class="flex-1" />
    //         <Popconfirm
    //           title={delHint}
    //           onConfirm={() => {
    //             delItem(row);
    //           }}
    //           okText={sureHint}
    //           cancelText={cancelHint}
    //         >
    //           <a type="link">删除</a>
    //         </Popconfirm>
    //       </div>
    //     );
    //   },
    // },

    {
      title: '操作',
      width: 150,
      render: (scope) => {
        const { row, rowIndex } = scope;
        const options: MPConfirmConfig[] = [
          {
            title: '编辑',
            onClick: () => {
              editItem(row);
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
              delItem(row);
            },
          },
        ];

        return <MPConfirm options={options} />;
      },
    },
  ];
};

export { schemas, tableTitle };
