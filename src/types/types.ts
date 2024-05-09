export interface XMLParsedDataItem {
  type: "element";
  name: string | "synset";
  attributes?: {
    wnid: string;
    words: string;
    gloss: string;
  };
  elements?: XMLParsedDataItem[];
}

export interface Synset {
  name: string;
  size: number;
  children?: Synset[];
}
