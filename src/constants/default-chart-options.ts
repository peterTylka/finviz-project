import { EChartsOption } from "echarts";
import { CallbackDataParams } from "echarts/types/src/util/types.js";

export const DEFAULT_CHART_OPTIONS: Partial<EChartsOption> = {
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove",
  },
  series: [
    {
      label: {
        formatter: (params: CallbackDataParams) => {
          return `${params.name} [${params.value}]`;
        },
      },
    },
  ],
};
