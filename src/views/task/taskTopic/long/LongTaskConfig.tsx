import type { Ref } from 'vue';
import { FormSchema } from '/@/components/Form';
import RenderDemo from '/@/views/demo/form/BasicForm/components/RenderDemo/index.vue';
import MFileUploadView from '/@/components/MyselfView/MFileUploadView.vue';
import MImageUploadView from '/@/components/MyselfView/MImageUploadView.vue';
import { AppInfoState } from '/#/store';
import { formatFileSize, updateInfo } from '/@/utils/ConfigCommon';
import { TableData, TableDataTips } from '/@/components/MTable';
import { Popconfirm } from 'ant-design-vue';
import { MOptionsConfig } from '/@/components/MOptions/type';
import MEditTableView from '/@/components/MyselfView/MEditTableView.vue';
import MDialogView from '/@/components/MyselfView/MDialogView.vue';
import { ref, unref } from 'vue';
import { taskList } from '/@/api/task';
import { getLongTask } from '/@/api/task/TopicApi';
import { MPConfirm, MPConfirmConfig } from '/@/components/MPConfirm';
import { DragOutlined } from '@ant-design/icons-vue';

const schemas = (
  flag: Ref<boolean>,
  getTask,
  choseTable: Ref<any[]>,
  initTaskData,
): FormSchema[] => {
  return [
    {
      field: 'divider-demo',
      component: 'Divider',
      label: '基础信息',
    },
    {
      field: 'name',
      label: '专题名称',
      component: 'Input',
      defaultValue: '',
      colProps: {
        span: 5,
      },
      required: true,
    },
    {
      field: 'divider-demo2',
      component: 'Divider',
      label: '内容配置',
    },
    {
      field: 'taskIds',
      component: 'MEDitTable',
      label: '选择任务',
      defaultValue: [],
      required: true,
      render: (scope: any) => {
        const { field, model } = scope;
        console.log(model, field, 'render>>');
        let visible = ref<boolean>(false);

        const onChange = (arr: any) => {
          unref(arr).forEach((item: any) => {
            let isConcat = false;
            unref(choseTable).forEach((v: any) => {
              if (v.id == item.id) {
                isConcat = true;
              }
            });
            if (!isConcat) {
              choseTable.value = unref(choseTable).concat([item]);
            }
          });
          const taskIds = unref(choseTable).map((item: any) => item.id);
          model[field] = taskIds;
        };
        const delItem = (row) => {
          console.log(row, 'row');
          let delIndex = unref(choseTable).indexOf(row);
          unref(choseTable).splice(delIndex, 1);
          choseTable.value = JSON.parse(JSON.stringify(unref(choseTable)));
          console.log(unref(choseTable), 'delItem>>', delIndex);
          const taskIds = unref(choseTable).map((item: any) => item.id);
          model[field] = taskIds;
        };
        return (
          <div>
            <MEditTableView
              tableTitle={tableTitle(delItem)}
              optionArr={options as any}
              doSomeTing={() => {
                visible.value = true;
              }}
              getTableData={getTask}
              tableDataValue={unref(choseTable)}
            />
            <MDialogView
              visible={visible}
              tableTitle={dialogTableTitle}
              schemas={dialogSchemas}
              title={'选择任务'}
              tableData={initTaskData}
              onChange={onChange}
            />
          </div>
        );
      },
    },
  ];
};

export const dialogSchemas = (): FormSchema[] => {
  return [
    {
      label: '应用名称',
      component: 'Input',
      field: 'name',
      colProps: {
        span: 8,
      },
    },
    {
      label: '任务名称',
      component: 'Input',
      field: 'taskName',
      colProps: {
        span: 8,
      },
    },
  ];
};

export const options: MOptionsConfig[] = [
  {
    title: '选择任务',
    type: 'button',
    emitType: 'add',
    btnConfig: {
      type: 'primary',
    },
  },
];
export const dialogTableTitle = (delItem, editItem): TableData[] => {
  return [
    {
      title: '全选',
      type: 'checkbox',
    },
    {
      title: '应用名称',
      field: 'applicationName',
    },
    {
      title: '任务名称',
      field: 'name',
    },
    {
      title: '参与人数',
      field: 'joinMembers',
    },
    {
      title: '人数限制',
      field: 'limitMax',
    },
    {
      title: '总赏金',
      field: 'totalReward',
    },
    {
      title: '有效期',
      field: 'validateTime',
      render: (scope) => {
        const { row } = scope;
        const date = row.validateStart + '~' + row.validateEnd;
        return row.validateType === 0 ? '不限制' : date ? <TableDataTips text={date} /> : '-';
      },
    },
  ];
};
export const tableTitle = (delItem): TableData[] => {
  return [
    {
      title: '应用名称',
      field: 'applicationName',
    },
    {
      title: '任务名称',
      field: 'name',
    },
    {
      title: '参与人数',
      field: 'joinMembers',
    },
    {
      title: '人数限制',
      field: 'limitMax',
    },
    {
      title: '总赏金',
      field: 'totalReward',
    },
    {
      title: '有效期',
      field: 'validateTime',
      render: (scope) => {
        const { row } = scope;
        const date = row.validateStart + '~' + row.validateEnd;
        return row.validateType === 0 ? '不限制' : date ? <TableDataTips text={date} /> : '-';
      },
    },
    {
      title: '操作',
      width: 150,
      render: (scope) => {
        const { row, rowIndex } = scope;
        const options: MPConfirmConfig[] = [
          // {
          //   title: '编辑',
          //   onClick: () => {
          //     editItem(row);
          //   },
          // },
          {
            title: '移除',
            btnConfig: {
              danger: true,
            },
            confirmConfig: {
              title: '确定移除吗？',
            },
            onConfirm: () => {
              delItem(row);
            },
          },
        ];

        return <MPConfirm options={options} showDragBtn={true} />;
      },
    },
  ];
};

export { schemas };
