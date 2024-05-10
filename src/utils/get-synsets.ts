import { Synset, XMLParsedDataItem } from "@/types";
import fs from "fs";
import convert from "xml-js";

export function getSynsets(
  parsedDataItems: XMLParsedDataItem[],
  parentPath: string
): Synset[] {
  return parsedDataItems.reduce((result, parsedDataItem) => {
    if (parsedDataItem.name !== "synset") {
      return result;
    }

    const itemPath = parsedDataItem.attributes?.words ?? "";
    let itemChildren = null;
    if (parsedDataItem.elements) {
      itemChildren = getSynsets(parsedDataItem.elements, itemPath);
    }

    const synset = {
      ...(itemChildren ? { children: itemChildren } : ({} as Synset)),
      name: itemPath,
      size: getSynsetSize(itemChildren),
    };
    result.push(synset);

    return result;
  }, [] as Synset[]);
}

// size algorithm matches results in the picture for geological data
function getSynsetSize(synsetChildren: Synset[] | null) {
  return synsetChildren
    ? synsetChildren.reduce((sizeResult, child) => {
        const childSize = child.size === 0 ? 1 : child.size + 1;
        return (sizeResult += childSize);
      }, 0)
    : 0;
}

export const getSynsetsFromFile = (() => {
  let cachedSynsets: Synset[] | undefined = undefined;

  return () => {
    if (cachedSynsets) {
      return cachedSynsets;
    }

    const jsonStr = convert.xml2json(
      fs.readFileSync("./src/app/api/xml-file/data.xml").toString(),
      {}
    );
    const parsedJsonObj: { elements: XMLParsedDataItem[] } =
      JSON.parse(jsonStr);
    //@ts-expect-error improve to automaticaly find first synset
    const firstSynset = parsedJsonObj.elements[0].elements[1];
    cachedSynsets = getSynsets([firstSynset], "");

    return cachedSynsets;
  };
})();
