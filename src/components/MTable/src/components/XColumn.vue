<script lang="tsx">
  import { defineComponent, computed, unref } from 'vue';

  import OColumn from './OColumn.vue';
  import XColumn from '/@/components/MTable/src/components/XColumn.vue';

  export default defineComponent({
    name: 'XColumn',

    setup(props, { attrs }) {
      const getProps = unref(
        computed(() => {
          return { ...props, ...attrs } as any;
        }),
      );

      return () => (
        <vxe-colgroup title={getProps.item.title}>
          {getProps.item.children.map((childItem: any) => {
            return childItem.children && childItem.children.length ? (
              <XColumn item={childItem} />
            ) : (
              <OColumn item={childItem} />
            );
          })}
        </vxe-colgroup>
      );
    },
  });
</script>

<style scoped lang="less"></style>
