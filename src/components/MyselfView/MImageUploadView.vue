<template>
  <div class="clearfix">
    <upload
      accept="image/*"
      list-type="picture-card"
      v-model:file-list="fileList"
      @preview="handlePreview"
      :customRequest="customRequest"
      :remove="handleRemove"
    >
      <div v-if="fileList.length < limit">
        <plus-outlined />
        <div class="ant-upload-text">上传</div>
      </div>
    </upload>
    <Modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </Modal>
  </div>
</template>
<script lang="ts">
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  import { Modal, Upload } from 'ant-design-vue';
  import { postFile } from '/@/api/sys/SysSetting';
  import {
    FileBean,
    FileItem,
    formatFileBeanList,
    formatFileList,
  } from '/@/components/MyselfView/UploadControl';

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  export default defineComponent({
    name: 'MImageUploadView',
    components: {
      PlusOutlined,
      Upload,
      Modal,
    },
    props: {
      limit: {
        type: Number,
        default: 1,
      },
      defaultValue: {
        type: String,
        default: '',
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const previewVisible = ref<boolean>(false);
      const previewImage = ref<string | undefined>('');
      // const imageList: FileBean[] = [];
      // const fileList = ref<FileItem[]>([]);
      const { imageList, fileList } = formatFileBeanList(props);
      const handleCancel = () => {
        previewVisible.value = false;
      };
      const handlePreview = async (file: FileItem) => {
        if (!file.url && !file.preview) {
          file.preview = (await getBase64(file.originFileObj)) as string;
        }
        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
      };

      const handleRemove = (file: any) => {
        let choseIndex = 0;
        imageList.forEach((item: any, index: any) => {
          if (item.uid == file.uid) {
            choseIndex = index;
          }
        });
        imageList.splice(choseIndex, 1);
        emit('change', formatFileList(imageList));
      };

      //自定义上传数据
      const customRequest = async (value: any) => {
        let url = await postFile(value.file);
        value.onSuccess();
        imageList.push({ url: url, uid: value.uid });
        emit('change', formatFileList(imageList));
      };

      return {
        handleRemove,
        customRequest,
        previewVisible,
        previewImage,
        fileList,
        handleCancel,
        handlePreview,
      };
    },
  });
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
