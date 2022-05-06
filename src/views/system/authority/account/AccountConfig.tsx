import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';
import RenderDemo from '/@/views/demo/form/BasicForm/components/RenderDemo/index.vue';
import { useGo } from '/@/hooks/web/usePage';
import { Popconfirm, Tag } from 'ant-design-vue';
import { delAppInfo } from '/@/api/app/AppApi';
import { MPConfirm, MPConfirmConfig } from '/@/components/MPConfirm';
import { MOptionsConfig } from '/@/components/MOptions/type';
import { AppService } from '/@/api';
import { getAccountRole, getRoleList } from '/@/api/sys/SysSetting';
import { ref, unref } from 'vue';

const roleList = async () => {
  const list: any = [];
  const { result } = await getRoleList({});
  result.data.forEach((item: any) => {
    list.push({
      label: item.name,
      value: item.id,
    });
  });
  return list;
};

export const roleId = async (accountId) => {
  const list: any = [];
  const { result } = await getAccountRole({ accountId });
  result.forEach((item: any) => {
    list.push(item.id);
  });
  console.log(list, 'result', result, 'roleId>>>');
  return list.length > 0 ? list[0] : 0;
};

const dialogSchemas = (data = ref<any>({})): FormSchema[] => {
  return [
    {
      label: '登录账户',
      component: 'Input',
      field: 'username',
      required: true,
      defaultValue: unref(data).username ?? '',
      colProps: {
        span: 11,
      },
    },
    {
      label: '密码',
      component: 'InputPassword',
      field: 'password',
      required: unref(data).id == null ? true : false,
      colProps: {
        span: 11,
      },
    },
    {
      label: '角色',
      component: 'ApiSelect',
      field: 'roleId',
      required: true,
      defaultValue: unref(data).id ?? '',
      componentProps: {
        api: roleList,
      },
      colProps: {
        span: 11,
      },
    },
    {
      label: '姓名',
      component: 'Input',
      field: 'name',
      defaultValue: unref(data).name ?? '',
      colProps: {
        span: 11,
      },
    },
    {
      label: '邮件',
      component: 'Input',
      field: 'email',
      defaultValue: unref(data).email ?? '',
      colProps: {
        span: 11,
      },
    },
    {
      label: '手机号',
      component: 'Input',
      field: 'mobile',
      defaultValue: unref(data).mobile ?? '',
      colProps: {
        span: 11,
      },
    },
    {
      label: '备注',
      component: 'InputTextArea',
      defaultValue: unref(data).remark ?? '',
      field: 'remark',
      colProps: {
        span: 11,
      },
    },
  ];
};

export const options: MOptionsConfig[] = [
  {
    title: '+新增成员',
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
      label: '用户ID/名称',
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
      title: '账号',
      field: 'username',
    },
    {
      title: '名称',
      field: 'name',
    },
    {
      title: '邮件',
      field: 'email',
    },
    {
      title: '手机号',
      field: 'mobile',
    },
    {
      title: '备注',
      field: 'remark',
    },
    {
      title: '状态',
      field: 'status',
      render: (scope) => {
        const { row } = scope;
        const obj: { color: string; text: string } =
          row.status === 0
            ? {
                color: 'green',
                text: '正常',
              }
            : row.status === -1
            ? {
                color: 'red',
                text: '已删除',
              }
            : {
                color: '',
                text: '',
              };
        return <Tag color={obj.color}>{obj.text} </Tag>;
      },
    },

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

export { schemas, tableTitle, dialogSchemas };
