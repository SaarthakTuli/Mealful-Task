import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState([]);
  const [dataLine, setDataLine] = useState([]);
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
      .get("../data.json")
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
      dataSource: dataLine,
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
      isSlot = "slot1";
    } else if (time >= "12:00:00" && time < "18:00:00") {
      isSlot = "slot2";
    } else if (time >= "18:00:00" && time < "24:00:00") {
      isSlot = "slot3";
    } else {
      isSlot = "slot4";
    }

    console.log(isSlot, time);
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

        // Create dictionary for dates and occurences...
        if (newDate in dict) {
          dict[newDate] += 1;
        } else {
          dict[newDate] = 1;
        }
      }
    });

    // Create the appropriate data for barchart
    for (const [key, value] of Object.entries(dict)) {
      barData.push({ x: key, y: value });
    }

    console.log(barData);
    setDataLine(barData);
  };

  return (
    <StateContext.Provider
      value={{
        jsonData,
        getOrderDate,
        barCustomData,
        getNivoData,
        nivoDataLine,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
