<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { Button } from 'ant-design-vue';

  import { BasicForm, useForm } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';

  import { schemas } from './config';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { SystemService } from '/@/api';

  export default defineComponent({
    components: { Button },
    setup() {
      const [registerForm, { setFieldsValue }] = useForm({
        actionColOptions: { span: 24 },
        labelWidth: 180,
        autoSubmitOnEnter: true,
        submitButtonOptions: {
          text: '提交',
        },
        showResetButton: false,
      });

      const ipConfig = ref(null);

      getConfig();

      const { createMessage } = useMessage();

      return () => (
        <PageWrapper>
          <CollapseContainer title="注册限制">
            <BasicForm onRegister={registerForm} schemas={schemas()} onSubmit={handleSubmit} />
          </CollapseContainer>
        </PageWrapper>
      );

      async function getConfig() {
        const { result } = await SystemService.getIpLimitConfig();
        ipConfig.value = result;
        await setFieldsValue(result);
      }

      async function handleSubmit(params: any) {
        try {
          const data = await SystemService.setIpLimitConfig(params);
          if (data.success) {
            createMessage.success(data.message);
            await getConfig();
          }
        } catch (e) {
          console.warn(e);
        }
      }
    },
  });
</script>

<style scoped lang="less"></style>
