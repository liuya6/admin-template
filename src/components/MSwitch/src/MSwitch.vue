<script lang="tsx">
  import { computed, defineComponent, ref, unref } from 'vue';
  import { Switch } from 'ant-design-vue';

  export default defineComponent({
    props: {
      defaultValue: Boolean,
    },
    emits: ['change'],
    setup(props, { attrs, emit }) {
      const flag = ref<boolean>(false);

      const getProps = unref(
        computed(() => {
          return { ...props, ...attrs };
        }),
      );

      if (getProps.defaultValue) {
        flag.value = getProps.defaultValue;
      }

      return () => (
        <div>
          <Switch v-model:checked={flag.value} {...getProps} onChange={mChange} />
        </div>
      );

      function mChange() {
        emit('change', flag.value);
      }
    },
  });
</script>

<style scoped lang="less"></style>
