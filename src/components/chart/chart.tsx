import { EChartsOption, EChartsType, init } from "echarts";
import { useEffect, useRef, useState } from "react";
import { Autocomplete } from "..";

interface ChartProps {
  data: any[] | undefined;
  getOptions: (data: any[]) => EChartsOption;
}

export function Chart({ data, getOptions }: ChartProps) {
  const chartRef = useRef(null);
  const [chart, setChart] = useState<EChartsType | null>(null);

  useEffect(() => {
    if (chartRef.current && data?.length) {
      const chart = init(chartRef.current);
      chart.setOption(getOptions(data));
      setChart(chart);
    }
  }, [data]);

  useEffect(() => {
    if (!chart) {
      return;
    }

    const onResize = () => {
      chart?.resize();
    };
    window.addEventListener("resize", onResize);
  }, [chart]);

  globalThis.chart = chart;

  return (
    <div className="h-screen w-full p-5 flex flex-column justify-center items-center">
      <Autocomplete chart={chart} />

      <div id="chart" ref={chartRef} className="w-full grow" />
    </div>
  );
}
