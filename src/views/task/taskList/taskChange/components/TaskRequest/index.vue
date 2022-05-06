<script lang="tsx">
  import { defineComponent, reactive } from 'vue';
  import MImageUploadView from '/@/components/MyselfView/MImageUploadView.vue';

  interface TaskRequest {
    taskDesc: string;
    taskImage: string;
  }

  export default defineComponent({
    emits: ['change'],
    setup(props, { emit }) {
      const paramsList = reactive<TaskRequest[]>([
        {
          taskDesc: '',
          taskImage: '',
        },
      ]);

      return () => (
        <div class="taskRequest">
          {paramsList.map((item, index) => {
            return (
              <div class="row">
                <div class="left">
                  <p>
                    <span class="label">描述：</span>
                    <div>
                      <a-textarea
                        v-model:value={item.taskDesc}
                        onChange={() => {
                          emit('change', paramsList);
                        }}
                      />
                    </div>
                  </p>
                  <p>
                    <span class="label">示意图：</span>
                    <MImageUploadView
                      defaultValue={item.taskImage ?? ''}
                      onChange={(value: any) => {
                        item.taskImage = value;
                        emit('change', paramsList);
                      }}
                    />
                  </p>
                </div>
                <div class="right">
                  <a-button
                    danger={true}
                    onClick={() => {
                      paramsList.splice(index, 1);
                    }}
                  >
                    删除
                  </a-button>
                  {paramsList.length - 1 === index ? (
                    <a-button
                      type="primary"
                      onClick={() => {
                        paramsList.push({
                          taskDesc: '',
                          taskImage: '',
                        });
                      }}
                    >
                      添加
                    </a-button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      );
    },
  });
</script>

<style scoped lang="less">
  .taskRequest {
    .row {
      display: flex;
      margin-bottom: 15px;
      .left {
        background-color: #f1f1f1;
        padding: 15px;
        border-radius: 5px;
        p {
          display: flex;
          justify-content: flex-start;
          .label {
            width: 100px;
          }
        }
      }
      .right {
        width: 150px;
        margin-left: 5px;
        button {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
