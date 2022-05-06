<script lang="tsx">
  import { defineComponent, onMounted, unref } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { MTable } from '/@/components/MTable';

  import { useTableSum } from '/@/hooks/component/useTableSum';

  import { tableTitle } from './config';
  import { getDemoTableData } from '/@/api/sys/table';
  import { useTable } from '/@/hooks/component/useTable';

  export default defineComponent({
    setup() {
      let { params, total, tableLoading, tableData, getTableData, onChange, onShowSizeChange } =
        useTable(initData);

      const { getTableSum } = useTableSum();

      onMounted(() => {
        initData();
      });

      return () => (
        <PageWrapper>
          <MTable
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
          const data = await getDemoTableData(params);
          tableData.value = data.list;
          total.value = data.total;
        });
      }
    },
  });
</script>

<style scoped lang="less"></style>
