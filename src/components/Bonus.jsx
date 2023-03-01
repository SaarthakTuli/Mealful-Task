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
  TooltipRender,
} from "@syncfusion/ej2-react-charts";

import { useStateContext } from "../context/ContextProvider";

const Bonus = () => {
  const { bonusCustomData } = useStateContext();
  return (
    <Box>
      <ChartComponent
        primaryXAxis={{
          valueType: "Category",
          interval: 1,
        }}
        primaryYAxis={{
          interval: 5,
          lineStyle: { width: 1 },
          labelStyle: { color: "white" },
        }}
        chartArea={{ border: { width: 2 } }}
        style={{ width: "500px" }}
        tooltip={{ enable: true }}
        tooltipRender={(args) => {
          args.text = `${args.point.x} ${
            args.point.x < 0 ? "Late" : "days prior"
          } : ${args.point.y}%`;
        }}
      >
        <Inject
          services={[ColumnSeries, Category, DataLabel, Tooltip, TooltipRender]}
        />
        <SeriesCollectionDirective>
          {bonusCustomData.map((item, index) => (
            <SeriesDirective key={{ index }} {...item} />
          ))}
        </SeriesCollectionDirective>
      </ChartComponent>
    </Box>
  );
};

export default Bonus;
