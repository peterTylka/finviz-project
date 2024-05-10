"use client";
import { Chart } from "@/components";
import { Synset, XMLFileResponse } from "@/types";
import { getTreeOptions } from "@/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [finalData, setFinalData] = useState<Synset[] | undefined>(undefined);

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/xml-file");
      const json: XMLFileResponse = await response.json();

      if (!finalData) {
        setFinalData(json.synsets);
      }
    }
    getData();
  }, [finalData]);

  return (
    <div>
      <Chart data={finalData} getOptions={getTreeOptions} />
    </div>
  );
}
