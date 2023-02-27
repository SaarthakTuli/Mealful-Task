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

const LineChart = () => {
  const { subBarCustomData } = useStateContext();

  return (
    <ChartComponent
      id="bar-chart"
      primaryXAxis={{
        valueType: "Category",
        interval: 1,
        majorGridLines: { width: 1 },
      }}
      primaryYAxis={{
        majorGridLines: { width: 1 },
        majorTickLines: { width: 1 },
        interval: 1,
        lineStyle: { width: 1 },
        labelStyle: { color: "white" },
      }}
      chartArea={{ border: { width: 2 } }}
      style={{ width: "100%", height: "100%" }}
    >
      <Inject services={[ColumnSeries, Category, DataLabel]} />
      <SeriesCollectionDirective>
        {subBarCustomData.map((item, index) => (
          <SeriesDirective key={{ index }} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
