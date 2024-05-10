"use client";
import { Synset, XMLParsedDataItem } from "@/types";
import { Synset, XMLFileResponse } from "@/types";
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

  console.log("%c finalData", "background-color: skyblue", { finalData });

  return <div>HOME</div>;
}
