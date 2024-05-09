"use client";
import { Synset, XMLParsedDataItem } from "@/types";
import { getSynsets } from "@/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [finalData, setFinalData] = useState<Synset[] | null>(null);

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/xml-file");
      const json = await response.json();
      const parsedJsonObj: { elements: XMLParsedDataItem[] } = JSON.parse(json);

      if (!finalData) {
        //@ts-expect-error improve to automaticaly find first synset
        const firstSynset = parsedJsonObj.elements[0].elements[1];
        const data = getSynsets([firstSynset], "");
        setFinalData(data);
      }
    }
    getData();
  }, [finalData]);

  console.log("%c finalData", "background-color: skyblue", { finalData });

  return <div>HOME</div>;
}
