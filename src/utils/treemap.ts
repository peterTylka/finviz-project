import { Option } from "@/types";
import { EChartsType } from "echarts";
import { TreeNode } from "echarts/types/src/data/Tree.js";

function getNodeFullPath(node: TreeNode): TreeNode[] {
  const path = [];
  const startNode = node;
  while (node) {
    node = node.parentNode;
    node && path.push(node);
  }
  const finalPathWithTargetNodeWithoutRoot = [
    ...path.reverse(),
    startNode,
  ].slice(1);
  return finalPathWithTargetNodeWithoutRoot;
}

function getChartData(chart: EChartsType) {
  // @ts-expect-error private method is safe to use
  const series = chart.getModel().getSeries()[0];
  const result = {
    series,
    tree: series?.getAllData()[0].data?.tree,
  };
  return result;
}

export function getFullTreeOptions(chart: EChartsType): Option[] {
  const { tree } = getChartData(chart);
  const options: Option[] = tree._nodes.map((node: TreeNode) => {
    return {
      name: node.name,
      value: node.dataIndex,
    };
  });
  return options;
}

export function showChartItem(chart: EChartsType, nodeDataIndex: number) {
  const { series, tree } = getChartData(chart);
  const targetNode: TreeNode = tree.getNodeByDataIndex(nodeDataIndex);

  const targetNodePath = getNodeFullPath(targetNode);

  const SHOW_DELAY = 1500;
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
