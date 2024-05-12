import { Synset, XMLFileResponse } from "@/types";
import { useEffect, useState } from "react";

export function useSynsets() {
  const [synsets, setSynsets] = useState<Synset[] | undefined>(undefined);

  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/xml-file");
      const json: XMLFileResponse = await response.json();

      setSynsets(json.synsets);
    }
    getData();
  }, []);
  return synsets;
}
