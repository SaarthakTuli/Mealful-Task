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

const MainBarChart = () => {
  const { barCustomData, setSubDataIndex, primaryXAxis, primaryYAxis } =
    useStateContext();

  const chartClick = (args) => {
    if (!isNaN(parseInt(args.target.charAt(args.target.length - 1)))) {
      let seriesIndex = parseInt(args.target.charAt(args.target.length - 1));
      setSubDataIndex(seriesIndex);
    }
  };

  return (
    <ChartComponent
      primaryXAxis={primaryXAxis}
      primaryYAxis={primaryYAxis}
      chartArea={{ border: { width: 2 } }}
      chartMouseClick={(e) => chartClick(e)}
      tooltip={{ enable: true }}
      style={{ width: "500px" }}
    >
      <Inject services={[ColumnSeries, Category, DataLabel, Tooltip]} />
      <SeriesCollectionDirective>
        {barCustomData.map((item, index) => (
          <SeriesDirective key={{ index }} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default MainBarChart;
