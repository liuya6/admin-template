<script lang="tsx">
  import { defineComponent, reactive, unref, watch } from 'vue';
  import { Select } from 'ant-design-vue';
  import { formatFileBeanList } from '/@/components/MyselfView/UploadControl';

  export default defineComponent({
    props: {
      text: {
        type: String,
        default: '元，',
      },
      minLength: {
        type: Number,
        default: 3,
      },
      options: {
        type: Object,
        default: [],
      },
      params: {
        type: Object,
        default: () => {
          return {
            amount: '',
            watchNums: '',
            cycle: '',
          };
        },
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      let data = reactive<any>([]);
      let paramsList = Object.keys(props.params);
      watch(
        () => unref(props.options),
        () => {
          data = props.options;
        },
      );
      while (data.length < props.minLength) {
        addItem();
      }
      const choseOption = [
        {
          label: '每天',
          value: '1',
        },
        {
          label: '每周',
          value: '2',
        },
        {
          label: '每月',
          value: '3',
        },
      ];

      return () => (
        <div>
          {data.map((item: any, index: number) => (
            <div class="row">
              <div class="left">
                <span>档位{index + 1}： 提现金额：</span>
                <a-input
                  v-model:value={data[index][paramsList[0]]}
                  onInput={() => {
                    emitData();
                  }}
                />
                <span>{props.text}</span>
                <span>观看广告数</span>
                <a-input
                  v-model:value={data[index][paramsList[1]]}
                  onInput={() => {
                    emitData();
                  }}
                />
                <span>个， 周期：</span>
                <Select
                  v-model:value={data[index][paramsList[2]]}
                  onChange={() => {
                    emitData();
                  }}
                  style="width:80px"
                  options={choseOption}
                  colProps={{ span: 5 }}
                />
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
          [paramsList[2]]: '',
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
