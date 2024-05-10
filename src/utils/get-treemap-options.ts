import { DEFAULT_CHART_OPTIONS } from "@/constants";
import { EChartsOption } from "echarts";
import { merge } from "lodash";

export function getTreeMapOptions(data: any[]): EChartsOption {
  return merge(DEFAULT_CHART_OPTIONS, {
    series: [
      {
        type: "treemap",
        leafDepth: 1,
        data,
      },
    ],
  });
}
