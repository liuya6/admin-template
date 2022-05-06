import { FormSchema } from '/@/components/Form';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '同一IP注册时间间隔',
      field: 'timeInterval',
      component: 'Input',
      colProps: {
        span: 10,
      },
      helpMessage: ['单位“小时”；同一 IP 在本时间间隔内将只能注册一个帐号，0 为不限制'],
    },
    {
      label: '同一IP24小时注册数',
      field: 'registerNums',
      component: 'Input',
      colProps: {
        span: 10,
      },
      helpMessage: ['同一 IP 地址在 24 小时内尝试注册的次数，0 为不限制'],
    },
  ];
};

export { schemas };
