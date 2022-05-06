<script lang="tsx">
  import { defineComponent, onMounted, unref, ref, nextTick } from 'vue';

  import { BasicModal, useModal } from '/@/components/Modal';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm, useForm } from '/@/components/Form';
  import { MOptions } from '/@/components/MOptions';
  import { MTable } from '/@/components/MTable';

  import { schemas, options, tableTitle, modalSchemas } from './config';
  import { useTable } from '/@/hooks/component/useTable';
  import { SystemService } from '/@/api';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    setup() {
      const {
        id,
        formElRef,
        params,
        tableData,
        total,
        tableLoading,
        handleSubmit,
        getTableData,
        onChange,
        onShowSizeChange,
        selectAllEvent,
        selectChangeEvent,
      } = useTable(initData);
      const [register] = useForm({
        labelWidth: 100,
        actionColOptions: {
          span: 24,
        },
      });

      const [registerForm, { validateFields, setFieldsValue }] = useForm({
        labelWidth: 100,
        showActionButtonGroup: false,
        showResetButton: false,
      });
      const [registerModal, { closeModal, openModal }] = useModal();

      const { createMessage } = useMessage();

      const isEdit = ref(false);
      const isShortTerm = ref(false);

      const editId = ref(null);

      onMounted(() => {
        initData();
      });

      return () => (
        <PageWrapper>
          <CollapseContainer title="查询">
            <BasicForm
              ref={formElRef}
              onRegister={register}
              schemas={schemas()}
              onSubmit={handleSubmit}
              showAdvancedButton={true}
            />
          </CollapseContainer>
          <MOptions options={options} onClick={doSomeTing} />
          <MTable
            id={unref(id)}
            loading={unref(tableLoading)}
            page={params.pageNum}
            limit={params.pageSize}
            total={unref(total)}
            data={unref(tableData)}
            tableTitle={tableTitle(doSomeTing)}
            refresh={initData}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            onCheckboxAll={selectAllEvent}
            onCheckboxChange={selectChangeEvent}
          />
          <BasicModal
            title={isEdit.value ? '编辑禁用ip' : '新增禁用ip'}
            onOk={handleOk}
            onRegister={registerModal}
          >
            <BasicForm schemas={modalSchemas(isShortTerm)} onRegister={registerForm} />
          </BasicModal>
        </PageWrapper>
      );

      function initData() {
        return getTableData(async () => {
          const { result } = await SystemService.getIpLimitList(params);
          tableData.value = result.data;
          total.value = result.total;
        });
      }

      function doSomeTing(emitType: string, row?: any) {
        // console.log(emitType, unref(selectedList));
        if (emitType === 'add') {
          openModal(true);
          isEdit.value = false;
        }

        if (emitType === 'edit') {
          isEdit.value = true;
          editId.value = row.id;
          const isPermanent = row.endTime === '永久';
          isShortTerm.value = !isPermanent;

          const result = {
            ip: row.ip,
            timeType: isPermanent ? 1 : 0,
            days: isPermanent
              ? null
              : parseInt(
                  (new Date(row.endTime).getTime() - new Date(row.startTime).getTime()) /
                    1000 /
                    60 /
                    60 /
                    24,
                ),
          };
          openModal(true);
          nextTick(() => {
            setFieldsValue(result);
          });
        }
      }

      async function handleOk() {
        const params = await validateFields();
        try {
          const fn = isEdit.value ? SystemService.editIpLimit : SystemService.addIpLimit;
          if (isEdit.value) {
            params.id = editId.value;
          }
          const data = await fn(params);
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
