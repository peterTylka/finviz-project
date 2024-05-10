import { EChartsOption, init } from "echarts";
import { useEffect, useRef } from "react";

interface ChartProps {
  data: any[] | undefined;
  getOptions: (data: any[]) => EChartsOption;
}

export function Chart({ data, getOptions }: ChartProps) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data?.length) {
      const chart = init(chartRef.current);
      console.log("%c init chart", "background-color: skyblue", {
        chart,
        data,
      });
      chart.setOption(getOptions(data));
    }
  }, [data]);

  return (
    <div id="chart" ref={chartRef} style={{ width: "100%", height: "100vh" }} />
  );
}
