import type { Ref } from 'vue';
import moment from 'moment';

import { FormSchema } from '/@/components/Form';
import TaskRequest from './components/TaskRequest/index.vue';
import TaskAward from './components/TaskAward/index.vue';
import { useEditCacheStoreWithOut } from '/@/store/modules/editCache';

const editCache = useEditCacheStoreWithOut();

import { TaskService, AppService } from '/@/api';

const taskGroupList = async () => {
  const list: any = [];
  const { result } = await TaskService.taskGroupList({});
  result.data.forEach((item: any) => {
    list.push({
      label: item.name,
      value: item.id,
    });
  });
  return list;
};

const appList = async () => {
  const list: any = [];
  const { result } = await AppService.getAppInfoList({});
  result.data.forEach((item: any) => {
    list.push({
      label: item.name,
      value: item.id,
    });
  });
  return list;
};

const schemas = (
  isEdit: Ref<boolean>,
  showPeriod: Ref,
  rewardActionType: Ref,
  additional: Ref,
): FormSchema[] => {
  return [
    {
      label: '基础信息',
      component: 'Divider',
      field: 'divider-base',
    },

    {
      label: '任务名称',
      field: 'name',
      component: 'Input',
      colProps: {
        span: 5,
      },
      required: true,
    },

    {
      label: '选择应用',
      field: 'applicationId',
      component: 'ApiSelect',
      colProps: {
        span: 6,
      },
      componentProps: {
        api: appList,
      },
      required: true,
    },

    {
      label: '任务组',
      field: 'groupIds',
      component: 'ApiSelect',
      componentProps: {
        mode: 'multiple',
        api: taskGroupList,
      },
      colProps: {
        span: 6,
      },
      // required: true,
    },

    {
      label: '有效期',
      field: 'validateType',
      component: 'RadioGroup',
      colProps: {
        span: 6,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '不限制',
            value: 0,
          },
          {
            label: '时间段',
            value: 1,
          },
        ],
        onChange: (data: any) => {
          showPeriod.value = data.target.value;
        },
      },
    },

    {
      label: '时间段选择',
      field: 'fieldTime',
      component: 'RangePicker',
      ifShow: showPeriod.value === 1,
      defaultValue: (function () {
        if (
          isEdit.value &&
          editCache.taskEdit &&
          editCache.taskEdit.validateStart &&
          editCache.taskEdit.validateEnd
        ) {
          return [
            moment(new Date(editCache.taskEdit.validateStart)),
            moment(new Date(editCache.taskEdit.validateEnd)),
          ];
        }
        return null;
      })(),
      colProps: {
        span: 10,
      },
      componentProps: {
        showTime: true,
      },
    },

    {
      label: '人数限制',
      field: 'limitMax',
      component: 'InputNumber',
      colProps: {
        span: 5,
      },
      required: true,
    },

    {
      label: '标签',
      field: 'tags',
      component: 'Select',
      colProps: {
        span: 6,
      },
      componentProps: {
        mode: 'tags',
      },
      required: true,
    },

    {
      label: '奖励信息',
      component: 'Divider',
      field: 'divider-award',
    },

    {
      label: '奖励类型',
      field: 'rewardType',
      component: 'RadioGroup',
      colProps: {
        span: 24,
      },
      required: true,
      componentProps: {
        options: [
          {
            label: '短期',
            value: 1,
          },
          {
            label: '长期',
            value: 2,
          },
        ],
        onChange: (data: any) => {
          rewardActionType.value = data.target.value;
        },
      },
    },

    {
      label: '行为',
      field: 'rewardActionType',
      component: 'Select',
      defaultValue: 1,
      ifShow: rewardActionType.value === 1,
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '注册',
            value: 1,
          },
        ],
      },
    },

    {
      label: '奖励',
      field: 'rewardAmount',
      component: 'Input',
      ifShow: rewardActionType.value === 1,
      colProps: {
        span: 8,
      },
      suffix: '元',
      required: true,
    },

    {
      label: '附加条件',
      field: 'additionalSwitch',
      component: 'RadioGroup',
      ifShow: rewardActionType.value === 1,
      defaultValue: 0,
      colProps: {
        span: 24,
      },
      componentProps: {
        options: [
          {
            label: '关闭',
            value: 0,
          },
          {
            label: '开启',
            value: 1,
          },
        ],
        onChange: (value) => {
          additional.value = value.target.value;
        },
      },
    },

    {
      label: '行为',
      field: 'additionalActionType',
      component: 'Select',
      ifShow: additional.value === 1,
      colProps: {
        span: 8,
      },
      defaultValue: 2,
      componentProps: {
        options: [
          {
            label: '在线',
            value: 2,
          },
        ],
      },
    },

    {
      label: '时长',
      field: 'duration',
      component: 'Input',
      ifShow: additional.value === 1,
      colProps: {
        span: 8,
      },
      required: true,
      suffix: '分钟',
    },

    {
      label: '添加奖励',
      field: 'taskReWard',
      component: 'Render',
      ifShow: rewardActionType.value === 2,
      colProps: {
        span: 24,
      },
      required: true,
      render: (scope: any) => {
        const { field, model } = scope;
        return (
          <TaskAward
            onChange={(value: any) => {
              const list: any = [];
              value.forEach((item: any) => {
                const { _X_ROW_KEY, ...other } = item;
                list.push(other);
              });
              model[field] = list;
            }}
          />
        );
      },
    },

    {
      label: '任务要求',
      field: 'taskRequirement',
      component: 'Render',
      colProps: {
        span: 24,
      },
      required: true,
      ifShow: rewardActionType.value === 1,
      render: (scope: any) => {
        const { field, model } = scope;
        // console.log(editCache.taskEdit, '??????????');
        return (
          <TaskRequest
            onChange={(value) => {
              model[field] = value;
            }}
          />
        );
      },
    },
  ];
};

export { schemas };
