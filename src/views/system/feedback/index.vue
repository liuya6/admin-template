<script lang="tsx">
  import { defineComponent, onMounted, unref } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm, useForm } from '/@/components/Form';
  import { MTable } from '/@/components/MTable';

  import { schemas, tableTitle } from './config';
  import { useTable } from '/@/hooks/component/useTable';
  import { SystemService } from '/@/api';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    setup() {
      const {
        id,
        formElRef,
        handleSubmit,
        params,
        tableData,
        total,
        tableLoading,
        getTableData,
        onChange,
        onShowSizeChange,
      } = useTable(initData);
      const [register] = useForm({
        labelWidth: 100,
        schemas: schemas(),
        actionColOptions: {
          span: 24,
        },
        fieldMapToTime: [['periodTime', ['startTime', 'endTime'], 'YYYY-MM-DD']],
      });
      const { createMessage } = useMessage();

      onMounted(() => {
        initData();
      });

      return () => (
        <PageWrapper>
          <CollapseContainer title="查询">
            <BasicForm
              ref={formElRef}
              onRegister={register}
              schemas={schemas()}
              onSubmit={handleSubmit}
              showAdvancedButton={true}
            />
          </CollapseContainer>
          <MTable
            id={unref(id)}
            loading={unref(tableLoading)}
            page={params.pageNum}
            limit={params.pageSize}
            total={unref(total)}
            data={unref(tableData)}
            tableTitle={tableTitle(changeStatus)}
            refresh={initData}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          />
        </PageWrapper>
      );

      function initData() {
        return getTableData(async () => {
          const { result } = await SystemService.getFeedbackList(params);
          tableData.value = result.data;
          total.value = result.total;
        });
      }

      async function changeStatus(type: 'neglect' | 'solved', row: any) {
        try {
          const params = {
            feedbackId: row.id,
            operateStatus: type === 'neglect' ? -1 : type === 'solved' ? 1 : null,
          };
          const data = await SystemService.handleFeedback(params);
          if (data.success) {
            createMessage.success(data.message);
            await initData();
          }
        } catch (e) {
          console.warn(e);
        }
      }
    },
  });
</script>

<style scoped lang="less"></style>
