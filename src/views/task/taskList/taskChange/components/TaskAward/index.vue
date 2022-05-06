<script lang="tsx">
  import { defineComponent, unref, nextTick, watch } from 'vue';
  import { cloneDeep } from 'lodash-es';

  import { MTable } from '/@/components/MTable';
  import { useTable } from '/@/hooks/component/useTable';
  import { BasicModal, useModal } from '/@/components/Modal';
  import { useForm, BasicForm } from '/@/components/Form';
  import { tableTitle, schemas } from './config';

  export default defineComponent({
    emits: ['change'],
    setup(_, { emit }) {
      const { tableData, total } = useTable();

      const [registerForm, { validateFields, resetFields, setFieldsValue }] = useForm({
        labelWidth: 100,
        showActionButtonGroup: false,
        showResetButton: false,
      });
      const [registerModal, { closeModal, openModal }] = useModal();

      watch(tableData, () => {
        emit('change', tableData.value);
      });

      return () => (
        <div class="taskAward">
          <div>
            <a-button
              type="primary"
              onClick={() => {
                openModal(true);
                nextTick(() => {
                  resetFields();
                });
              }}
            >
              添加奖励
            </a-button>
          </div>
          <div class="table">
            <MTable
              showToolbar={false}
              total={unref(total)}
              data={unref(tableData)}
              tableTitle={tableTitle(doSomeTing)}
            />
          </div>
          <BasicModal title="添加奖励" onOk={handleOk} onRegister={registerModal}>
            <BasicForm schemas={schemas()} onRegister={registerForm} />
          </BasicModal>
        </div>
      );

      async function handleOk() {
        const res = await validateFields();
        const list = cloneDeep(tableData.value);
        list.push(res);
        tableData.value = list;
        closeModal();
      }

      function doSomeTing(type: string, value: any) {
        if (type === 'delete') {
          const list = cloneDeep(tableData.value);
          list.splice(value, 1);
          tableData.value = list;
        }

        if (type === 'edit') {
          openModal(true);
          setFieldsValue(value);
        }
      }
    },
  });
</script>

<style scoped lang="less">
  .taskAward {
    .table {
      margin-top: 15px;
    }
  }
</style>
