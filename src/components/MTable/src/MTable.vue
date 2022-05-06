<script lang="tsx">
  import { computed, defineComponent, ref, unref, onMounted } from 'vue';

  import { VxeTableInstance, VxeToolbarInstance } from 'vxe-table';

  import XColumn from './components/XColumn.vue';
  import OColumn from './components/OColumn.vue';
  import { Icon } from '/@/components/Icon';
  import Sortable from 'sortablejs';

  export default defineComponent({
    props: {
      loading: Boolean,
      tableTitle: {
        type: Array,
      },
      data: {
        type: Array,
        default: () => [],
      },
      showSizeChange: {
        type: Boolean,
        default: () => true,
      },
      showQuickJumper: {
        type: Boolean,
        default: () => true,
      },
      page: {
        type: Number,
        default: 1,
      },
      limit: {
        type: Number,
        default: 20,
      },
      total: {
        type: Number,
        default: 100,
      },
      onShowSizeChange: {
        type: Function,
      },
      onChange: {
        type: Function,
      },
      refresh: {
        type: Function,
      },
      pageSizeOptions: {
        type: Array,
        default: () => ['20', '30', '50', '70', '100'],
      },
      showToolbar: {
        type: Boolean,
        default: () => true,
      },
      showPage: {
        type: Boolean,
        default: () => true,
      },
    },
    emits: ['dragItem'],
    setup(props, { emit, attrs }) {
      const xTable = ref({} as VxeTableInstance);
      const xToolbar = ref({} as VxeToolbarInstance);
      const getProps = computed(() => {
        return { ...props, ...attrs } as any;
      });

      const resultProps = computed(() => ({
        ref: xTable,
        id: unref(getProps).id || 'xTable',
        // row-key 是拖动上移下移需要
        'row-key': unref(getProps).rowKey,
        'max-height': unref(getProps).maxHeight,
        align: 'center',
        size: 'small',
        border: true,
        'auto-resize': true,
        resizable: true,
        // 列 配置  keyField 是checkbox显示默认的选中值 需要
        'row-config': { isHover: true, keyField: unref(getProps).keyField },
        // 表格数据
        data: unref(getProps).data,
        // 是否显示合计
        'show-footer': unref(getProps).showFooter,
        'footer-method': unref(getProps).footerMethod,
        // checkbox选择框
        'checkbox-config': {
          // range: true,
          checkRowKeys: unref(getProps).defaultSelectRows,
          reserve: !!unref(getProps).keyField,
          highlight: unref(getProps).highlight,
          trigger: 'row',
        },
        // 编辑
        'edit-config': { trigger: 'click', mode: 'cell' },
        // 排序
        'sort-config': {
          trigger: 'cell',
          orders: ['desc', 'asc', null],
          multiple: unref(getProps).multiple,
          remote: unref(getProps).serverSort,
        },
        'merge-cells': unref(getProps).mergeCells,
        // 导出
        'export-config': {},
        // 打印
        'print-config': {},
        // 自定义列 storage 本地保存
        'custom-config': { storage: true },
        onCheckboxAll: unref(getProps).onCheckboxAll,
        onCheckboxChange: unref(getProps).onCheckboxChange,
      }));

      onMounted(() => {
        if (unref(getProps).showToolbar) {
          // 将表格和工具栏进行关联
          const $table = xTable.value;
          const $toolbar = xToolbar.value;
          $table.connect($toolbar);
        }
        Sortable.create(xTable.value.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
          handle: '.dragBtn',
          onEnd: (customEvent: any) => {
            emit('dragItem', customEvent);
          },
        });
      });

      return () => (
        <div v-loading={unref(getProps).loading}>
          {renderToolbars()}
          {renderTable()}
        </div>
      );

      function renderToolbars() {
        return unref(getProps).showToolbar ? renderToolbar() : null;
      }
      function renderTable() {
        return (
          <vxe-table
            {...unref(resultProps)}
            v-slots={{
              empty: () => {
                return (
                  <div class="empty">
                    <a-empty />
                  </div>
                );
              },
            }}
          >
            {unref(getProps).tableTitle.map((item: any) => {
              return item.children && item.children.length ? (
                <XColumn item={item} />
              ) : (
                <OColumn item={item} />
              );
            })}
          </vxe-table>
        );
      }

      function renderToolbar() {
        return (
          <vxe-toolbar custom print ref={xToolbar} refresh={{ query: unref(getProps).refresh }}>
            {{
              buttons: () => {
                return unref(getProps).total > 0 && unref(getProps).showPage ? (
                  <a-pagination
                    v-model:current={unref(getProps).page}
                    v-model:pageSize={unref(getProps).limit}
                    page-size-options={unref(getProps).pageSizeOptions}
                    show-size-changer={unref(getProps).showSizeChange}
                    show-quick-jumper={unref(getProps).showQuickJumper}
                    total={unref(getProps).total}
                    onShowSizeChange={unref(getProps).onShowSizeChange}
                    onChange={unref(getProps).onChange}
                  />
                ) : null;
              },
              tools: () => {
                return (
                  <div class="export">
                    <a-button
                      shape="circle"
                      v-slots={{
                        icon: () => <Icon icon="ant-design:export-outlined" />,
                      }}
                      onClick={exportDataEvent}
                    />
                  </div>
                );
              },
            }}
          </vxe-toolbar>
        );
      }

      function exportDataEvent() {
        const $table = xTable.value;
        $table.openExport({
          original: true,
        });
      }
    },
  });
</script>

<style scoped lang="less">
  .export {
    margin-right: 12px;

    .ant-btn-icon-only {
      width: 34px;
      height: 34px;
    }
  }

  .empty {
    margin: 60px 0;
  }

  .vxe-toolbar {
    border: 1px solid @border-color-common;
    border-bottom: none;
  }
</style>
