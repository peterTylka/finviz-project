import { showChartItem } from "@/utils";
import { EChartsOption, EChartsType, init } from "echarts";
import { useEffect, useRef } from "react";

interface ChartProps {
  data: any[] | undefined;
  getOptions: (data: any[]) => EChartsOption;
}

export function Chart({ data, getOptions }: ChartProps) {
  const chartRef = useRef(null);
  const chart = useRef<EChartsType | null>(null);

  useEffect(() => {
    if (chartRef.current && data?.length) {
      chart.current = init(chartRef.current);
      chart.current.setOption(getOptions(data));
      if (chart.current != null) {
        setTimeout(() => {
          showChartItem(chart.current, "Misc");
        }, 2000);

        setTimeout(() => {
          showChartItem(chart.current, "paper");
        }, 20000);

        setTimeout(() => {
          showChartItem(chart.current, "ImageNet 2011 Fall Release");
        }, 40000);
      }
    }
  }, [data]);

  globalThis.chart = chart.current;

  return (
    <div id="chart" ref={chartRef} style={{ width: "100%", height: "100vh" }} />
  );
}
