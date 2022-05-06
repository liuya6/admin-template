import { FormSchema } from '/@/components/Form';
import { getSelectList } from '/@/api/sys/table';

import type { Ref } from 'vue';

const schemas = (flag: Ref<boolean>): FormSchema[] => {
  return [
    {
      field: 'cs',
      label: '测试1',
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
        span: 5,
      },
    },
    {
      field: 'cs3',
      label: '测试3',
      component: 'Input',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'cs4',
      label: '测试4',
      component: 'Input',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'cs5',
      label: '测试5',
      component: 'Input',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'cs6',
      label: '测试6',
      component: 'Input',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'cs7',
      label: '测试7',
      component: 'ApiSelect',
      colProps: {
        span: 5,
      },
      componentProps: {
        // more details see /src/components/Form/src/components/ApiSelect.vue
        api: getSelectList,
        // 请求的参数
        params: {
          id: 1,
        },
        resultField: 'result',
        // 使用名称作为标签
        labelField: 'name',
        // 使用 id 作为值
        valueField: 'id',
        // 出书不请求 选择才请求
        immediate: false,
        onChange: (e) => {
          console.log('selected:', e);
        },
        // 请求获取options后 回调
        onOptionsChange: (options) => {
          console.log('get options', options.length, options);
        },
      },
    },
  ];
};

export { schemas };
