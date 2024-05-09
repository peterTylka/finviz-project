import { Synset, XMLParsedDataItem } from "@/types";

export function getSynsets(
  parsedDataItems: XMLParsedDataItem[],
  parentPath: string
): Synset[] {
  return parsedDataItems.reduce((result, parsedDataItem) => {
    if (parsedDataItem.name !== "synset") {
      return result;
    }

    const itemPath = `${parentPath ? `${parentPath} > ` : ""}${
      parsedDataItem.attributes?.words
    }`;

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
