import type { Ref } from 'vue';
import { FormSchema } from '/@/components/Form';
import RenderDemo from '/@/views/demo/form/BasicForm/components/RenderDemo/index.vue';
import MFileUploadView from '/@/components/MyselfView/MFileUploadView.vue';
import MImageUploadView from '/@/components/MyselfView/MImageUploadView.vue';
import { AppInfoState } from '/#/store';
import { formatFileSize, updateInfo } from '/@/utils/ConfigCommon';

const schemas = (flag: Ref<boolean>, data: AppInfoState): FormSchema[] => {
  return [
    {
      field: 'divider-demo',
      component: 'Divider',
      label: '基础信息',
    },
    {
      field: 'name',
      label: '应用名称',
      component: 'Input',
      defaultValue: data.name ?? '',
      colProps: {
        span: 5,
      },
      required: true,
    },
    {
      field: 'type',
      label: '类型',
      component: 'Input',
      defaultValue: data.type ?? '',
      colProps: {
        span: 5,
      },
      required: true,
    },
    {
      field: 'logo',
      component: 'UploadImage',
      label: '应用图标',
      defaultValue: data.logo ?? '',
      required: true,
      render: (scope: any) => {
        const { field, model } = scope;
        return (
          <MImageUploadView
            defaultValue={data.logo ?? ''}
            onChange={(value: any) => {
              model[field] = value;
            }}
          />
        );
      },
    },
    {
      field: 'spreadImage',
      component: 'UploadImage',
      label: '应用宣传图',
      defaultValue: data.spreadImage ?? '',
      required: true,
      render: (scope: any) => {
        const { field, model } = scope;
        return (
          <MImageUploadView
            limit={6}
            defaultValue={data.spreadImage ?? ''}
            onChange={(value: any) => {
              console.log(value);
              model[field] = value;
            }}
          />
        );
      },
    },
    {
      field: 'tag',
      label: '标签',
      component: 'Input',
      defaultValue: data.tag ?? '',
      required: true,
      colProps: {
        span: 5,
      },
    },
    {
      field: 'url',
      component: 'UploadFile',
      label: 'apk',
      required: true,
      defaultValue: data.url ?? '',
      componentProps: ({ formModel, formActionType }) => {
        return {
          defaultValue: data.url ?? '',
          onChange: (value: any, apkInfo: any, file: any) => {
            console.log(value, 'apkInfo>', apkInfo);
            const { updateSchema } = formActionType;
            if (apkInfo == null) {
              updateInfo('fileSize', '', updateSchema);
              updateInfo('url', '', updateSchema);
              updateInfo('packageName', '', updateSchema);
              updateInfo('versionNo', '', updateSchema);
              updateInfo('name', '', updateSchema);
              return;
            }
            //更新当前组件的value
            updateInfo('url', value, updateSchema);
            updateInfo('fileSize', formatFileSize(file.size), updateSchema);
            updateInfo('packageName', apkInfo.package, updateSchema);
            updateInfo('versionNo', apkInfo.versionCode, updateSchema);
            updateInfo('name', apkInfo.application.label.toString(), updateSchema);
          },
        };
      },
    },
    {
      field: 'versionNo',
      label: '版本号',
      required: true,
      component: 'Input',
      defaultValue: data.versionNo ?? '',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'packageName',
      label: '包名',
      required: true,
      component: 'Input',
      defaultValue: data.packageName ?? '',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'fileSize',
      label: '应用大小',
      required: true,
      component: 'Input',
      defaultValue: data.fileSize ?? '',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'remark',
      label: '备注',
      required: true,
      component: 'InputTextArea',
      defaultValue: data.remark ?? '',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'divider-demo2',
      component: 'Divider',
      label: '公司信息',
    },

    {
      field: 'connecter',
      label: '联系人',
      required: true,
      component: 'Input',
      defaultValue: data.connecter ?? '',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'mobile',
      label: '联系电话',
      required: true,
      component: 'Input',
      defaultValue: data.mobile ?? '',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'company',
      label: '公司名称',
      required: true,
      component: 'Input',
      defaultValue: data.company ?? '',
      colProps: {
        span: 5,
      },
    },
  ];
};

export { schemas };
