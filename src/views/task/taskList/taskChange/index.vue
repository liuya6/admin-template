<script lang="tsx">
  import { defineComponent, nextTick, onMounted, ref, computed } from 'vue';
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

      const showPeriod = ref(null);
      const rewardActionType = ref(null);
      const additional = ref(null);

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

      const isEdit = computed(() => {
        return route.name === 'TaskEdit';
      });

      onMounted(() => {
        if (isEdit.value && editCache.taskEdit) {
          showPeriod.value = editCache.taskEdit.validateType;
          rewardActionType.value = editCache.taskEdit.rewardActionType;
          additional.value = editCache.taskEdit.additionalSwitch;
          nextTick(() => {
            editCache.taskEdit.tags =
              typeof editCache.taskEdit.tags === 'string'
                ? editCache.taskEdit.tags.split(',')
                : editCache.taskEdit.tags;
            editCache.taskEdit.groupIds = editCache.taskEdit.taskGroups.map((item: any) => item.id);
            setFieldsValue(editCache.taskEdit);
          });
        }
      });

      return () => (
        <PageWrapper>
          <CollapseContainer title={isEdit.value ? '编辑任务' : '新增任务'}>
            <BasicForm
              onRegister={register}
              schemas={schemas(isEdit, showPeriod, rewardActionType, additional)}
              onSubmit={handleSubmit}
            />
          </CollapseContainer>
        </PageWrapper>
      );

      async function handleSubmit(params: any) {
        params.tags = params.tags.join(',');
        try {
          let fn = TaskService.taskAdd;
          if (isEdit.value) {
            fn = TaskService.taskEdit;
            params.taskId = editCache.taskEdit.id;
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
