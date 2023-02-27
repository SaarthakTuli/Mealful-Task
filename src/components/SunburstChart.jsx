import React from "react";

import { ResponsiveSunburst } from "@nivo/sunburst";
import { useStateContext } from "../context/ContextProvider";

const SunburstChart = () => {
  const { nivoDataLine } = useStateContext();
  return (
    <div>
      <ResponsiveSunburst
        data={nivoDataLine}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        id="name"
        value="loc"
        cornerRadius={2}
        borderColor={{ theme: "background" }}
        colors={{ scheme: "nivo" }}
        childColor={{
          from: "color",
          modifiers: [["brighter", 0.1]],
        }}
        enableArcLabels={true}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 1.4]],
        }}
        style={{ background: "black" }}
      />
    </div>
  );
};

export default SunburstChart;
