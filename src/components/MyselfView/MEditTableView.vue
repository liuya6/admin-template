<script lang="tsx">
  import { defineComponent, onMounted, ref, unref, watch } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { MTable } from '/@/components/MTable';

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
  import { MOptionsConfig } from '/@/components/MOptions/type';
  //应用列表
  export default defineComponent({
    components: { MOptions, AButton },
    props: {
      optionArr: {
        type: Object,
        default: [],
      },
      tableTitle: {
        type: Object,
        default: [],
      },
      tableDataValue: {
        type: Object,
        default: [],
      },
      getTableData: {
        type: Function,
        default: {},
      },
      doSomeTing: {
        type: Function,
        default: {},
      },
    },
    setup: (prop, { emit }) => {
      watch(
        () => unref(prop.tableDataValue),
        (item) => {
          tableData.value = item;
        },
      );
      //获取table对象
      const {
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
      onMounted(() => {
        params.pageSize = 999; //设置个大值加载所有任务列表
        prop.getTableData(params);
        initData();
      });
      return () => (
        <div>
          <MOptions options={prop.optionArr as any} onClick={prop.doSomeTing as any} />
          <MTable
            loading={unref(tableLoading)}
            page={params.pageNum}
            limit={params.pageSize}
            total={unref(total)}
            data={unref(tableData)}
            tableTitle={prop.tableTitle as any}
            refresh={initData}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            showToolbar={false}
          />
        </div>
      );

      //初始化数据信息
      function initData() {
        return getTableData(() => {
          console.log(prop.tableDataValue, 'prop.tableData');
          tableData.value = prop.tableDataValue;
        });
      } //传参到编辑页面
    },
  });
</script>

<style scoped>
  .btn_cls {
    margin-bottom: 10px;
  }
</style>
