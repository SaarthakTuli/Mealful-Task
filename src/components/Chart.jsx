import React from "react";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Tooltip,
  ColumnSeries,
  Category,
  DataLabel,
} from "@syncfusion/ej2-react-charts";

import { useStateContext } from "../context/ContextProvider";

const Chart = () => {
  const { barCustomData, getSlotData, setSubDataIndex } = useStateContext();

  const chartClick = (args) => {
    if (!isNaN(parseInt(args.target.charAt(args.target.length - 1)))) {
      let seriesIndex = parseInt(args.target.charAt(args.target.length - 1));
      setSubDataIndex(seriesIndex);
      console.log("index is: ", seriesIndex);
    }
  };

  return (
    <ChartComponent
      // id="bar-chart"
      primaryXAxis={{
        valueType: "Category",
        interval: 1,
        majorGridLines: { width: 1 },
      }}
      primaryYAxis={{
        majorGridLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 1 },
        labelStyle: { color: "white" },
      }}
      chartArea={{ border: { width: 2 } }}
      chartMouseClick={(e) => chartClick(e)}
      style={{ width: "500px" }}
    >
      <Inject services={[ColumnSeries, Category, DataLabel]} />
      <SeriesCollectionDirective>
        {barCustomData.map((item, index) => (
          <SeriesDirective key={{ index }} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Chart;
