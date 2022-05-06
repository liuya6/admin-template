<template>
  <upload
    v-model:file-list="fileList"
    name="file"
    :accept="accept"
    :multiple="multiple"
    :customRequest="customRequest"
    :remove="handleRemove"
    @change="handleChange"
  >
    <a-button>
      <upload-outlined />
      点击上传
    </a-button>
  </upload>
</template>
<script lang="ts">
  import { message, Upload } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { defineComponent, unref, watch } from 'vue';
  import {
    docxToHtml,
    FileBean,
    fileRemove,
    fileUpload,
    formatFileBeanList,
  } from '/@/components/MyselfView/UploadControl';

  export default defineComponent({
    name: 'MFileUploadView',
    components: {
      UploadOutlined,
      Upload,
    },
    props: {
      accept: {
        type: String,
        default: '.apk',
      },
      defaultValue: {
        type: String,
        default: '',
      },
      multiple: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      let fileList: any = formatFileBeanList(props).fileList;
      watch(
        () => unref(props.defaultValue),
        () => {
          fileList.value = unref(formatFileBeanList(props).fileList);
        },
      );
      const handleChange = () => {
        if (fileList.value.length > 0 && fileList.value[0].status == 'uploading') {
          fileList.value = [fileList.value[0]];
        }
      };

      //移除监听
      const handleRemove = (file: any) => {
        fileRemove(file, emit, fileBeanList);
      };

      let fileBeanList: FileBean[] = [];
      //自定义上传
      const customRequest = async (value: any) => {
        if (fileList.value.length > 0 && fileList.value[0].status == 'uploading') {
          message.error('文件正在上传中，请勿再上传');
          return;
        }
        if (props.accept == '.docx') {
          //doc文件 转成 html
          const reader = new FileReader();
          reader.onload = async (loadEvent: any) => {
            value.file = await docxToHtml(value, loadEvent);
            await fileUpload(value, emit, fileBeanList, fileList, props.accept);
          };
          reader.readAsArrayBuffer(value.file);
        } else {
          await fileUpload(value, emit, fileBeanList, fileList, props.accept);
        }
      };
      return {
        handleChange,
        handleRemove,
        customRequest, //自定义上传
        fileList,
      };
    },
  });
</script>
