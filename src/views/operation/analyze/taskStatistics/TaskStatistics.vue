<script lang="tsx">
  import { defineComponent, onMounted, unref } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm } from '/@/components/Form';
  import { MTable } from '/@/components/MTable';

  import { schemas, tableTitle, options } from './TaskStatisticsConfig';
  import { useTable } from '/@/hooks/component/useTable';
  import { useTableSum } from '/@/hooks/component/useTableSum';
  import { getDemoTableData } from '/@/api/sys/table';
  import { useGo } from '/@/hooks/web/usePage';
  import AButton from '/@/components/Button/src/BasicButton.vue';
  import { delAppInfo, getAppInfoList } from '/@/api/app/AppApi';
  import { message } from 'ant-design-vue';
  import { useErrorLogStore } from '/@/store/modules/errorLog';
  import { appListStateStoreWithOut, useAppListStateStore } from '/@/store/modules/AppListStore';
  import MOptions from '/@/components/MOptions/src/MOptions.vue';
  //应用列表
  export default defineComponent({
    components: { MOptions, AButton },
    setup() {
      //获取table对象
      const {
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
      //获取路由对象
      const go = useGo();
      const { getTableSum } = useTableSum();
      const changePath = '/app/appListChange';
      const actionColOptions = { span: 24 };
      onMounted(() => {
        initData();
      });
      return () => (
        <PageWrapper>
          <CollapseContainer title="查询">
            <BasicForm
              actionColOptions={actionColOptions}
              labelWidth={100}
              ref={formElRef}
              schemas={schemas()}
              onSubmit={handleSubmit}
            />
          </CollapseContainer>
          <MTable
            loading={unref(tableLoading)}
            page={params.pageNum}
            limit={params.pageSize}
            total={unref(total)}
            data={unref(tableData)}
            tableTitle={tableTitle()}
            refresh={initData}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            // showFooter
            // footerMethod={getTableSum}
          />
        </PageWrapper>
      );

      //初始化数据信息
      function initData() {
        return getTableData(async () => {
          const value = await getAppInfoList(params);
          if (value == null || !value.success || value.result == null) {
            return;
          }
          tableData.value = value.result.data;
          total.value = value.result.total;
        });
      } //传参到编辑页面

      function editItem(item: any) {
        let appListStateStore = useAppListStateStore();
        appListStateStore.setState(item);
        go(changePath, false);
      }

      //删除信息
      async function delItem(item: any) {
        let value = await delAppInfo({ applicationId: item.id });
        if (value == null || !value.success) {
          return;
        }
        message.success(value.message);
        initData();
      }

      function doSomeTing(emitType: string) {
        if (emitType === 'add') {
          //新增应用信息
          let appListStateStore = useAppListStateStore();
          appListStateStore.setState({});
          go(changePath);
        }
      }
    },
  });
</script>

<style scoped>
  .btn_cls {
    margin-bottom: 10px;
  }
</style>
