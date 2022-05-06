import { FormSchema } from '/@/components/Form';
import ModelTaskList from './components/ModelTaskList/index.vue';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '组名称',
      field: 'name',
      component: 'Input',
      colProps: {
        span: 5,
      },
      required: true,
    },

    {
      label: '添加任务',
      field: 'taskIds',
      component: 'Render',
      colProps: {
        span: 24,
      },
      required: true,
      render: (scope: any) => {
        const { field, model } = scope;
        return (
          <ModelTaskList
            onChange={(value: any) => {
              model[field] = value.map((item: any) => item.id);
            }}
          />
        );
      },
    },
  ];
};

export { schemas };
