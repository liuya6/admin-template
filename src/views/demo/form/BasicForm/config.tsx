import type { Ref } from 'vue';
import { FormSchema } from '/@/components/Form';

import RenderDemo from './components/RenderDemo/index.vue';

const provincesOptions = [
  {
    id: 'guangdong',
    label: '广东省',
    value: '1',
    key: '1',
  },
  {
    id: 'jiangsu',
    label: '江苏省',
    value: '2',
    key: '2',
  },
];
const citiesOptionsData = {
  guangdong: [
    {
      label: '珠海市',
      value: '1',
      key: '1',
    },
    {
      label: '深圳市',
      value: '2',
      key: '2',
    },
    {
      label: '广州市',
      value: '3',
      key: '3',
    },
  ],
  jiangsu: [
    {
      label: '南京市',
      value: '1',
      key: '1',
    },
    {
      label: '无锡市',
      value: '2',
      key: '2',
    },
    {
      label: '苏州市',
      value: '3',
      key: '3',
    },
  ],
};

const schemas = (flag: Ref<boolean>): FormSchema[] => {
  return [
    {
      field: 'divider-demo',
      component: 'Divider',
      label: '头部描述',
    },
    {
      field: 'cs',
      label: '测试',
      component: 'Input',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'radio',
      label: '测试2',
      component: 'RadioGroup',
      componentProps: () => {
        return {
          options: [
            {
              label: '选项1',
              value: '1',
            },
            {
              label: '选项2',
              value: '2',
            },
          ],
          onChange: (value) => {
            console.log(value);
            flag.value = !flag.value;
          },
        };
      },
      colProps: {
        span: 6,
      },
    },
    ...(() => {
      const list: FormSchema[] = [];
      if (flag.value) {
        list.push({
          field: 'cs3',
          label: '测试3',
          component: 'Input',
          colProps: {
            span: 5,
          },
          required: true,
        });
      }
      return list;
    })(),
    {
      field: 'cs4',
      component: 'Input',
      label: '测试4后缀',
      defaultValue: '111',
      colProps: {
        span: 5,
      },
      componentProps: {
        onChange: (e: any) => {
          console.log(e);
        },
      },
      suffix: '天',
    },
    {
      field: 'cs5',
      component: 'Switch',
      label: '测试5',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'cs6',
      component: 'RadioButtonGroup',
      label: '测试6',
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
      },
    },

    {
      field: 'divider-demo2',
      component: 'Divider',
      label: '头部描述2',
    },

    {
      field: 'cs7',
      component: 'Select',
      label: '测试7',
      helpMessage: ['测试7', 'Select', '下拉框'],
      required: true,
      colProps: {
        span: 5,
      },
      defaultValue: '1',
      componentProps: {
        options: [
          {
            label: '测试1',
            value: '1',
          },
          {
            label: '测试1',
            value: '2',
          },
        ],
      },
    },

    {
      field: 'divider-linkage',
      component: 'Divider',
      label: '联动',
    },

    {
      field: 'province',
      component: 'Select',
      label: '省份',
      colProps: {
        span: 5,
      },
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: provincesOptions,
          placeholder: '省份与城市联动',
          onChange: (e: any) => {
            let citiesOptions =
              e == 1
                ? citiesOptionsData[provincesOptions[0].id]
                : citiesOptionsData[provincesOptions[1].id];
            // console.log(citiesOptions)
            if (e === undefined) {
              citiesOptions = [];
            }
            formModel.city = undefined; //  reset city value
            const { updateSchema } = formActionType;
            updateSchema({
              field: 'city',
              componentProps: {
                options: citiesOptions,
              },
            });
          },
        };
      },
    },
    {
      field: 'city',
      component: 'Select',
      label: '城市',
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [], // default []
        placeholder: '省份与城市联动',
      },
    },
    {
      field: 'divider-render',
      component: 'Divider',
      label: 'render',
    },
    {
      field: 'cs8',
      label: '测试8',
      component: 'Render',
      render: (scope: any) => {
        const { field, model } = scope;
        return (
          <RenderDemo
            onChange={(value: number) => {
              model[field] = value;
            }}
          />
        );
      },
    },
  ];
};

export { schemas };
