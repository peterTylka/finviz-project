import { EChartsOption, EChartsType, init } from "echarts";
import { TreeNode } from "echarts/types/src/data/Tree.js";
import { useEffect, useRef } from "react";

interface ChartProps {
  data: any[] | undefined;
  getOptions: (data: any[]) => EChartsOption;
}

function getPathToRoot(node: TreeNode): TreeNode[] {
  const path = [];
  while (node) {
    node = node.parentNode;
    node && path.push(node);
  }
  return path.reverse();
}

export function Chart({ data, getOptions }: ChartProps) {
  const chartRef = useRef(null);
  const chart = useRef<EChartsType | null>(null);
  const chartData = useRef();
  const chartSeries = useRef();

  useEffect(() => {
    if (chartRef.current && data?.length) {
      chart.current = init(chartRef.current);
      console.log("%c init chart", "background-color: skyblue", {
        chart,
        data,
      });
      // chart.current.setOption(getOptions(data));
      chart.current.setOption(getOptions(data));
      // chart.current.setOption(getOptions(data.children));
      // @ts-expect-error is private
      chartSeries.current = chart.current.getModel().getSeries()[0];
      chartData.current = chartSeries.current?.getAllData()[0].data;

      function showChartItem(name: string) {
        const targetNode: TreeNode = chartData.current.tree.getNodeByDataIndex(
          chartData.current._nameList.findIndex((item) => item === name)
        );
        chart.current.dispatchAction({
          type: "treemapRootToNode",
          // zobrat to z tree._nodes a dostat sa cez funkciu k parentnodom
          targetNode: targetNode,
          seriesId: chartSeries.current.id,
        });
        console.log("%c targetNode", "background-color: skyblue", {
          targetNode,
          parents: getPathToRoot(targetNode),
        });
      }

      setTimeout(() => {
        showChartItem("ImageNet 2011 Fall Release");
      }, 3000);

      setTimeout(() => {
        showChartItem("Misc");
      }, 6000);

      setTimeout(() => {
        showChartItem("paper");
      }, 9000);

      setTimeout(() => {
        showChartItem("ImageNet 2011 Fall Release");
      }, 12000);
    }
  }, [data]);

  globalThis.chart = chart.current;
  globalThis.chartData = chartData.current;
  globalThis.chartSeries = chartSeries.current;

  // search
  // treemap getinitialdata
  // tree.data._idList.findIndex(item => item === 'Misc')
  // chart.current.getModel().getSeries()[0].getAllData()[0].data._nameList
  // tree.getNodeByDataIndex(30883)
  // teoreticky
  // real click na drill downMisc ma payload
  // from: "viewChart_73"
  // seriesId: "\u0000series\u00000\u00000"
  // targetNode: {…}
  // type: "treemapRootToNode"
  // moj click so seriesId namiesto seriesIndex fungoval aj bez from
  // chart.current.dispatchAction({
  //     type: 'treemapRootToNode',
  //   //   seriesIndex: 0,
  //     targetNode: a,
  //     seriesId: "\u0000series\u00000\u00000"
  //   })

  return (
    <div id="chart" ref={chartRef} style={{ width: "100%", height: "100vh" }} />
  );
}
