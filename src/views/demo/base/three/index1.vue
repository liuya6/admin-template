<script lang="tsx">
  import { defineComponent, ref, reactive, unref, toRefs } from 'vue';

  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    setup() {
      let count = ref(0);
      let obj = reactive({
        name: 'xx',
        age: 20,
      });

      const obj2 = toRefs(obj);

      return () => (
        <div class="base">
          <PageWrapper>
            index1
          </PageWrapper>
        </div>
      );
    },
  });
</script>
<style scoped lang="less"></style>
