<script lang="tsx">
  import { defineComponent, onMounted, ref, unref } from 'vue';
  import { Button, Modal } from 'ant-design-vue';
  import { useTable } from '/@/hooks/component/useTable';
  import { getAppInfoList } from '/@/api/app/AppApi';
  import { MTable } from '/@/components/MTable';
  import { useGo } from '/@/hooks/web/usePage';
  import { schemas } from '/@/views/task/taskTopic/long/LongTaskConfig';
  import BasicForm from '/@/components/Form/src/BasicForm.vue';
  import PageWrapper from '/@/components/Page/src/PageWrapper.vue';

  export default defineComponent({
    components: { PageWrapper, BasicForm, Modal },
    props: {
      visible: {
        type: Object,
        default: ref<boolean>(false),
      },
      title: {
        type: String,
        default: '',
      },
      tableTitle: {
        type: Function,
        default: {},
      },
      schemas: {
        type: Function,
        default: {},
      },
      tableData: {
        type: Function,
        default: {},
      },
    },
    emits: ['change'],
    setup(prop, { emit }) {
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
        selectedList,
        selectAllEvent,
        selectChangeEvent,
        onShowSizeChange,
      } = useTable(initData);
      //获取路由对象
      onMounted(() => {
        initData();
      });
      const actionColOptions = { span: 24 };
      const handleOk = (e: MouseEvent) => {
        prop.visible.value = false;
        emit('change', selectedList); //选择一个表格条目然后刷新数据给编辑的表格
      };
      const onCancel = (e: MouseEvent) => {
        prop.visible.value = false;
      };
      return () => (
        <Modal
          width={800}
          title={prop.title}
          visible={prop.visible.value}
          onOk={handleOk}
          onCancel={onCancel}
        >
          <PageWrapper>
            <BasicForm
              actionColOptions={actionColOptions}
              labelWidth={100}
              ref={formElRef}
              schemas={prop.schemas()}
              onSubmit={handleSubmit}
              showResetButton={false}
            />
            <MTable
              loading={unref(tableLoading)}
              page={params.pageNum}
              limit={params.pageSize}
              total={unref(total)}
              data={unref(tableData)}
              tableTitle={prop.tableTitle(delItem, editItem)}
              refresh={initData}
              onChange={onChange}
              onShowSizeChange={onShowSizeChange}
              onCheckboxAll={selectAllEvent}
              onCheckboxChange={selectChangeEvent}
              showToolbar={false}
            />
          </PageWrapper>
        </Modal>
      );

      //初始化数据信息
      function initData() {
        return getTableData(async () => {
          let value = await prop.tableData(params);
          console.log(value, 'initData>>>', 'getTableData>>>');
          if (value == null || !value.success || value.result == null) {
            return;
          }
          tableData.value = value.result.data;
          total.value = value.result.total;
        });
      } //传参到编辑页面

      function editItem(item: any) {}

      //删除信息
      async function delItem(item: any) {}
    },
  });
</script>
