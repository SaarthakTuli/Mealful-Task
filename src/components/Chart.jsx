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
  const { barCustomData } = useStateContext();

  const chartClick = (args) => {
    let seriesIndex = parseInt(args.target.charAt(args.target.length - 1));
    console.log(seriesIndex);
  };

  return (
    <ChartComponent
      id="bar-chart"
      primaryXAxis={{
        valueType: "Category",
        interval: 1,
        majorGridLines: { width: 0 },
      }}
      primaryYAxis={{
        majorGridLines: { width: 1 },
        majorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 1 },
        labelStyle: { color: "white" },
      }}
      chartArea={{ border: { width: 2 } }}
      style={{ width: "100%", height: "100%" }}
      chartMouseClick={(e) => chartClick(e)}
    >
      <Inject services={[ColumnSeries, Category, DataLabel]} />
      <SeriesCollectionDirective>
        {barCustomData.map((item, index) => (
          <SeriesDirective onCha key={{ index }} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Chart;
