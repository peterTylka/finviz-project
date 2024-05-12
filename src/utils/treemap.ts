import { EChartsType } from "echarts";
import { TreeNode } from "echarts/types/src/data/Tree.js";

function getPathToRoot(node: TreeNode): TreeNode[] {
  const path = [];
  while (node) {
    node = node.parentNode;
    node && path.push(node);
  }
  return path.reverse();
}

function getChartData(chart: EChartsType) {
  // @ts-expect-error private method is safe to use
  const series = chart.getModel().getSeries()[0];
  return {
    series,
    data: series?.getAllData()[0].data,
  };
}

function getTreeNodeByName(data: any, name: string): TreeNode {
  return data.tree.getNodeByDataIndex(
    data._nameList.findIndex((item) => item === name)
  );
}

export function showChartItem(chart: EChartsType, name: string) {
  const { data, series } = getChartData(chart);
  const targetNode: TreeNode = getTreeNodeByName(data, name);

  const targetNodePathWithoutRoot = [
    ...getPathToRoot(targetNode),
    targetNode,
  ].slice(1);

  const SHOW_DELAY = 1500;
  targetNodePathWithoutRoot.forEach((pathNode, index) => {
    setTimeout(() => {
      chart.dispatchAction({
        type: "treemapRootToNode",
        targetNode: pathNode,
        seriesId: series.id,
      });
    }, (index + 1) * SHOW_DELAY);
  });
}
