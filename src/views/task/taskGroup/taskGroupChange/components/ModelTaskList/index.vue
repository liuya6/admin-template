<script lang="tsx">
  import { defineComponent, ref, unref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import { MTable } from '/@/components/MTable';
  import { useTable } from '/@/hooks/component/useTable';
  import { tableTitle } from './config';
  import { BasicModal, useModal } from '/@/components/Modal';
  import TaskList from '/@/views/task/taskList/index.vue';
  import { useEditCacheStore } from '/@/store/modules/editCache';
  import { TaskService } from '/@/api';
  import { cloneDeep } from 'lodash-es';

  export default defineComponent({
    emits: ['change'],
    setup(props, { emit }) {
      const { tableData, total } = useTable();
      const taskListDom = ref(null);
      const [registerModal, { closeModal, openModal }] = useModal();
      const route = useRoute();
      const editCache = useEditCacheStore();

      watch(tableData, () => {
        emit('change', tableData.value);
      });

      getEditTableData();

      async function getEditTableData() {
        if (route.name !== 'TaskGroupEdit' || !editCache.taskGroupEdit) return;
        const { result } = await TaskService.taskGroupTask({ groupId: editCache.taskGroupEdit.id });
        if (result.length) {
          tableData.value = result;
        }
      }

      return () => (
        <div class="taskAward">
          <div>
            <a-button
              type="primary"
              onClick={() => {
                openModal(true);
              }}
            >
              添加任务
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
          <BasicModal title="添加奖励" width="1000px" onOk={handleOk} onRegister={registerModal}>
            <TaskList ref={taskListDom} />
          </BasicModal>
        </div>
      );

      async function handleOk() {
        const selectedList = (taskListDom.value as any).selectedList;
        const oldIdList = tableData.value.map((item: any) => item.id);
        const cloneTableData = cloneDeep(tableData.value);
        selectedList.forEach((item: any) => {
          if (!oldIdList.includes(item.id)) {
            cloneTableData.push(item);
          }
        });
        tableData.value = cloneTableData;
        closeModal();
      }

      function doSomeTing(type: string, rowIndex: any) {
        if (type === 'delete') {
          const list = cloneDeep(tableData.value);
          list.splice(rowIndex, 1);
          tableData.value = list;
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
