<script lang="tsx">
  import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
  import { Button, ButtonProps, message } from 'ant-design-vue';

  import { BasicForm, FormActionType } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { schemas } from './ConfigurationConfig';
  import { useGo, useRedo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouter } from 'vue-router';
  import { t, useI18n } from '/@/hooks/web/useI18n';
  import { addAppInfo } from '/@/api/app/AppApi';
  import { Message } from 'postcss';
  import { appListStateStoreWithOut, useAppListStateStore } from '/@/store/modules/AppListStore';
  import { AppInfoState } from '/#/store';
  import { getSysConfig, setSysConfig } from '/@/api/sys/SysSetting';

  //提现
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
      const info: any = ref({});
      onMounted(async () => {
        let value = await getSysConfig();
        if (value == null || !value.success) {
          return;
        }
        info.value = value.result;
        console.log(info.value, 'info');
      });
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
        let value = await setSysConfig(params);
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
