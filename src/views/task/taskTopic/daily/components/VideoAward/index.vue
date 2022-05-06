<script lang="tsx">
  import { defineComponent, reactive } from 'vue';

  export default defineComponent({
    props: {
      defaultValue: {
        type: Array,
        default: () => [],
      },
      text: {
        type: String,
        default: '分钟，',
      },
      minLength: {
        type: Number,
        default: 3,
      },
      params: {
        type: Object,
        default: () => {
          return {
            duration: '',
            reward: '',
          };
        },
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      let data = reactive<any>([]);
      const paramsList = Object.keys(props.params);

      if (props.defaultValue && props.defaultValue.length) {
        props.defaultValue.forEach((item: any) => {
          data.push(item);
        });
        emitData();
      } else {
        while (data.length < props.minLength) {
          addItem();
        }
      }

      return () => (
        <div>
          {data.map((item: any, index: number) => (
            <div class="row">
              <div class="left">
                <span>观看</span>
                <a-input
                  v-model:value={data[index][paramsList[0]]}
                  onInput={() => {
                    emitData();
                  }}
                />
                <span>{props.text}</span>
                <span>奖励</span>
                <a-input
                  v-model:value={data[index][paramsList[1]]}
                  onInput={() => {
                    emitData();
                  }}
                />
                <span>元</span>
              </div>
              <div class="right">
                {index === 0 ? (
                  <a-button type="primary" onClick={addItem}>
                    添加
                  </a-button>
                ) : null}
                {data.length > 3 ? (
                  <a-button
                    danger
                    onClick={() => {
                      deleteItem(index);
                    }}
                  >
                    删除
                  </a-button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      );

      function addItem() {
        data.push({
          [paramsList[0]]: '',
          [paramsList[1]]: '',
        });
      }

      function deleteItem(index: number) {
        data.splice(index, 1);
      }

      function emitData() {
        emit('change', data);
      }
    },
  });
</script>

<style scoped lang="less">
  .row {
    display: flex;
    margin-bottom: 5px;
    .left {
      display: flex;
      align-items: center;
      span {
        white-space: nowrap;
      }
      .ant-input {
        width: 100px;
        margin: 0 5px;
      }
    }
    .right {
      margin-left: 15px;
      button {
        margin-right: 10px;
      }
    }
  }
</style>
