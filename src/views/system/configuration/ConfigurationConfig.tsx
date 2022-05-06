import type { Ref } from 'vue';
import { FormSchema } from '/@/components/Form';
import RenderDemo from '/@/views/demo/form/BasicForm/components/RenderDemo/index.vue';
import MFileUploadView from '/@/components/MyselfView/MFileUploadView.vue';
import MImageUploadView from '/@/components/MyselfView/MImageUploadView.vue';
import { AppInfoState } from '/#/store';
import { formatFileSize, updateInfo } from '/@/utils/ConfigCommon';
import WithdrawView from '/@/views/system/configuration/WithdrawView.vue';

const schemas = (flag: Ref<boolean>, data: any): FormSchema[] => {
  return [
    {
      field: 'divider-demo',
      component: 'Divider',
      label: '协议配置',
    },
    {
      field: 'useAgreement',
      component: 'UploadFile',
      label: '用户协议',
      required: true,
      defaultValue: data.useAgreement ?? '',
      componentProps: ({ formModel, formActionType }) => {
        return {
          defaultValue: data.useAgreement ?? '',
          accept: '.docx',
          onChange: (value: any, apkInfo: any, file: any) => {
            console.log(value, 'apkInfo>', apkInfo);
            const { updateSchema } = formActionType;
            updateInfo('useAgreement', value, updateSchema);
          },
        };
      },
    },
    {
      field: 'privacy',
      component: 'UploadFile',
      label: '隐私政策',
      required: true,
      defaultValue: data.privacy ?? '',
      componentProps: ({ formModel, formActionType }) => {
        return {
          defaultValue: data.privacy ?? '',
          accept: '.docx',
          onChange: (value: any, apkInfo: any, file: any) => {
            const { updateSchema } = formActionType;
            console.log(value, 'value');
            updateInfo('privacy', value, updateSchema);
          },
        };
      },
    },
    {
      field: 'divider-demo2',
      component: 'Divider',
      helpMessage: '观看广告数不填则不限制',
      label: '提现档位配置',
    },
    {
      label: '档位设置',
      field: 'cashGearForms',
      component: 'Render',
      colProps: {
        span: 24,
      },
      render: (scope) => {
        const { field, model } = scope;
        console.log('scope', scope);
        return (
          <WithdrawView
            options={data.cashGears}
            onChange={(data: any) => {
              console.log(data);
              model[field] = data;
            }}
          />
        );
      },
    },
    {
      field: 'cashInstruction',
      label: '提现说明',
      required: true,
      component: 'InputTextArea',
      defaultValue: data.cashInstruction ?? '',
      colProps: {
        span: 5,
      },
    },
  ];
};

export { schemas };
