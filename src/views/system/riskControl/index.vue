<script lang="tsx">
  import { defineComponent, onMounted, unref } from 'vue';
  import moment from 'moment';

  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm, useForm } from '/@/components/Form';
  import { MTable } from '/@/components/MTable';

  import { schemas, tableTitle } from './config';
  import { useTable } from '/@/hooks/component/useTable';
  import { SystemService } from '/@/api';

  export default defineComponent({
    setup() {
      const {
        id,
        formElRef,
        handleSubmit,
        params,
        tableData,
        tableLoading,
        getTableData,
        onChange,
        onShowSizeChange,
        total,
      } = useTable(initData);

      const [register] = useForm({
        labelWidth: 100,
        actionColOptions: {
          span: 24,
        },
        fieldMapToTime: [['fieldTime', ['startDate', 'endDate'], 'YYYY-MM-DD']],
      });

      const timeList = [moment().subtract(7, 'days'), moment()];

      params.startDate = moment(timeList[0]).format('YYYY-MM-DD');
      params.endDate = moment(timeList[1]).format('YYYY-MM-DD');

      onMounted(() => {
        initData();
      });

      return () => (
        <PageWrapper>
          <CollapseContainer title="查询">
            <BasicForm
              ref={formElRef}
              onRegister={register}
              schemas={schemas(timeList)}
              onSubmit={handleSubmit}
              showAdvancedButton={true}
            />
          </CollapseContainer>
          <MTable
            id={unref(id)}
            page={params.pageNum}
            limit={params.pageSize}
            total={unref(total)}
            loading={unref(tableLoading)}
            data={unref(tableData)}
            tableTitle={tableTitle()}
            refresh={initData}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          />
        </PageWrapper>
      );

      function initData() {
        return getTableData(async () => {
          const { result } = await SystemService.getRiskList(params);
          tableData.value = result.data;
          total.value = result.total;
        });
      }
    },
  });
</script>

<style scoped lang="less"></style>
