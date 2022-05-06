<script lang="tsx">
  import { defineComponent, onMounted, ref, unref } from 'vue';
  import { Button, Modal } from 'ant-design-vue';
  import { useTable } from '/@/hooks/component/useTable';
  import { getAppInfoList } from '/@/api/app/AppApi';
  import { MTable } from '/@/components/MTable';
  import { useGo } from '/@/hooks/web/usePage';
  import { schemas } from '/@/views/task/taskTopic/long/LongTaskConfig';
  import BasicForm from '/@/components/Form/src/BasicForm.vue';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';

  export default defineComponent({
    components: { PageWrapper, BasicForm, Modal },
    props: {
      visible: {
        type: Object,
        default: ref<boolean>(false),
      },
      title: {
        type: String,
        default: '',
      },
      schemas: {
        type: Object,
        default: () => {},
      },
    },
    emits: ['submit'],
    setup(prop, { emit }) {
      const actionColOptions = { span: 24 };

      const onCancel = (e: MouseEvent) => {
        prop.visible.value = false;
      };
      const submitBtn: any = { text: '提交' };
      return () => (
        <Modal
          width={800}
          title={prop.title}
          onCancel={onCancel}
          visible={prop.visible.value}
          footer={null}
        >
          <PageWrapper>
            <BasicForm
              actionColOptions={actionColOptions}
              labelWidth={100}
              schemas={prop.schemas as any}
              onSubmit={handleSubmit}
              showResetButton={false}
              submitButtonOptions={submitBtn}
            />
          </PageWrapper>
        </Modal>
      );

      function handleSubmit(params) {
        prop.visible.value = false;
        console.log(params, 'handleSubmit');
        emit('submit', params); //选择一个表格条目然后刷新数据给编辑的表格
      }
    },
  });
</script>
