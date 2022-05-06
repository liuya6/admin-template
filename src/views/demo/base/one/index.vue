<script lang="tsx">
  import { defineComponent, ref, reactive, unref, toRefs } from 'vue';

  import { PageWrapper } from '/@/components/Page';

  import { useCount } from './use';
  import { useDemoStore } from '/@/store/modules/demo';

  export default defineComponent({
    setup() {
      const demoStore = useDemoStore();

      let count = ref(0);
      let obj = reactive({
        name: 'xx',
        age: 20,
      });

      const obj2 = toRefs(obj);

      const { numbers, add } = useCount();

      return () => (
        <div class="base">
          <PageWrapper>
            <div>
              <span>{unref(count)}</span>
              <a-button
                onClick={() => {
                  count.value++;
                }}
              >
                add
              </a-button>
            </div>
            <br />
            <div>
              <p>{obj.name}</p>
              <p>{obj.age}</p>
              <a-button
                onClick={() => {
                  obj.age++;
                }}
              >
                add
              </a-button>
            </div>
            <br />
            <div>
              <p>{obj2.name.value}</p>
              <p>{obj2.age.value}</p>
              <a-button
                onClick={() => {
                  obj2.age.value++;
                }}
              >
                add
              </a-button>
            </div>
            <br />
            <div>
              <p>{unref(numbers)}</p>
              <a-button onClick={() => add(2)}>add</a-button>
            </div>
            <br />
            <h1>pinia</h1>
            <div>
              <p>{demoStore.countA}</p>
              <a-button onClick={() => demoStore.setCountA(20)}>add</a-button>
              <p>sum: {demoStore.getSum}</p>
            </div>
          </PageWrapper>
        </div>
      );
    },
  });
</script>
<style scoped lang="less"></style>
