import React, { useState, useEffect } from "react";
import "./App.css";
import Chart from "./components/Chart";

import { useStateContext } from "./context/ContextProvider";

// Extra
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LineChart from "./components/LineChart";

function App() {
  const minDate = new Date("2021-05-18");
  const maxDate = new Date("2022-01-10");

  const [value, setValue] = useState(dayjs("2022-01-10"));
  const { getOrderDate, jsonData, selectedDate } = useStateContext();

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {
    getOrderDate(formatDate(value), jsonData);
  }, [value]);

  return (
    <div style={{ width: "1000px", gap: "20%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Enter date to search"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          minDate={minDate}
          maxDate={maxDate}
          inputFormat="YYYY-MM-DD"
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20%",
        }}
      >
        <div style={{ zIndex: 10, background: "black" }}>
          <Chart />
        </div>

        <div
          style={{
            zIndex: 2,
            background: "red",
          }}
        >
          <p>hello</p>
          {/* <LineChart /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
