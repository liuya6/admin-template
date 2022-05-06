<script lang="tsx">
  import { computed, defineComponent, PropType, ref, unref } from 'vue';
  import { Button, ButtonProps, message } from 'ant-design-vue';

  import { BasicForm, FormActionType } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { schemas } from './BountyTaskConfig';
  import { useGo, useRedo } from '/@/hooks/web/usePage';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useRouter } from 'vue-router';
  import { t, useI18n } from '/@/hooks/web/useI18n';
  import { addAppInfo } from '/@/api/app/AppApi';
  import { Message } from 'postcss';
  import { appListStateStoreWithOut, useAppListStateStore } from '/@/store/modules/AppListStore';
  import { AppInfoState } from '/#/store';
  import {
    editTopicRecommend,
    editTopicSend,
    taskEdit,
    taskGroupList,
    taskList,
  } from '/@/api/task';
  import { getLongTask, getTopicRecommendList, getTopicSendList } from '/@/api/task/TopicApi';

  export default defineComponent({
    components: { Button },
    setup() {
      const formElRef = ref<Nullable<FormActionType>>(null);
      const flag = ref('1'); //默认赏金派发
      const go = useGo();
      const router = useRouter();
      const { createMessage } = useMessage();
      const submitBtn: any = { text: '提交' };
      const resetBtn: any = { text: '取消' };
      const actionColOptions: any = { span: 24 };
      console.log(router.currentRoute.value.meta.title, 'router.currentRoute');
      const title = useI18n().t(router.currentRoute.value.meta.title);
      let choseTable = ref([]);

      const getTask = async (params) => {
        choseTable.value = [];
        let value;
        if (unref(flag) == '1') {
          //派发任务
          value = await getTopicSendList(params);
        } else {
          value = await getTopicRecommendList(params);
        }
        if (value == null || !value.success || value.result == null) {
          return;
        }
        choseTable.value = value.result;
        choseTable.value.forEach((item: any) => {
          if (item.groupName) {
            item.name = item.groupName;
          }
          if (item.applicationNums) {
            item.taskNums = item.applicationNums;
          }
          if (item.groupId) {
            item.id = item.groupId;
          }
        });
        console.log(choseTable, 'getTask');
      };

      //请求接口数据
      const initTaskData = async (params) => {
        let value;
        if (unref(flag) == '1') {
          //派发任务
          value = await taskList(params);
        } else {
          value = await taskGroupList(params);
        }
        return value;
      };
      // const appListStateStore: any = useAppListStateStore();
      // const info: any = computed(() => appListStateStore.getState);
      // console.log(info.value, 'info');
      return () => (
        <PageWrapper>
          <CollapseContainer title={title} canExpan={false}>
            <BasicForm
              actionColOptions={actionColOptions}
              labelWidth={100}
              ref={formElRef}
              schemas={schemas(flag, getTask, choseTable, initTaskData)}
              onSubmit={handleSubmit}
              onReset={cancel}
              submitButtonOptions={submitBtn}
              resetButtonOptions={resetBtn}
            />
          </CollapseContainer>
        </PageWrapper>
      );

      function cancel() {
        router.back();
      }

      async function handleSubmit(params: any) {
        console.log(params, 'handleSubmit》》params');
        let value;
        if (unref(flag) == '1') {
          //派发任务
          value = await editTopicSend(params);
        } else {
          value = await editTopicRecommend(params);
        }
        if (value == null || !value.success) {
          return;
        }
        message.success(value.message);
        router.back();
      }
    },
  });
</script>

<style scoped lang="less"></style>
