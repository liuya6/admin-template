<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Image } from 'ant-design-vue';

  import { TableDataTips } from '/@/components/MTable';

  export default defineComponent({
    props: {
      imgData: {
        type: [String, Array],
      },
      text: {
        type: String,
      },
    },
    setup(props) {
      if (!props.imgData) {
        console.warn('图片地址为空');
        return;
      }
      const imgList: any[] = typeof props.imgData === 'string' ? [props.imgData] : props.imgData;

      return () => (
        <div
          class="imgBox"
          onClick={(e: Event) => {
            e.stopPropagation();
          }}
        >
          <div class="left">
            <Image.PreviewGroup>
              {imgList.map((item: any) => (
                <Image width={40} src={item} />
              ))}
            </Image.PreviewGroup>
          </div>
          {props.text ? <TableDataTips text={props.text} placeholderWidth={40} /> : null}
        </div>
      );
    },
  });
</script>

<style scoped lang="less">
  .imgBox {
    line-height: 40px;
    .left {
      height: 40px;
      float: left;
      overflow: hidden;
      :deep(.ant-image) {
        margin-right: 5px;
      }
    }
  }
</style>
