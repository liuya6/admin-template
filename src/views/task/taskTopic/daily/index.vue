<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { Button } from 'ant-design-vue';

  import { BasicForm, useForm } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';

  import { schemas } from './config';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { TaskService } from '/@/api';

  export default defineComponent({
    components: { Button },
    setup() {
      const [registerForm] = useForm({
        actionColOptions: { span: 24 },
        labelWidth: 120,
        autoSubmitOnEnter: true,
        submitButtonOptions: {
          text: '提交',
        },
        showResetButton: false,
      });
      const dailyConfig = ref(null);
      const durationSwitch = ref(false);
      const numsSwitch = ref(false);

      getConfig();

      const { createMessage } = useMessage();

      return () => (
        <PageWrapper>
          <CollapseContainer title="每日任务">
            <BasicForm
              onRegister={registerForm}
              schemas={schemas(dailyConfig, durationSwitch, numsSwitch)}
              onSubmit={handleSubmit}
            />
          </CollapseContainer>
        </PageWrapper>
      );

      async function getConfig() {
        const { result } = await TaskService.getDailyConfig();
        dailyConfig.value = result;
        if (dailyConfig.value) {
          durationSwitch.value = Boolean((dailyConfig.value as any).durationSwitch);
          numsSwitch.value = Boolean((dailyConfig.value as any).numsSwitch);
        }
      }

      async function handleSubmit(params: any) {
        params.resetTime = params.resetTime.split(' ')[1];
        params.numsSwitch = Number(params.numsSwitch);
        params.durationSwitch = Number(params.durationSwitch);
        try {
          const data = await TaskService.setDailyConfig(params);
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
