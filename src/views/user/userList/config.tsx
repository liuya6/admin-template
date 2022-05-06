import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';
import { MPConfirmConfig, MPConfirm } from '/@/components/MPConfirm';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '用户状态',
      component: 'Select',
      field: 'accountStatus',
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [
          {
            label: '正常',
            value: 1,
          },
          {
            label: '已禁用',
            value: -1,
          },
          {
            label: '注销',
            value: -2,
          },
          {
            label: '查看所有',
            value: -3,
          },
        ],
      },
    },
    {
      label: '用户/id/手机号',
      component: 'Input',
      field: 'nickName',
      labelWidth: 120,
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

const tableTitle = (changeStatus: Function): TableData[] => {
  return [
    {
      title: '用户',
      field: 'nickName',
    },
    {
      title: '用户ID',
      field: 'userNo',
    },
    {
      title: '手机号',
      field: 'mobile',
    },
    {
      title: '余额',
      field: 'balance',
    },
    // {
    //   title: '累计体现',
    //   field: 'status',
    // },
    // {
    //   title: '任务参与次数',
    //   field: 'status',
    // },
    // {
    //   title: '注册时间',
    //   field: 'status',
    // },
    {
      title: '任务完成次数',
      field: 'status',
    },
    {
      title: '渠道',
      field: 'channal',
    },
    {
      title: '平台',
      field: 'platformInfo',
    },
    {
      title: '最后登录IP',
      field: 'lastLoginIp',
    },
    {
      title: '最后登录时间',
      field: 'lastLoginTime',
    },
    {
      title: '手机型号',
      field: 'modelInfo',
    },
    {
      title: '手机品牌',
      field: 'brandInfo',
    },
    {
      title: '手机系统',
      field: 'systemInfo',
    },
    {
      title: 'SDK版本',
      field: 'sdkVersion',
    },
    {
      title: '设备号',
      field: 'device',
    },
    // {
    //   title: 'oaID',
    //   field: 'status',
    // },
    // {
    //   title: 'androidID',
    //   field: 'status',
    // },
    // {
    //   title: 'MAC',
    //   field: 'status',
    // },
    // {
    //   title: '真实姓名',
    //   field: 'username',
    // },
    {
      title: '性别',
      field: 'gender',
      formatter: (data: number) => (data === 1 ? '男' : data === 2 ? '女' : '-'),
    },
    {
      title: '生日',
      field: 'birthday',
    },
    // {
    //   title: '职业',
    //   field: 'job',
    // },
    {
      title: '区域',
      field: 'city',
      render: (scope) => {
        const { row } = scope;
        const result = row.province + row.city;
        return result ? result : '-';
      },
    },
    {
      title: '操作',
      field: 'operate',
      width: 160,
      render: (scope: any) => {
        const { row } = scope;
        const showStatusBtn = [0, 1].includes(row.accountStatus);
        const FTitle = row.accountStatus === 0 ? '禁用' : row.accountStatus === -1 ? '解禁' : '';
        const FType =
          row.accountStatus === 0 ? 'disable' : row.accountStatus === -1 ? 'unblock' : '';
        const options: MPConfirmConfig[] = [
          {
            title: FTitle,
            emitType: FType,
            hidden: !showStatusBtn,
            confirmConfig: {
              title: `确定${FTitle}吗？`,
            },
            btnConfig: {
              type: 'link',
            },
            onConfirm: (emitType: string) => {
              changeStatus(emitType, row);
              console.log(emitType, 'emitType');
            },
          },
          // {
          //   title: '详情',
          //   type: 'details',
          // },
          {
            title: '删除',
            emitType: 'delete',
            hidden: !showStatusBtn,
            confirmConfig: {
              title: '确定删除吗',
            },
            btnConfig: {
              type: 'link',
              danger: true,
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
