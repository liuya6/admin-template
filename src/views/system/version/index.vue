<script lang="tsx">
  import { defineComponent, onMounted, unref, ref } from 'vue';

  import { BasicModal, useModal } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { MOptions } from '/@/components/MOptions';
  import { MTable } from '/@/components/MTable';

  import { options, tableTitle, modalSchemas } from './config';
  import { useTable } from '/@/hooks/component/useTable';
  import { SystemService } from '/@/api';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    setup() {
      const {
        id,
        params,
        tableData,
        total,
        tableLoading,
        getTableData,
        onChange,
        onShowSizeChange,
        selectAllEvent,
        selectChangeEvent,
      } = useTable(initData);
      const [registerForm, { validateFields }] = useForm({
        labelWidth: 100,
        showActionButtonGroup: false,
        showResetButton: false,
      });
      const [registerModal, { closeModal, openModal }] = useModal();
      const { createMessage } = useMessage();

      const systemType = ref(null);

      onMounted(() => {
        initData();
      });

      return () => (
        <PageWrapper>
          <MOptions options={options} onClick={doSomeTing} />
          <MTable
            id={unref(id)}
            loading={unref(tableLoading)}
            page={params.pageNum}
            limit={params.pageSize}
            total={unref(total)}
            data={unref(tableData)}
            tableTitle={tableTitle()}
            refresh={initData}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            onCheckboxAll={selectAllEvent}
            onCheckboxChange={selectChangeEvent}
          />
          <BasicModal title="发布版本" onOk={handleOk} onRegister={registerModal}>
            <BasicForm schemas={modalSchemas(systemType)} onRegister={registerForm} />
          </BasicModal>
        </PageWrapper>
      );

      function initData() {
        return getTableData(async () => {
          const { result } = await SystemService.getVersionConfig();
          tableData.value = result.data;
          total.value = result.total;
        });
      }

      function doSomeTing(emitType: string) {
        if (emitType === 'add') {
          openModal(true);
        }
      }

      async function handleOk() {
        const params = await validateFields();
        try {
          const data = await SystemService.addVersionConfig(params);
          if (data.success) {
            createMessage.success(data.message);
            closeModal();
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
