import type { Ref } from 'vue';
import { FormSchema } from '/@/components/Form';
import VideoAward from './components/VideoAward/index.vue';
import moment from 'moment';

const schemas = (dailyConfig: Ref, durationSwitch: Ref, numsSwitch: Ref): FormSchema[] => {
  return [
    {
      label: '基础信息',
      field: 'divider-basis',
      component: 'Divider',
    },
    {
      label: '重置时间',
      field: 'resetTime',
      component: 'TimePicker',
      required: true,
      defaultValue: dailyConfig.value
        ? (function () {
            const resetTime = dailyConfig.value.resetTime;
            const mDate = `2000/01/01 ${resetTime}`;
            return moment(new Date(mDate));
          })()
        : '',
      colProps: {
        span: 8,
      },
      componentProps: {
        format: 'HH:mm:ss',
      },
      helpMessage: ['每日根据设置的时间重置时长'],
    },

    {
      label: '每日观看视频累计时长奖励',
      field: 'divider-dayAward',
      component: 'Divider',
    },

    {
      label: '状态',
      field: 'durationSwitch',
      component: 'Switch',
      defaultValue: durationSwitch.value,
      helpMessage: ['至少有三项'],
      required: true,
      componentProps: {
        onChange: (value: boolean) => {
          durationSwitch.value = value;
        },
      },
    },

    {
      label: '累计时长奖励设置',
      field: 'dailyDurations',
      component: 'Render',
      labelWidth: 160,
      colProps: {
        span: 24,
      },
      required: true,
      ifShow: durationSwitch.value,
      render: (scope) => {
        const { field, model } = scope;
        const list: any = [];
        if (
          dailyConfig.value &&
          dailyConfig.value.taskDailyDurations &&
          dailyConfig.value.taskDailyDurations.length
        ) {
          dailyConfig.value.taskDailyDurations.forEach((item: any) => {
            list.push({
              duration: item.duration,
              reward: item.reward,
            });
          });
        }
        return (
          <VideoAward
            defaultValue={list}
            onChange={(data: any) => {
              console.log(data);
              model[field] = data;
            }}
          />
        );
      },
    },

    {
      label: '每日观看视频数量',
      field: 'divider-dayNumAward',
      component: 'Divider',
    },
    {
      label: '状态',
      field: 'numsSwitch',
      component: 'Switch',
      helpMessage: ['至少有三项'],
      defaultValue: numsSwitch.value,
      required: true,
      componentProps: {
        onChange: (value: boolean) => {
          numsSwitch.value = value;
        },
      },
    },
    {
      label: '观看数量奖励设置',
      field: 'dailyNums',
      component: 'Render',
      labelWidth: 160,
      colProps: {
        span: 24,
      },
      required: true,
      ifShow: numsSwitch.value,
      render: (scope) => {
        const { field, model } = scope;
        const paramsObj = {
          nums: '',
          reward: '',
        };
        const list: any = [];
        if (
          dailyConfig.value &&
          dailyConfig.value.taskDailyNums &&
          dailyConfig.value.taskDailyNums.length
        ) {
          dailyConfig.value.taskDailyNums.forEach((item: any) => {
            list.push({
              nums: item.nums,
              reward: item.reward,
            });
          });
        }
        return (
          <VideoAward
            defaultValue={list}
            text="个视频，"
            params={paramsObj}
            onChange={(data: any) => {
              model[field] = data;
            }}
          />
        );
      },
    },
  ];
};

export { schemas };
