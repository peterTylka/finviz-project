"use client";
import { Chart } from "@/components";
import { useSynsets } from "@/hooks";
import { getTreeMapOptions, showTreemapItem } from "@/utils";

export default function TreemapPage() {
  const synsets = useSynsets();

  return (
    <Chart
      data={synsets}
      getChartOptions={getTreeMapOptions}
      showItem={showTreemapItem}
    />
  );
}
