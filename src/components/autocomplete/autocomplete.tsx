import { Option } from "@/types";
import { getFullTreeOptions, showChartItem } from "@/utils";
import { EChartsType } from "echarts";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Highlighter, Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Skeleton } from "..";

interface AutocompleteProps {
  chart: EChartsType | null;
}

export function Autocomplete({ chart }: AutocompleteProps) {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([] as Option[]);

  useEffect(() => {
    if (chart) {
      // ignore Dataset + root option
      setOptions(getFullTreeOptions(chart).slice(2));
      setLoading(false);
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

  return loading ? (
    <div className="w-full h-10">
      <Skeleton />
    </div>
  ) : (
    <Typeahead
      id="dataset-typeahead"
      className="w-full"
      labelKey="name"
      onChange={onSelectedOption}
      options={options}
      placeholder="Choose a name..."
      renderMenuItemChildren={(option, { text }) => (
        <>
          <Highlighter search={text}>{(option as Option).name}</Highlighter>,
          <div>
            <small>Parent: {(option as Option).parentsPath}</small>
          </div>
        </>
      )}
    />
  );
}
