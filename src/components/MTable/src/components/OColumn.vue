<script lang="tsx">
  import { computed, defineComponent, unref } from 'vue';
  import TableDataTips from './TableDataTips.vue';
  import TableHeaderTips from './TableHeaderTips.vue';

  export default defineComponent({
    setup(props, { attrs }) {
      const getProps = unref(
        computed(() => {
          return { ...props, ...attrs } as any;
        }),
      );

      const minWidth = computed(() => {
        let defaultWidth = 100;
        if (getProps.item.type === 'checkbox' || getProps.item.type === 'drag') {
          defaultWidth = 70;
        }
        return getProps.item.minWidth || getProps.item.width || defaultWidth;
      });

      const widthValue = computed(() => {
        return getProps.item.type === 'checkbox' || getProps.item.type === 'drag'
          ? getProps.item.width || 70
          : getProps.item.width;
      });

      return () => (
        <vxe-column
          min-width={unref(minWidth)}
          width={unref(widthValue)}
          v-slots={getSlots()}
          {...getProps.item}
        />
      );

      function getSlots() {
        const slots: any = {
          default: (scope: any) => getDefaultSlots(scope),
          footer: (scope: any) => getFooterSlots(scope),
        };

        if (getProps.item.headerTips) {
          slots.header = () => getHeaderSlots();
        }

        return slots;
      }

      function getDefaultSlots(scope: any) {
        if (getProps.item.render) {
          return getProps.item.render(scope);
        }
        if (getProps.item.type === 'checkbox') return;
        const defaultText = scope.row[getProps.item.field];
        const text =
          getProps.item.formatter && defaultText !== null && defaultText !== undefined
            ? getProps.item.formatter(defaultText)
            : defaultText;
        const placeholder =
          getProps.item.editRenderConfig && getProps.item.editRenderConfig.placeholder
            ? getProps.item.editRenderConfig.placeholder
            : '';
        const resultText =
          (text === null || text === undefined || text === '') && placeholder ? placeholder : text;
        return <TableDataTips text={resultText} />;
      }

      function getHeaderSlots() {
        if (getProps.item.headerTips) {
          return <TableHeaderTips title={getProps.item.title} tips={getProps.item.headerTips} />;
        }
      }

      function getFooterSlots(scope: any) {
        const list = scope.items;
        const columnIndex = scope.$columnIndex;
        return <TableDataTips text={list[columnIndex]} />;
      }
    },
  });
</script>

<style scoped lang="less"></style>
