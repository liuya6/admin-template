<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';

  import BanIp from './components/BanIp/index.vue';
  import RegisterLimit from './components/RegisterLimit/index.vue';

  export default defineComponent({
    setup() {
      const activeKey = ref('1');

      return () => (
        <div class="ipLimit">
          <Tabs v-model:activeKey={activeKey.value}>
            <TabPane key="1" tab="禁用ip">
              {activeKey.value === '1' ? <BanIp /> : null}
            </TabPane>
            <TabPane key="2" tab="注册限制">
              {activeKey.value === '2' ? <RegisterLimit /> : null}
            </TabPane>
          </Tabs>
        </div>
      );
    },
  });
</script>
<style scoped lang="less">
  .ipLimit {
    :deep(.ant-tabs-nav-container) {
      background-color: #fff;
    }
    :deep(.ant-tabs-bar) {
      margin-bottom: 0;
    }
  }
</style>
