"use client";
import { useEffect, useState } from "react";

interface ParsedDataItem {
  type: "element";
  name: string | "synset";
  attributes?: {
    wnid: string;
    words: string;
    gloss: string;
  };
  elements?: ParsedDataItem[];
}

interface FinalDataItem {
  name: string;
  size: number;
  children?: FinalDataItem[];
}

const createItems = (
  parsedDataItems: ParsedDataItem[],
  parentPath: string
): FinalDataItem[] => {
  return parsedDataItems.reduce((result, parsedDataItem) => {
    const itemPath = `${parentPath ? `${parentPath} > ` : ""}${
      parsedDataItem.attributes?.words
    }`;
    let itemChildren = null;

    console.log("%c itemPath", "background-color: skyblue", { itemPath });
    if (parsedDataItem.elements) {
      itemChildren = createItems(parsedDataItem.elements, itemPath);
    }

    const finalDataItem = {
      ...(itemChildren ? { children: itemChildren } : ({} as FinalDataItem)),
      name: itemPath,
      // size algorithm matches results in the picture for geological data
      size: itemChildren
        ? itemChildren.reduce((sizeResult, child) => {
            return (sizeResult += child.size === 0 ? 1 : child.size + 1);
          }, 0)
        : 0,
    };

    console.log("%c RESULT", "background-color: skyblue", {
      result,
      finalDataItem,
    });

    result.push(finalDataItem);
    return result;
  }, [] as FinalDataItem[]);
};

export default function Home() {
  const [finalData, setFinalData] = useState<FinalDataItem[] | null>(null);

  globalThis.finalData = finalData;

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/xml-file");
      const json = await response.json();
      globalThis.json = json;
      const parsedJsonObj: { elements: ParsedDataItem[] } = JSON.parse(json);
      console.log("%c RESPONSE", "background-color: skyblue", {
        json: parsedJsonObj,
        //   json: (json as string).replaceAll("\\", ""),
      });

      if (!finalData) {
        const data = createItems([parsedJsonObj.elements[0].elements[1]], "");
        setFinalData(data);
      }
    }
    getData();
  }, []);

  return <div>HOME</div>;
}
