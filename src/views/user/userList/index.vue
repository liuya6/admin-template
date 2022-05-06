<script lang="tsx">
  import { defineComponent, onMounted, unref } from 'vue';

  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm, useForm } from '/@/components/Form';
  import { MTable } from '/@/components/MTable';

  import { schemas, tableTitle } from './config';
  import { useTable } from '/@/hooks/component/useTable';
  import { UserService } from '/@/api';

  export default defineComponent({
    setup() {
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
      } = useTable(initData);

      const [register] = useForm({
        labelWidth: 100,
        schemas: schemas(),
        actionColOptions: {
          span: 24,
        },
        fieldMapToTime: [['periodTime', ['startTime', 'endTime'], 'YYYY-MM-DD']],
      });

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
          <MTable
            id={unref(id)}
            loading={unref(tableLoading)}
            page={params.pageNum}
            limit={params.pageSize}
            total={unref(total)}
            data={unref(tableData)}
            tableTitle={tableTitle(changeStatus)}
            refresh={initData}
            onChange={onChange}
            onShowSizeChange={onShowSizeChange}
          />
        </PageWrapper>
      );

      function initData() {
        return getTableData(async () => {
          const { result } = await UserService.getUserList(params);
          tableData.value = result.data;
          total.value = result.total;
        });
      }

      async function changeStatus(type: 'disable' | 'unblock' | 'delete', row: any) {
        console.log(type, row);
        try {
          const params = {
            status: type === 'disable' ? -1 : type === 'unblock' ? 0 : type === 'delete' ? -2 : '',
            userIds: [row.id],
          };
          const data = await UserService.changeUserStatus(params);
          if (data.success) {
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
