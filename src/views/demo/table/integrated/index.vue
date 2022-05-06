<script lang="tsx">
  import { defineComponent, onMounted, unref } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm } from '/@/components/Form';
  import { MTable } from '/@/components/MTable';

  import { schemas, tableTitle } from './config';
  import { useTable } from '/@/hooks/component/useTable';
  import { useTableSum } from '/@/hooks/component/useTableSum';
  import { getDemoTableData } from '/@/api/sys/table';

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

      const { getTableSum } = useTableSum();

      onMounted(() => {
        initData();
      });

      return () => (
        <PageWrapper>
          <CollapseContainer title="查询">
            <BasicForm
              actionColOptions={{ span: 24 }}
              labelWidth={100}
              ref={formElRef}
              schemas={schemas()}
              onSubmit={handleSubmit}
              showAdvancedButton={true}
            />
          </CollapseContainer>
          <MTable
            id={unref(id)}
            loading={unref(tableLoading)}
            page={params.page}
            limit={params.limit}
            total={unref(total)}
            data={unref(tableData)}
            tableTitle={tableTitle()}
            refresh={initData}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            showFooter
            footerMethod={getTableSum}
          />
        </PageWrapper>
      );

      function initData() {
        return getTableData(async () => {
          const { result } = await getDemoTableData(params);
          tableData.value = result.list;
          total.value = result.total;
        });
      }
    },
  });
</script>

<style scoped lang="less"></style>
