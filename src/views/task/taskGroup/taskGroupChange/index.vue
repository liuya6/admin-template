<script lang="tsx">
  import { computed, defineComponent, nextTick, onMounted } from 'vue';
  import { useRoute } from 'vue-router';

  import { BasicForm, useForm } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';

  import { schemas } from './config';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useEditCacheStore } from '/@/store/modules/editCache';
  import { TaskService } from '/@/api';

  export default defineComponent({
    setup() {
      const { createMessage } = useMessage();
      const route = useRoute();
      const editCache = useEditCacheStore();

      const isEdit = computed(() => {
        return route.name === 'TaskGroupEdit';
      });

      const [register, { setFieldsValue }] = useForm({
        labelWidth: 100,
        actionColOptions: {
          span: 24,
        },
        submitButtonOptions: {
          text: '提交',
        },
        showResetButton: false,
        fieldMapToTime: [['fieldTime', ['validateStart', 'validateEnd'], 'YYYY-MM-DD HH:mm:ss']],
      });

      onMounted(() => {
        if (route.name === 'TaskGroupEdit') {
          nextTick(() => {
            setFieldsValue(editCache.taskGroupEdit);
          });
        }
      });

      return () => (
        <PageWrapper>
          <CollapseContainer title={route.name === 'TaskGroupEdit' ? '编辑任务组' : '新增任务组'}>
            <BasicForm onRegister={register} schemas={schemas()} onSubmit={handleSubmit} />
          </CollapseContainer>
        </PageWrapper>
      );

      async function handleSubmit(params: any) {
        try {
          let fn = TaskService.taskGroupAdd;

          if (isEdit.value) {
            params.groupId = editCache.taskGroupEdit.id;
            fn = TaskService.taskGroupEdit;
          }

          const data = await fn(params);
          if (data.success) {
            createMessage.success(data.message);
          }
        } catch (e) {
          console.warn(e);
        }
      }
    },
  });
</script>

<style scoped lang="less"></style>
