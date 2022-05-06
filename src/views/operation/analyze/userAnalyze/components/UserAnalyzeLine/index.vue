<script lang="tsx">
  import { defineComponent, PropType, ref, Ref } from 'vue';
  import type { EChartsOption } from 'echarts';

  import { useECharts } from '/@/hooks/web/useECharts';
  import { OperationService } from '/@/api';

  export default defineComponent({
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: 'calc(100vh / 2)',
      },
      paramsObj: {
        type: Object,
      },
    },
    setup(props, { expose }) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);

      expose({
        initData,
      });

      return () => (
        <div
          ref={chartRef}
          style={{
            width: props.width,
            height: props.height,
            marginBottom: '10px',
          }}
        />
      );

      async function initData(params: any) {
        try {
          const { result } = await OperationService.getUserAnalyzeChart(params);
          const lineData: any = [];
          const category: any = [];
          result.forEach((item: any) => {
            lineData.push(item.numbers);
            category.push(item.date);
          });
          mSetOptions(setOptions, lineData, category);
        } catch (e) {
          console.warn(e);
        }
      }

      function mSetOptions(
        setOptions: (options: EChartsOption, clear?: boolean) => void,
        lineData: any,
        category: any,
      ) {
        setOptions({
          backgroundColor: '#fff',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true,
                backgroundColor: '#333',
              },
            },
          },
          legend: {
            data: ['line', 'bar'],
            textStyle: {
              color: '#ccc',
            },
          },
          xAxis: {
            data: category,
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: '#ccc',
              },
            },
          },
          series: [
            {
              name: 'line',
              type: 'line',
              smooth: true,
              showAllSymbol: 'auto',
              symbol: 'emptyCircle',
              symbolSize: 15,
              data: lineData,
            },
            {
              name: 'bar',
              type: 'bar',
              barWidth: 10,
              itemStyle: {
                borderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#14c8d4' },
                  { offset: 1, color: '#43eec6' },
                ]),
              },
              data: lineData,
            },
          ],
        });
      }
    },
  });
</script>
