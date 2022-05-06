<script lang="tsx">
  import { defineComponent, onMounted, unref, ref } from 'vue';
  import moment from 'moment';

  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm, useForm } from '/@/components/Form';
  import { MTable } from '/@/components/MTable';
  import UserAnalyzeLine from './components/UserAnalyzeLine/index.vue';

  import { schemas, tableTitle } from './config';
  import { useTable } from '/@/hooks/component/useTable';
  import { OperationService } from '/@/api';

  export default defineComponent({
    setup() {
      const chartDom = ref(null);
      const { id, formElRef, handleSubmit, notPageParams, tableData, tableLoading, getTableData } =
        useTable(initData);

      const [register] = useForm({
        labelWidth: 100,
        actionColOptions: {
          span: 24,
        },
        fieldMapToTime: [['fieldTime', ['startDate', 'endDate'], 'YYYY-MM-DD']],
      });

      const timeList = [moment().subtract(7, 'days'), moment()];

      notPageParams.startDate = moment(timeList[0]).format('YYYY-MM-DD');
      notPageParams.endDate = moment(timeList[1]).format('YYYY-MM-DD');

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
          <UserAnalyzeLine paramsObj={notPageParams} ref={chartDom} />
          <MTable
            showPage={false}
            id={unref(id)}
            loading={unref(tableLoading)}
            data={unref(tableData)}
            tableTitle={tableTitle()}
            refresh={initData}
          />
        </PageWrapper>
      );

      function initData() {
        (chartDom.value as any).initData(notPageParams);
        return getTableData(async () => {
          const { result } = await OperationService.getUserAnalyzeDetails(notPageParams);
          tableData.value = result;
        });
      }
    },
  });
</script>

<style scoped lang="less"></style>
