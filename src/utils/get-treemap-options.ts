import { EChartsOption } from "echarts";

export function getTreeMapOptions(data: any[]): EChartsOption {
  return {
    series: [
      {
        type: "treemap",
        leafDepth: 1,
        data,
      },
    ],
  };
}
