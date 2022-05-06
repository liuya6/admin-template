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

  export default defineComponent({
    setup() {
      const {
        id,
        formElRef,
        params,
        tableData,
        total,
        tableLoading,
        selectedList,
        handleSubmit,
        getTableData,
        onChange,
        onShowSizeChange,
        selectAllEvent,
        selectChangeEvent,
      } = useTable(initData);

      const [register] = useForm({
        labelWidth: 100,
        schemas: schemas(),
        actionColOptions: {
          span: 24,
        },
      });

      const { createMessage } = useMessage();
      const go = useGo();

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
          const { result } = await TaskService.taskGroupList(params);
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
        console.log(emitType, unref(selectedList));
        if (emitType === 'add') {
          go('taskGroupAdd');
        }

        if (emitType === 'delete') {
          return deleteItem([row]);
        }

        if (emitType === 'batchDelete') {
          if (!unref(selectedList).length) {
            return createMessage.error('请选择要删除的选项');
          }
          return deleteItem(unref(selectedList));
        }
      }

      async function deleteItem(arr: any) {
        const params = {
          groupIds: arr.map((item: any) => item.id),
        };
        try {
          const data = await TaskService.taskGroupDelete(params);
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
