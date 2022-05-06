<script lang="tsx">
  import { defineComponent } from 'vue';

  import { useCount } from '/@/views/demo/base/one/use';

  export default defineComponent({
    emits: ['change'],
    setup(_, { emit }) {
      const { numbers, add } = useCount();

      return () => (
        <div>
          <p>{numbers.value}</p>
          <a-button
            onClick={() => {
              add(2);
              emit('change', numbers);
            }}
          >
            add
          </a-button>
        </div>
      );
    },
  });
</script>
<style scoped lang="less"></style>
