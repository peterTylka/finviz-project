"use client";
import { Chart } from "@/components";
import { useSynsets } from "@/hooks";
import { getTreeOptions, showTreeItem } from "@/utils";

export default function TreePage() {
  const synsets = useSynsets();

  return (
    <div className="w-full h-screen p-5 flex flex-column">
      <h1 className="text-2xl">Tree</h1>

      <div className="mt-2">
        <a href="/" className="text-blue-600 visited:text-purple-600">
          Treemap
        </a>
      </div>

      <div className="mt-3 w-full grow">
        <Chart
          data={synsets}
          getChartOptions={getTreeOptions}
          showItem={showTreeItem}
        />
      </div>
    </div>
  );
}
