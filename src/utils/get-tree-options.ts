import { EChartsOption } from "echarts";

export function getTreeOptions(data: any[]): EChartsOption {
  return {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
    },
    series: [
      {
        type: "tree",
        id: 0,
        name: "tree1",
        data,

        top: "10%",
        left: "8%",
        bottom: "22%",
        right: "20%",

        symbolSize: 7,

        edgeShape: "polyline",
        edgeForkPosition: "63%",
        initialTreeDepth: 0,

        lineStyle: {
          width: 2,
        },

        label: {
          backgroundColor: "#fff",
          position: "left",
          verticalAlign: "middle",
          align: "right",
        },

        leaves: {
          label: {
            position: "right",
            verticalAlign: "middle",
            align: "left",
          },
        },

        emphasis: {
          focus: "descendant",
        },

        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  };
}
