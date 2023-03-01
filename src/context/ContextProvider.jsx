import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState([]);
  const [subDataIndex, setSubDataIndex] = useState(-1);
  const [cleanedData, setCleanedData] = useState([]);
  const [bonusData, setBonusData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [subBarChartData, setSubBarChartData] = useState([]);

  // Fetch data from the JSON File
  useEffect(() => {
    axios
      .get("data.json")
      .then((response) => {
        setJsonData(response.data);
      })
      .catch((err) =>
        console.error(
          "ERROR: Unable to retrieve data from Json isong Axios....." + err
        )
      );
  }, []);

  // Data and style for Bar Charts
  const barCustomData = [
    {
      dataSource: barChartData,
      xName: "x",
      yName: "y",
      name: "",
      type: "Column",
      marker: {
        dataLabel: {
          visible: true,
          position: "Top",
          font: { size: 16, fontWeight: "700", color: "#ffffff" },
        },
      },
    },
  ];

  const subBarCustomData = [
    {
      dataSource: subBarChartData,
      xName: "x",
      yName: "y",
      name: "",
      type: "Column",
      marker: {
        dataLabel: {
          visible: true,
          position: "Top",
          font: { size: 16, fontWeight: "700", color: "#ffffff" },
        },
      },
    },
  ];

  const bonusCustomData = [
    {
      dataSource: bonusData,
      xName: "x",
      yName: "y",
      name: "",
      type: "Column",
      marker: {
        dataLabel: {
          visible: true,
          position: "Top",
          template: (args) => `${args.point.y}%`,
          font: { size: 16, fontWeight: "700", color: "#ffffff" },
        },
      },
    },
  ];

  const primaryXAxis = {
    valueType: "Category",
    interval: 1,
    majorGridLines: { width: 1 },
  };

  const primaryYAxis = {
    majorGridLines: { width: 0 },
    interval: 1,
    lineStyle: { width: 1 },
    labelStyle: { color: "white" },
  };

  // Helper functions

  // Calculates difference between 2 given dates aka 1 day, 2 day etc.
  function dateDiffInDays(a, b) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / msPerDay);
  }

  // Check which time slot the user ordered in....
  const checkSlot = (time) => {
    let isSlot = "";
    if (time >= "06:00:00" && time < "12:00:00") {
      isSlot = "06-12pm";
    } else if (time >= "12:00:00" && time < "18:00:00") {
      isSlot = "12-18pm";
    } else if (time >= "18:00:00" && time < "24:00:00") {
      isSlot = "18-24am";
    } else {
      isSlot = "00-06am";
    }
    return isSlot;
  };

  // For Main Bar Chart
  const getOrderDate = (dateToSearch, data) => {
    const barData = [];
    const dict = [];

    data.forEach((element) => {
      const { schedule_time, item_date } = element;

      // Check for the particular item_date...
      if (item_date == dateToSearch) {
        const newDate = schedule_time.split(" ")[0];
        const newTime = schedule_time.split(" ")[1];

        // Creating dictionary where Date is key & an Array of all the time slots is the value. Eg:- ['2022-01-10': ['00:06am', '00:06am', '06:12pm', '18:24am']]
        (dict[newDate] || (dict[newDate] = [])).push(checkSlot(newTime));
      }
    });

    // It stores the entire data which will later be used for expansion...
    setCleanedData(dict);

    //Create the appropriate data for barchart
    for (const [key, value] of Object.entries(dict)) {
      barData.push({ x: key, y: value.length });
    }

    setBarChartData(barData);
  };

  // For Sub Bar Chart
  const getSlotData = (index) => {
    // Guard for random area clicked..
    if (index == -1) {
      return;
    }

    const dict = { "00-06am": 0, "06-12pm": 0, "12-18pm": 0, "18-24am": 0 };
    const subBarData = [];

    // index is the index of the bar chart clicked
    // barChartData[index].x will give me the date
    const data = cleanedData[barChartData[index].x]; // data now stores the array of slots

    data.map((element) => {
      dict[element] += 1;
    });

    for (const [key, value] of Object.entries(dict)) {
      subBarData.push({ x: key, y: value });
    }

    setSubBarChartData(subBarData);
  };

  const getDateRange = (date1, date2) => {
    var total = 0;
    const dict = [];
    var items = [];
    const rangeData = [];

    jsonData.forEach((element) => {
      const { schedule_time, item_date } = element;
      const item_ordered_on = new Date(item_date);
      if (item_ordered_on >= date1 && item_ordered_on <= date2) {
        const checkDate = new Date(schedule_time);
        const prior = dateDiffInDays(checkDate, item_ordered_on);

        if (prior in dict) {
          total++;
          dict[prior] += 1;
        } else {
          dict[prior] = 0;
        }

        items = Object.keys(dict).map((key) => {
          return [key, dict[key]];
        });

        items.sort((first, second) => {
          return first[0] - second[0];
        });
      }
    });
    items.forEach((ele) => {
      rangeData.push({
        x: ele[0],
        y: ((ele[1] / total) * 100).toFixed(2),
      });
    });

    setBonusData(rangeData);
  };

  return (
    <StateContext.Provider
      value={{
        jsonData,
        getOrderDate,
        barCustomData,
        getSlotData,
        subBarCustomData,
        subDataIndex,
        setSubDataIndex,
        barChartData,
        cleanedData,
        getDateRange,
        bonusCustomData,
        bonusData,
        primaryXAxis,
        primaryYAxis,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
