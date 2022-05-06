import type { Ref } from 'vue';
import { FormSchema } from '/@/components/Form';
import RenderDemo from '/@/views/demo/form/BasicForm/components/RenderDemo/index.vue';
import MFileUploadView from '/@/components/MyselfView/MFileUploadView.vue';
import MImageUploadView from '/@/components/MyselfView/MImageUploadView.vue';
import { AppInfoState } from '/#/store';
import { updateInfo } from '/@/utils/ConfigCommon';

const schemas = (flag: Ref<string>): FormSchema[] => {
  return [
    {
      field: 'type',
      label: '广告类型',
      component: 'RadioGroup',
      defaultValue: '1',
      componentProps: ({ formModel, formActionType }) => {
        return {
          options: [
            {
              label: '自定义',
              value: '1',
            },
            {
              label: '媒体广告',
              value: '2',
            },
          ],
          onChange: (value) => {
            const { updateSchema } = formActionType;
            updateInfo('type', value.target.value, updateSchema);
            flag.value = value.target.value;
          },
        };
      },
      colProps: {
        span: 6,
      },
    },
    ...(() => {
      let list: FormSchema[] = [];
      if (flag.value == '1') {
        list = list.concat(diyData, []);
      } else {
        list = list.concat(mediaData, []);
      }
      return list;
    })(),
  ];
};
const mediaData: FormSchema[] = [
  {
    field: 'mediaType',
    component: 'Select',
    label: '媒体广告',
    required: true,
    colProps: {
      span: 5,
    },
    defaultValue: 'chuanshanjia',
    componentProps: {
      options: [
        {
          label: '穿山甲',
          value: 'chuanshanjia',
        },
        {
          label: '优量汇',
          value: 'youlianghui',
        },
      ],
    },
  },
];
const diyData: FormSchema[] = [
  {
    field: 'image',
    component: 'UploadImage',
    defaultValue: '',
    label: '广告图片',
    required: true,
    render: (scope: any) => {
      const { field, model } = scope;
      return (
        <MImageUploadView
          limit={6}
          onChange={(value: any) => {
            console.log(value);
            model[field] = value;
          }}
        />
      );
    },
  },
  {
    field: 'url',
    label: '跳转链接',
    component: 'Input',
    defaultValue: '',
    required: true,
    colProps: {
      span: 5,
    },
  },
];

export { schemas };
