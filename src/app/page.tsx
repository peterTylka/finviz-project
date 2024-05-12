"use client";
import { Chart } from "@/components";
import { useSynsets } from "@/hooks";
import { getTreeMapOptions, showTreemapItem } from "@/utils";

export default function TreemapPage() {
  const synsets = useSynsets();

  return (
    <div className="w-full h-screen p-5 flex flex-column">
      <h1 className="text-2xl">Treemap</h1>

      <div className="mt-2">
        <a href="/tree" className="text-blue-600 visited:text-purple-600">
          Tree
        </a>
      </div>

      <div className="mt-3 w-full grow">
        <Chart
          data={synsets}
          getChartOptions={getTreeMapOptions}
          showItem={showTreemapItem}
        />
      </div>
    </div>
  );
}
