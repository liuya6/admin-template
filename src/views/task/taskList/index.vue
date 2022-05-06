<script lang="tsx">
  import { defineComponent, onMounted, unref } from 'vue';
  import { useGo } from '/@/hooks/web/usePage';

  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm, useForm } from '/@/components/Form';
  import { MOptions } from '/@/components/MOptions';
  import { MTable } from '/@/components/MTable';

  import { schemas, options, tableTitle } from './config';
  import { useTable } from '/@/hooks/component/useTable';
  import { TaskService } from '/@/api';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useEditCacheStore } from '/@/store/modules/editCache';

  export default defineComponent({
    setup(props, { expose }) {
      const {
        id,
        formElRef,
        handleSubmit,
        params,
        tableData,
        total,
        tableLoading,
        getTableData,
        onChange,
        onShowSizeChange,
        selectedList,
        selectAllEvent,
        selectChangeEvent,
      } = useTable(initData);

      const [register] = useForm({
        labelWidth: 100,
        schemas: schemas(),
        actionColOptions: {
          span: 24,
        },
        fieldMapToTime: [['periodTime', ['startTime', 'endTime'], 'YYYY-MM-DD']],
      });

      const { createMessage } = useMessage();
      const go = useGo();
      // const useEditCacheStore = useEditCacheStore();

      onMounted(() => {
        initData();
      });

      expose({
        selectedList,
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
            tableTitle={tableTitle(changeShowStatus, doSomeTing)}
            refresh={initData}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
            onCheckboxAll={selectAllEvent}
            onCheckboxChange={selectChangeEvent}
          />
        </PageWrapper>
      );

      function initData() {
        return getTableData(async () => {
          const { result } = await TaskService.taskList(params);
          tableData.value = result.data;
          total.value = result.total;
        });
      }

      async function changeShowStatus(bool: boolean, row: any) {
        const params = {
          taskId: row.id,
          showStatus: Number(bool),
        };
        try {
          const data = await TaskService.taskShowStatus(params);
          if (data.success) {
            createMessage.success(data.message);
          }
        } catch (e) {
          console.warn(e);
        }
      }

      function doSomeTing(emitType: string, row?: any) {
        switch (emitType) {
          case 'add':
            return go('taskAdd');
          case 'batchDelete':
            if (!unref(selectedList).length) {
              return createMessage.error('请选择要删除的选项');
            }
            return deleteItem(unref(selectedList));
          case 'edit':
            useEditCacheStore().setTaskEdit(row);
            return go('taskEdit');
          case 'delete':
            return deleteItem([row]);
        }
      }

      async function deleteItem(arr: any) {
        const params = {
          taskIds: arr.map((item: any) => item.id),
        };
        try {
          const data = await TaskService.taskDelete(params);
          if (data.success) {
            createMessage.success(data.message);
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
