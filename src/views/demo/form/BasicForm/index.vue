<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { Button } from 'ant-design-vue';

  import { BasicForm, FormActionType } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';

  import { schemas } from './config';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: { Button },
    setup() {
      const formElRef = ref<Nullable<FormActionType>>(null);

      const flag = ref(false);

      const { createMessage } = useMessage();

      return () => (
        <PageWrapper>
          <CollapseContainer title="可收缩">
            <BasicForm
              actionColOptions={{ span: 24 }}
              labelWidth={100}
              ref={formElRef}
              schemas={schemas(flag)}
              onSubmit={handleSubmit}
            />
          </CollapseContainer>
        </PageWrapper>
      );

      function handleSubmit(params: any) {
        console.log(params, '!!!');
        createMessage.success(JSON.stringify(params));
      }
    },
  });
</script>

<style scoped lang="less"></style>
