import { Option } from "@/types";
import { getFullTreeOptions, showChartItem } from "@/utils";
import { EChartsOption, EChartsType, init } from "echarts";
import { isEmpty } from "lodash";
import { useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

interface ChartProps {
  data: any[] | undefined;
  getOptions: (data: any[]) => EChartsOption;
}

export function Chart({ data, getOptions }: ChartProps) {
  const chartRef = useRef(null);
  const chart = useRef<EChartsType | null>(null);
  const [options, setOptions] = useState([] as Option[]);

  useEffect(() => {
    if (chartRef.current && data?.length) {
      chart.current = init(chartRef.current);
      chart.current.setOption(getOptions(data));
      if (chart.current != null) {
        const options = getFullTreeOptions(chart.current);
        setOptions(options);
      }
    }
  }, [data]);

  globalThis.chart = chart.current;

  return (
    // <div style={{ width: "100%", height: "100vh" }}>
    <>
      <div style={{ zIndex: 10 }}>
        <Typeahead
          id="dataset-typeahead"
          labelKey="name"
          onChange={(selectedOptions) => {
            console.log("%c chosen", "background-color: skyblue", {
              option: selectedOptions,
            });
            if (!isEmpty(selectedOptions)) {
              showChartItem(
                chart.current,
                (selectedOptions[0] as Option).value
              );
            }
          }}
          options={options}
          placeholder="Choose a name..."
          // selected={singleSelections}
        />
      </div>

      <div
        id="chart"
        ref={chartRef}
        style={{ width: "100%", height: "90vh" }}
      />
    </>
    // </div>
  );
}
