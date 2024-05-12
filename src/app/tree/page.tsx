"use client";
import { Chart } from "@/components";
import { useSynsets } from "@/hooks";
import { getTreeOptions, showTreeItem } from "@/utils";

export default function TreePage() {
  const synsets = useSynsets();

  return (
    <Chart
      data={synsets}
      getChartOptions={getTreeOptions}
      showItem={showTreeItem}
    />
  );
}
