import { FormSchema } from '/@/components/Form';
import { TableData } from '/@/components/MTable';
import RenderDemo from '/@/views/demo/form/BasicForm/components/RenderDemo/index.vue';
import { useGo } from '/@/hooks/web/usePage';
import { Popconfirm } from 'ant-design-vue';
import { delAppInfo } from '/@/api/app/AppApi';
import { MPConfirm, MPConfirmConfig } from '/@/components/MPConfirm';
import { MOptionsConfig } from '/@/components/MOptions/type';
import { ref, unref } from 'vue';
import {
  getAccountRole,
  getPermissionTree,
  getRoleList,
  getRolePermission,
} from '/@/api/sys/SysSetting';
import { BasicTree, TreeItem } from '/@/components/Tree';
import { updateInfo } from '/@/utils/ConfigCommon';

export const pressionList = async () => {
  // const { result } = await getPermissionTree({});
  //TODO:测试数据
  const result = [
    {
      children: [
        {
          children: [
            {
              component: '',
              id: 100,
              meta: '',
              name: 'test0-0',
              parentId: 10,
              path: '',
              permKey: '',
              redirect: '',
              sort: 0,
              type: 0,
            },
          ],
          component: '',
          id: 10,
          meta: '',
          name: 'test',
          parentId: 0,
          path: '',
          permKey: '',
          redirect: '',
          sort: 0,
          type: 0,
        },
      ],
      component: '',
      id: 0,
      meta: '',
      name: 'test0',
      parentId: 0,
      path: '',
      permKey: '',
      redirect: '',
      sort: 0,
      type: 0,
    },
    {
      children: [
        {
          children: [
            {
              component: '',
              id: 111,
              meta: '',
              name: 'test1',
              parentId: 11,
              path: '',
              permKey: '',
              redirect: '',
              sort: 0,
              type: 0,
            },
          ],
          component: '',
          id: 11,
          meta: '',
          name: 'test',
          parentId: 1,
          path: '',
          permKey: '',
          redirect: '',
          sort: 0,
          type: 0,
        },
      ],
      component: '',
      id: 1,
      meta: '',
      name: 'wwww',
      parentId: 0,
      path: '',
      permKey: '',
      redirect: '',
      sort: 0,
      type: 0,
    },
  ];
  let { list, idList }: any = formatTreeList(result);
  console.log(list, 'listt');
  return list;
};
const formatTreeList = (list: any, idList?: any) => {
  if (list == null || list.length == 0) {
    return [];
  }
  list.map((item: any) => {
    item.title = item.name;
    item.key = item.id;
    if (idList != null) {
      idList.push(item.id);
    }
    let value: any = formatTreeList(item.children ?? [], idList);
    item.children = value.list;
  });
  console.log(list, 'formatTreeList');
  return { list, idList };
};
export const permissionId = async (roleId) => {
  // const { result } = await getRolePermission({ roleId });
  //TODO:测试数据
  const result = [
    {
      children: [
        {
          children: [
            {
              component: '',
              id: 100,
              meta: '',
              name: 'test0-0',
              parentId: 10,
              path: '',
              permKey: '',
              redirect: '',
              sort: 0,
              type: 0,
            },
          ],
          component: '',
          id: 10,
          meta: '',
          name: 'test',
          parentId: 0,
          path: '',
          permKey: '',
          redirect: '',
          sort: 0,
          type: 0,
        },
      ],
      component: '',
      id: 0,
      meta: '',
      name: 'test0',
      parentId: 0,
      path: '',
      permKey: '',
      redirect: '',
      sort: 0,
      type: 0,
    },
  ];
  let { list, idList }: any = formatTreeList(result, []);
  console.log(idList, 'idList');
  return idList;
};

export const options: MOptionsConfig[] = [
  {
    title: '+新增角色',
    type: 'button',
    emitType: 'add',
    btnConfig: {
      type: 'primary',
    },
  },
];
export const dialogSchemas = (
  data = ref<any>({}),
  pressionList = ref<TreeItem[]>([]),
): FormSchema[] => {
  return [
    {
      label: '角色名称',
      component: 'Input',
      field: 'name',
      required: true,
      defaultValue: unref(data).name ?? '',
      colProps: {
        span: 11,
      },
    },
    {
      label: '角色标识',
      component: 'Input',
      field: 'roleCode',
      required: true,
      defaultValue: unref(data).roleCode ?? '',
      colProps: {
        span: 11,
      },
    },
    {
      label: '角色描述',
      component: 'InputTextArea',
      field: 'roleDesc',
      defaultValue: unref(data).roleDesc ?? '',
      colProps: {
        span: 11,
      },
    },
    {
      label: '权限设置',
      component: 'Render',
      field: 'permissionIds',
      colProps: {
        span: 24,
      },
      defaultValue: unref(data).permissionIds ?? [],
      render: (scope) => {
        const { field, model } = scope;
        return (
          <BasicTree
            checkable
            checkedKeys={unref(data).permissionIds ?? []}
            onCheck={(value, e) => {
              unref(data).permissionIds = value;
              model[field] = value;
            }}
            defaultExpandAll={true}
            treeData={unref(pressionList)}
          />
        );
      },
    },
  ];
};

const tableTitle = (router, delItem, editItem): TableData[] => {
  return [
    {
      title: '角色名称',
      field: 'name',
    },
    {
      title: '角色标识',
      field: 'roleCode',
    },
    {
      title: '描述',
      field: 'roleDesc',
    },
    {
      title: '创建时间',
      field: 'createTime',
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

export { tableTitle };
