<script lang="tsx">
  import { defineComponent, onMounted, ref, unref } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm } from '/@/components/Form';
  import { MTable } from '/@/components/MTable';

  import { schemas, tableTitle, options, roleId, dialogSchemas } from './AccountConfig';
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
  import { addAccount, delAccount, editAccount, getAccountList } from '/@/api/sys/SysSetting';
  import MFormDialogView from '/@/components/MyselfView/MFormDialogView.vue';
  import MDialogView from '/@/components/MyselfView/MDialogView.vue';
  //应用列表
  export default defineComponent({
    components: { MFormDialogView, MOptions, AButton },
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
      const actionColOptions = { span: 24 };
      onMounted(() => {
        initData();
      });
      let visible = ref<boolean>(false);
      let itemInfo = ref<any>({});
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
          <MOptions options={options} onClick={doSomeTing} />
          <MTable
            loading={unref(tableLoading)}
            page={params.pageNum}
            limit={params.pageSize}
            total={unref(total)}
            data={unref(tableData)}
            tableTitle={tableTitle(go, delItem, editItem)}
            refresh={initData}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            // showFooter
            // footerMethod={getTableSum}
          />
          {visible.value ? (
            <MFormDialogView
              visible={visible}
              schemas={dialogSchemas(itemInfo.value)}
              title={'新增/编辑账号'}
              onSubmit={onSubmit}
            />
          ) : null}
        </PageWrapper>
      );

      //提交数据
      async function onSubmit(params) {
        let value;
        if (unref(itemInfo).id == null) {
          value = await addAccount(params);
        } else {
          value = await editAccount(params);
        }
        if (value == null || !value.success || value.result == null) {
          return;
        }
        message.success(value.message);
        initData();
      }

      //初始化数据信息
      function initData() {
        return getTableData(async () => {
          const value = await getAccountList(params);
          if (value == null || !value.success || value.result == null) {
            return;
          }
          tableData.value = value.result.data;
          total.value = value.result.total;
        });
      } //传参到编辑页面

      async function editItem(item: any) {
        visible.value = true;
        console.log(item, 'editItem');
        item.roleId = await roleId(item.id);
        itemInfo.value = item;
      }

      //删除信息
      async function delItem(item: any) {
        let value = await delAccount({ accountIds: item.id });
        if (value == null || !value.success) {
          return;
        }
        message.success(value.message);
        initData();
      }

      function doSomeTing(emitType: string) {
        if (emitType === 'add') {
          //新增应用信息
          visible.value = true;
          itemInfo = ref({});
          console.log(itemInfo, 'doSomeTing');
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
