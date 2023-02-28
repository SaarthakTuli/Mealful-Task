import React, { useEffect } from "react";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  DataLabel,
} from "@syncfusion/ej2-react-charts";

import { useStateContext } from "../context/ContextProvider";

const LineChart = () => {
  const {
    subBarCustomData,
    selectedDate,
    getSlotData,
    subDataIndex,
    barChartData,
  } = useStateContext();

  useEffect(() => {
    console.log("Run again");
    getSlotData(subDataIndex);
  }, [subDataIndex]);

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
      style={{ width: "500px" }}
    >
      <Inject services={[ColumnSeries, Category, DataLabel]} />
      <SeriesCollectionDirective>
        {subBarCustomData.map((item, index) => {
          console.log("item is: ", item);
          return <SeriesDirective key={{ index }} {...item} />;
        })}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
