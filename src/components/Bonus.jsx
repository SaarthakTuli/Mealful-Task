import React from "react";
import { Box } from "@mui/material";

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

const Bonus = () => {
  const { bonusData } = useStateContext();
  return (
    <Box>
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
          {bonusData.map((item, index) => (
            <SeriesDirective key={{ index }} {...item} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
    </Box>
  );
};

export default Bonus;
