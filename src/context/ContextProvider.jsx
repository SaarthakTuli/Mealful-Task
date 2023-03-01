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
        // console.log(response.data);
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

  const subBarCustomData = [
    {
      dataSource: subBarChartData,
      xName: "x",
      yName: "y",
      name: searchingDate,
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
      name: "- -",
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

  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

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
    // console.log(dict);

    //Create the appropriate data for barchart
    for (const [key, value] of Object.entries(dict)) {
      barData.push({ x: key, y: value.length });
    }

    // console.log(barData);
    setBarChartData(barData);
  };

  const getSlotData = (index) => {
    if (index == -1) {
      return;
    }

    const dict = [];
    dict["00-06am"] = 0;
    dict["06-12pm"] = 0;
    dict["12-18pm"] = 0;
    dict["18-24am"] = 0;

    const subBarData = [];

    const data = cleanedData[barChartData[index].x];
    // console.log(data);

    setSelectedDate(data);

    data.map((element) => {
      dict[element] += 1;
    });

    for (const [key, value] of Object.entries(dict)) {
      subBarData.push({ x: key, y: value });
    }

    // subBarData.sort(function (a, b) {
    //   var keyA = a.x;
    //   var keyB = b.x;
    //   if (keyA < keyB) return -1;
    //   else if (keyA > keyB) return 1;
    //   return 0;
    // });

    // console.log(subBarData);
    setSubBarChartData(subBarData);
  };

  const getDateRange = (date1, date2) => {
    console.log("Date 1 is: ", date1);
    console.log("Date 2 is: ", date2);
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

        console.log("items: ", items);
      }
      // dict.sort(function (a, b) {
      //   var keyA = parseInt(a.key);
      //   var keyB = parseInt(b.key);
      //   if (keyA < keyB) return -1;
      //   else if (keyA > keyB) return 1;
      //   return 0;
      // });
    });
    items.forEach((ele) => {
      console.log("ele is: ", ele[0], " && ", ele[1]);
      rangeData.push({
        x: ele[0],
        y: ele[1],
      });
    });

    console.log("Data is: ", rangeData);
    setBonusData(rangeData);
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
        barChartData,
        cleanedData,
        getDateRange,
        bonusCustomData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
