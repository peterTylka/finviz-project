import { Option } from "@/types";
import { getFullTreeOptions, showChartItem } from "@/utils";
import { EChartsOption, EChartsType, init } from "echarts";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

interface ChartProps {
  data: any[] | undefined;
  getOptions: (data: any[]) => EChartsOption;
}

export function Chart({ data, getOptions }: ChartProps) {
  const chartRef = useRef(null);
  const [chart, setChart] = useState<EChartsType | null>(null);
  const [options, setOptions] = useState([] as Option[]);

  useEffect(() => {
    if (chartRef.current && data?.length) {
      const chart = init(chartRef.current);
      chart.setOption(getOptions(data));
      const options = getFullTreeOptions(chart);
      setOptions(options);
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

  const onSelectedOption = useCallback(
    (selectedOptions: any[]) => {
      if (chart && !isEmpty(selectedOptions)) {
        showChartItem(chart, (selectedOptions[0] as Option).value);
      }
    },
    [chart]
  );

  globalThis.chart = chart;

  return (
    <div className="h-screen w-full p-5 flex flex-column justify-center items-center">
      <div className="flex justify-center">
        <Typeahead
          id="dataset-typeahead"
          labelKey="name"
          onChange={onSelectedOption}
          options={options}
          placeholder="Choose a name..."
        />
      </div>

      <div id="chart" ref={chartRef} className="w-full grow" />
    </div>
  );
}
