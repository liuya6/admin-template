<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { Button } from 'ant-design-vue';

  import { BasicForm, FormActionType } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';

  import { schemas } from './config';

  export default defineComponent({
    components: { Button },
    setup() {
      const formElRef = ref<Nullable<FormActionType>>(null);

      const flag = ref(false);

      return () => (
        <PageWrapper>
          <CollapseContainer title="查询">
            <BasicForm
              actionColOptions={{ span: 24 }}
              labelWidth={100}
              ref={formElRef}
              schemas={schemas(flag)}
              onSubmit={handleSubmit}
              showAdvancedButton={true}
              alwaysShowLines={2}
            />
          </CollapseContainer>
        </PageWrapper>
      );

      function handleSubmit(params: any) {
        console.log(params, '!!!');
      }
    },
  });
</script>

<style scoped lang="less"></style>
