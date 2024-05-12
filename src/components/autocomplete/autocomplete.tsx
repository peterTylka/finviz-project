import { Option } from "@/types";
import { getFullTreeOptions, showChartItem } from "@/utils";
import { EChartsType } from "echarts";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

interface AutocompleteProps {
  chart: EChartsType | null;
}

export function Autocomplete({ chart }: AutocompleteProps) {
  const [options, setOptions] = useState([] as Option[]);

  useEffect(() => {
    if (chart) {
      setOptions(getFullTreeOptions(chart));
    }
  }, [chart]);

  const onSelectedOption = useCallback(
    (selectedOptions: any[]) => {
      if (chart && !isEmpty(selectedOptions)) {
        showChartItem(chart, (selectedOptions[0] as Option).value);
      }
    },
    [chart]
  );

  return (
    <Typeahead
      id="dataset-typeahead"
      className="w-full"
      labelKey="name"
      onChange={onSelectedOption}
      options={options}
      placeholder="Choose a name..."
    />
  );
}
