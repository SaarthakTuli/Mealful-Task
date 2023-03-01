import React, { useEffect } from "react";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  DataLabel,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import { useStateContext } from "../context/ContextProvider";

const SubBarChart = () => {
  const {
    subBarCustomData,
    getSlotData,
    subDataIndex,
    primaryXAxis,
    primaryYAxis,
  } = useStateContext();

  useEffect(() => {
    getSlotData(subDataIndex);
  }, [subDataIndex]);

  return (
    <ChartComponent
      primaryXAxis={primaryXAxis}
      primaryYAxis={primaryYAxis}
      chartArea={{ border: { width: 2 } }}
      style={{ width: "500px" }}
      tooltip={{ enable: true }}
    >
      <Inject services={[ColumnSeries, Category, DataLabel, Tooltip]} />
      <SeriesCollectionDirective>
        {subBarCustomData.map((item, index) => {
          return <SeriesDirective key={{ index }} {...item} />;
        })}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default SubBarChart;
