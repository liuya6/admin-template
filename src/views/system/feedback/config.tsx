import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';
import { MPConfirmConfig, MPConfirm } from '/@/components/MPConfirm';
import { MImg } from '/@/components/MImg';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '处理状态',
      component: 'Select',
      field: 'operateStatus',
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [
          {
            label: '所有',
            value: -2,
          },
          {
            label: '已忽略',
            value: -1,
          },
          {
            label: '已解决',
            value: 0,
          },
          {
            label: '已接受',
            value: 1,
          },
        ],
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

const tableTitle = (changeStatus: Function): TableData[] => {
  return [
    {
      title: '内容',
      field: 'content',
    },
    {
      title: '图片',
      field: 'imgArray',
      render: (scope) => {
        const { row } = scope;
        return <MImg imgData={row.imgArray} />;
      },
    },
    {
      title: '用户',
      field: 'nickName',
    },
    {
      title: '时间',
      field: 'createTime',
    },
    {
      title: '状态',
      field: 'operateStatus',
      formatter: (data: number) =>
        data === -1 ? '已忽略' : data === 0 ? '待处理' : data === 1 ? '已接受' : '-',
    },
    {
      title: '操作',
      width: 160,
      render: (scope: any) => {
        const { row } = scope;
        const isNeglect = row.operateStatus === -1;
        const isSolved = row.operateStatus === 1;
        const options: MPConfirmConfig[] = [
          {
            title: '忽略',
            emitType: 'neglect',
            hidden: isNeglect,
            confirmConfig: {
              title: '确定忽略吗？',
            },
            btnConfig: {
              type: 'link',
              danger: true,
            },
            onConfirm: (emitType: string) => {
              changeStatus(emitType, row);
            },
          },
          {
            title: '已解决',
            emitType: 'solved',
            hidden: isSolved,
            confirmConfig: {
              title: '确定已解决吗',
            },
            btnConfig: {
              type: 'link',
            },
            onConfirm: (emitType: string) => {
              changeStatus(emitType, row);
            },
          },
        ];
        return <MPConfirm options={options} />;
      },
    },
  ];
};

export { schemas, tableTitle };
