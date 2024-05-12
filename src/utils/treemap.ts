import { DEFAULT_CHART_OPTIONS, SHOW_DELAY } from "@/constants";
import { EChartsOption, EChartsType } from "echarts";
import { TreeNode } from "echarts/types/src/data/Tree.js";
import { merge } from "lodash";
import { getTreeChartData, getTreeNodeFullPath } from ".";

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

export function showTreemapItem(chart: EChartsType, nodeDataIndex: number) {
  const { series, tree } = getTreeChartData(chart);
  const targetNode: TreeNode = tree.getNodeByDataIndex(nodeDataIndex);
  const targetNodePath = getTreeNodeFullPath(targetNode);

  targetNodePath.forEach((pathNode, index) => {
    setTimeout(() => {
      chart.dispatchAction({
        type: "treemapRootToNode",
        targetNode: pathNode,
        seriesId: series.id,
      });
    }, index * SHOW_DELAY);
  });
}
