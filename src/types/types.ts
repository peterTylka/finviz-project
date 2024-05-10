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
  value: number;
  children?: Synset[];
}
