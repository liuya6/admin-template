import type { Ref } from 'vue';
import { FormSchema } from '/@/components/Form';
import RenderDemo from '/@/views/demo/form/BasicForm/components/RenderDemo/index.vue';
import MFileUploadView from '/@/components/MyselfView/MFileUploadView.vue';
import MImageUploadView from '/@/components/MyselfView/MImageUploadView.vue';
import { AppInfoState } from '/#/store';
import { formatFileSize, updateInfo } from '/@/utils/ConfigCommon';
import { TableData, TableDataTips } from '/@/components/MTable';
import { Popconfirm, Radio, RadioGroup } from 'ant-design-vue';
import { MOptionsConfig } from '/@/components/MOptions/type';
import MEditTableView from '/@/components/MyselfView/MEditTableView.vue';
import MDialogView from '/@/components/MyselfView/MDialogView.vue';
import { ref, unref } from 'vue';
import { getLongTask } from '/@/api/task/TopicApi';
import { MPConfirm, MPConfirmConfig } from '/@/components/MPConfirm';
import { DragOutlined } from '@ant-design/icons-vue';
import { MSwitch } from '/@/components/MSwitch';

const schemas = (
  flag: Ref<String>,
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
      field: 'type',
      component: 'RadioButtonGroup',
      label: '类型',
      defaultValue: '1',
      helpMessage: '固定显示在首页顶部的派发任务，最多添加5个',
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: [
            {
              label: '赏金任务派发',
              value: '1',
            },
            {
              label: '任务组设置',
              value: '2',
            },
          ],
          onChange: (value) => {
            const { updateSchema } = formActionType;
            if (value.target == null) {
              return;
            }
            flag.value = value.target.value;
            updateSchema({
              field: 'type',
              helpMessage:
                flag.value == '1'
                  ? '固定显示在首页顶部的派发任务，最多添加5个'
                  : '添加任务组后，该组任务以标题+任务集合的形式展现首页',
            });
          },
        };
      },
    },
    ...(() => {
      let list: FormSchema[] = [];
      if (flag.value == '1') {
        list = list.concat(taskSchemas(flag, getTask, choseTable, initTaskData), []);
      } else {
        list = list.concat(taskGroupSchemas(flag, getTask, choseTable, initTaskData), []);
      }
      return list;
    })(),
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

export const dialogGroupSchemas = (): FormSchema[] => {
  return [
    {
      label: '任务组',
      component: 'Input',
      field: 'name',
      colProps: {
        span: 8,
      },
    },
  ];
};
const taskGroupSchemas = (
  flag: Ref<String>,
  getTask,
  choseTable: Ref<any[]> = ref([]),
  initTaskData,
): FormSchema[] => {
  return [
    {
      field: 'recommendGroups',
      component: 'MEDitTable',
      label: '选择任务组',
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
          const itemV = unref(choseTable).map((item: any) => {
            return {
              groupId: item.id,
              styleType: item.styleType ?? '1',
            };
          });
          model[field] = itemV;
        };
        const delItem = (row) => {
          console.log(row, 'row');
          let delIndex = unref(choseTable).indexOf(row);
          unref(choseTable).splice(delIndex, 1);
          choseTable.value = JSON.parse(JSON.stringify(unref(choseTable)));
          console.log(unref(choseTable), 'delItem>>', delIndex);
          const itemV = unref(choseTable).map((item: any) => {
            return {
              groupId: item.id,
              styleType: item.styleType ?? '1',
            };
          });
          model[field] = itemV;
        };
        const changeItem = (row) => {
          choseTable.value = JSON.parse(JSON.stringify(unref(choseTable)));
          const itemV = unref(choseTable).map((item: any) => {
            return {
              groupId: item.id,
              styleType: item.styleType ?? '1',
            };
          });
          model[field] = itemV;
        };
        return (
          <div>
            <MEditTableView
              tableTitle={tableGroupTitle(delItem, changeItem)}
              optionArr={optionsGroup as any}
              doSomeTing={() => {
                visible.value = true;
              }}
              getTableData={getTask}
              tableDataValue={unref(choseTable)}
            />
            <MDialogView
              visible={visible}
              tableTitle={dialogGroupTableTitle}
              schemas={dialogGroupSchemas}
              title={'选择任务组'}
              tableData={initTaskData}
              onChange={onChange}
            />
          </div>
        );
      },
    },
  ];
};

const taskSchemas = (
  flag: Ref<String>,
  getTask,
  choseTable: Ref<any[]> = ref([]),
  initTaskData,
): FormSchema[] => {
  return [
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
        choseTable = choseTable ?? ref([]);
        const onChange = (arr: any) => {
          console.log(arr, 'onChange', choseTable, 'onChange');
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
              optionArr={optionsTask as any}
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

export const optionsTask: MOptionsConfig[] = [
  {
    title: '选择任务',
    type: 'button',
    emitType: 'add',
    btnConfig: {
      type: 'primary',
    },
  },
];
export const optionsGroup: MOptionsConfig[] = [
  {
    title: '选择任务组',
    type: 'button',
    emitType: 'add',
    btnConfig: {
      type: 'primary',
    },
  },
];
export const dialogTableTitle = (): TableData[] => {
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

export const dialogGroupTableTitle = (delItem, editItem): TableData[] => {
  return [
    {
      title: '全选',
      type: 'checkbox',
    },
    {
      title: '任务组',
      field: 'name',
    },
    {
      title: '任务数',
      field: 'taskNums',
    },
  ];
};
export const tableGroupTitle = (delItem, changeItem): TableData[] => {
  return [
    {
      title: '任务组',
      field: 'name',
    },
    {
      title: '任务数',
      field: 'taskNums',
    },
    {
      title: '样式',
      field: 'styleType',
      render: (scope) => {
        const { row } = scope;
        console.log(row.styleType, 'styleType');
        return (
          <RadioGroup
            options={radioOptions}
            value={row.styleType ?? '1'}
            defaultValue={row.styleType ?? '1'}
            onChange={(value) => {
              // console.log(value.target.value, 'styleType');
              row.styleType = value.target.value;
              changeItem(row);
            }}
          />
        );
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

export const radioOptions = [
  {
    label: '纵向 ',
    value: 1,
  },
  {
    label: '横向',
    value: 2,
  },
];

export { schemas };
