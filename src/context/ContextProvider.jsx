import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState([]);
  const [subDataIndex, setSubDataIndex] = useState(-1);
  const [cleanedData, setCleanedData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [subBarChartData, setSubBarChartData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [nivoDataLine, setNivoDataLine] = useState([]);
  const [searchingDate, setSearchingDate] = useState("");

  class Children {
    constructor(name, loc) {
      this.name = name;
      this.loc = loc;
    }
  }

  useEffect(() => {
    axios
      .get("data.json")
      .then((response) => {
        console.log(response.data);
        setJsonData(response.data);
      })
      .catch((err) =>
        console.error(
          "ERROR: Unable to retrieve data from Json isong Axios....." + err
        )
      );
  }, []);

  const barCustomData = [
    {
      dataSource: barChartData,
      xName: "x",
      yName: "y",
      name: selectedDate,
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

  // const subBarCustomData = [
  //   {
  //     dataSource: subBarChartData,
  //     xName: "x",
  //     yName: "y",
  //     name: searchingDate,
  //     type: "Column",
  //     marker: {
  //       dataLabel: {
  //         visible: true,
  //         position: "Top",
  //         font: { size: 16, fontWeight: "700", color: "#ffffff" },
  //       },
  //     },
  //   },
  // ];
  const subBarCustomData = [
    {
      dataSource: subBarChartData,
      xName: "x",
      yName: "y",
      name: searchingDate,
      width: "2",
      marker: { visible: true, width: 10, height: 10 },
      type: "Line",
    },
  ];

  const getSlot = (time, ch) => {
    if (time >= "09:00:00" && time < "12:00:00") {
      ch.slot1 += 1;
    } else if (time >= "12:00:00" && time < "15:00:00") {
      ch.slot2 += 1;
    } else if (time >= "15:00:00" && time < "18:00:00") {
      ch.slo31 += 1;
    } else if (time >= "18:00:00" && time <= "21:00:00") {
      ch.slot4 += 1;
    }
  };

  const checkSlot = (time) => {
    let isSlot = "";
    if (time >= "06:00:00" && time < "12:00:00") {
      isSlot = "06-12pm";
    } else if (time >= "12:00:00" && time < "18:00:00") {
      isSlot = "12-18pm";
    } else if (time >= "18:00:00" && time < "24:00:00") {
      isSlot = "18-24am";
    } else {
      isSlot = "'00-06am";
    }
    return isSlot;
  };

  const getNivoData = (dateToSearch, data) => {
    const nivoData = [];

    data.forEach((element) => {
      const { schedule_time, item_date } = element;

      if (item_date == dateToSearch) {
        setSearchingDate(dateToSearch);

        const newDate = schedule_time.split(" ")[0];
        const newTime = schedule_time.split(" ")[1];

        const index = nivoData.findIndex((e) => e.name === newDate);

        if (index == -1) {
          nivoData.push({
            name: newDate,
            color: "hsl(346, 70%, 50%)",
            children: [new Children(checkSlot(newTime), 1)],
          });
        } else {
          const ele = nivoData[index].children;
          const childIndex = ele.findIndex((e) => e.name == checkSlot(newTime));
          if (childIndex == -1) {
            ele.push(new Children(checkSlot(newTime), 1));
          } else {
            ele[childIndex].loc += 1;
          }
        }

        console.log("nivo data is: ", nivoData);
      }
    });
    setNivoDataLine(nivoData);
  };

  const getOrderDate = (dateToSearch, data) => {
    const barData = [];
    const dict = [];

    data.forEach((element) => {
      const { schedule_time, item_date } = element;

      // Check for the particular item_date...
      if (item_date == dateToSearch) {
        setSearchingDate(dateToSearch);
        const newDate = schedule_time.split(" ")[0];
        const newTime = schedule_time.split(" ")[1];

        (dict[newDate] || (dict[newDate] = [])).push(checkSlot(newTime));
      }
    });
    setCleanedData(dict);
    console.log(dict);

    //Create the appropriate data for barchart
    for (const [key, value] of Object.entries(dict)) {
      barData.push({ x: key, y: value.length });
    }

    console.log(barData);
    setBarChartData(barData);
  };

  const getSlotData = (index) => {
    if (index == -1) {
      return;
    }

    const dict = [];
    const subBarData = [];

    const data = cleanedData[barChartData[index].x];
    console.log(data);

    setSelectedDate(data);

    data.map((element) => {
      if (element in dict) {
        dict[element] += 1;
      } else {
        dict[element] = 1;
      }
    });

    for (const [key, value] of Object.entries(dict)) {
      subBarData.push({ x: key, y: value });
    }

    subBarData.sort(function (a, b) {
      var keyA = a.x;
      var keyB = b.x;
      if (keyA < keyB) return -1;
      else if (keyA > keyB) return 1;
      return 0;
    });

    console.log(subBarData);
    setSubBarChartData(subBarData);
  };

  return (
    <StateContext.Provider
      value={{
        jsonData,
        getOrderDate,
        barCustomData,
        getNivoData,
        nivoDataLine,
        getSlotData,
        subBarCustomData,
        selectedDate,
        subDataIndex,
        setSubDataIndex,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
