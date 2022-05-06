import { reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { FormActionType } from '/@/components/Form';
import { unionBy, xorBy, cloneDeep } from 'lodash-es';

interface ParamsDefinition {
  pageNum: number;
  pageSize: number;
  [key: string]: any;
}

export function useTable(initData?: () => void) {
  const formElRef = ref<Nullable<FormActionType>>(null);
  const route = useRoute();

  let params = reactive<ParamsDefinition>({
    pageNum: 1,
    pageSize: 30,
  });

  let notPageParams = reactive<Partial<ParamsDefinition>>({});

  const config = reactive({
    total: 0,
    tableData: [] as any,
    tableLoading: false,
    selectedList: [] as any,
  });

  // 分页操作
  function onShowSizeChange(_: number, limit: number) {
    params.pageSize = limit;
    if (initData) {
      initData();
    }
  }
  function onChange(page: number, _: number) {
    params.pageNum = page;
    if (initData) {
      initData();
    }
  }

  // 查询操作
  function handleSubmit(data: any) {
    params = Object.assign(params, data);
    notPageParams = Object.assign(notPageParams, data);
    if (initData) {
      initData();
    }
  }

  // 表格复选框操作
  function selectAllEvent({ checked, records }) {
    if (checked) {
      config.selectedList = unionBy(config.selectedList, records, 'id');
    } else {
      const defaultTableData = cloneDeep(config.tableData);
      config.selectedList = xorBy(config.selectedList, defaultTableData, 'id');
    }
  }
  function selectChangeEvent({ checked, records, _, row }) {
    if (checked) {
      config.selectedList = unionBy(config.selectedList, records, 'id');
    } else {
      config.selectedList = xorBy(config.selectedList, [row], 'id');
    }
  }

  // 获取表格数据
  async function getTableData(fn: () => void) {
    try {
      config.tableLoading = true;
      await fn();
      config.tableLoading = false;
    } catch (e) {
      console.warn(e);
    }
  }

  return {
    id: route.name,
    params,
    notPageParams,
    ...toRefs(config),
    formElRef,
    onShowSizeChange,
    onChange,
    handleSubmit,
    getTableData,
    selectAllEvent,
    selectChangeEvent,
  };
}
