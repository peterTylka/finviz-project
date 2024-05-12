import { DEFAULT_CHART_OPTIONS, SHOW_DELAY } from "@/constants";
import { Option } from "@/types";
import { EChartsOption, EChartsType } from "echarts";
import { TreeNode } from "echarts/types/src/data/Tree.js";
import { merge } from "lodash";

export function getTreeOptions(data: any[]): EChartsOption {
  return merge(DEFAULT_CHART_OPTIONS, {
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
  });
}

export function getTreeChartData(chart: EChartsType) {
  // @ts-expect-error private method is safe to use
  const series = chart.getModel().getSeries()[0];
  const result = {
    series,
    tree: series?.getAllData()[0].data?.tree,
  };
  return result;
}

export function getTreeNodeFullPath(node: TreeNode): TreeNode[] {
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

export function getFullTreeOptions(chart: EChartsType): Option[] {
  const { tree } = getTreeChartData(chart);
  const options: Option[] = tree._nodes.map((node: TreeNode) => {
    const fullPath = getTreeNodeFullPath(node);
    const parentsPathArray = fullPath.length ? fullPath.slice(0, -1) : [];
    const parentsPath = parentsPathArray
      .map((subPath) => subPath.name)
      .join(" > ");

    return {
      name: node.name,
      parentsPath,
      value: node.dataIndex,
    };
  });
  return options;
}

export function showTreeItem(chart: EChartsType, nodeDataIndex: number) {
  const { tree } = getTreeChartData(chart);
  const targetNode: TreeNode = tree.getNodeByDataIndex(nodeDataIndex);
  const targetNodePath = getTreeNodeFullPath(targetNode);

  targetNodePath.forEach((pathNode, index) => {
    if (!pathNode.isExpand) {
      setTimeout(() => {
        chart.dispatchAction({
          type: "treeExpandAndCollapse",
          dataIndex: pathNode.dataIndex,
        });
      }, index * SHOW_DELAY);
    }
  });
}
