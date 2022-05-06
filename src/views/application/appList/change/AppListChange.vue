<script lang="tsx">
  import { computed, defineComponent, PropType, ref } from 'vue';
  import { Button, ButtonProps, message } from 'ant-design-vue';

  import { BasicForm, FormActionType } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { schemas } from '/@/views/application/appList/change/AppListChangeConfig';
  import { useGo, useRedo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouter } from 'vue-router';
  import { t, useI18n } from '/@/hooks/web/useI18n';
  import { addAppInfo } from '/@/api/app/AppApi';
  import { Message } from 'postcss';
  import { appListStateStoreWithOut, useAppListStateStore } from '/@/store/modules/AppListStore';
  import { AppInfoState } from '/#/store';

  export default defineComponent({
    components: { Button },
    setup() {
      const formElRef = ref<Nullable<FormActionType>>(null);
      const flag = ref(false);
      const go = useGo();
      const router = useRouter();
      const { createMessage } = useMessage();
      const submitBtn: any = { text: '提交' };
      const resetBtn: any = { text: '取消' };
      const actionColOptions: any = { span: 24 };
      console.log(router.currentRoute.value.meta.title, 'router.currentRoute');
      const title = useI18n().t(router.currentRoute.value.meta.title);

      const appListStateStore: any = useAppListStateStore();
      const info: any = computed(() => appListStateStore.getState);
      console.log(info.value, 'info');
      return () => (
        <PageWrapper>
          <CollapseContainer title={title} canExpan={false}>
            <BasicForm
              actionColOptions={actionColOptions}
              labelWidth={100}
              ref={formElRef}
              schemas={schemas(flag, info.value)}
              onSubmit={handleSubmit}
              onReset={cancel}
              submitButtonOptions={submitBtn}
              resetButtonOptions={resetBtn}
            />
          </CollapseContainer>
        </PageWrapper>
      );

      function cancel() {
        router.back();
      }

      async function handleSubmit(params: any) {
        console.log(params, 'handleSubmit》》params');
        let value = await addAppInfo(params);
        if (value == null || !value.success) {
          return;
        }
        message.success(value.message);
        router.back();
      }
    },
  });
</script>

<style scoped lang="less"></style>
