import { EChartsOption, EChartsType, init } from "echarts";
import { useEffect, useRef, useState } from "react";
import { Autocomplete, Skeleton } from "..";

interface ChartProps {
  data: any[] | undefined;
  getOptions: (data: any[]) => EChartsOption;
}

export function Chart({ data, getOptions }: ChartProps) {
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const [chart, setChart] = useState<EChartsType | null>(null);

  useEffect(() => {
    if (chartRef.current && data?.length) {
      const chart = init(chartRef.current);
      chart.setOption(getOptions(data));
      setChart(chart);
      setLoading(false);
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

  return (
    <div className="h-screen w-full p-5 flex flex-column justify-center items-center">
      <Autocomplete chart={chart} />

      <div className="w-full grow relative mt-4">
        {loading && (
          <div className="w-full h-full absolute z-10">
            <Skeleton />
          </div>
        )}

        <div id="chart" ref={chartRef} className="w-full h-full absolute z-5" />
      </div>
    </div>
  );
}
