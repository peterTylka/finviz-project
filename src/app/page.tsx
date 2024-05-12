"use client";
import { Chart } from "@/components";
import { Synset, XMLFileResponse } from "@/types";
import { getTreeMapOptions } from "@/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [synsets, setSynsets] = useState<Synset[] | undefined>(undefined);

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/xml-file");
      const json: XMLFileResponse = await response.json();

      setSynsets(json.synsets);
    }
    getData();
  }, []);

  return (
    <div>
      {/* <Chart data={finalData} getOptions={getTreeOptions} /> */}
      <Chart data={synsets} getOptions={getTreeMapOptions} />
    </div>
  );
}
