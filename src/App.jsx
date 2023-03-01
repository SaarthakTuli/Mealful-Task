import React, { useState, useEffect } from "react";
import Chart from "./components/Chart";
import LineChart from "./components/LineChart";
import Bonus from "./components/Bonus";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";

import { useStateContext } from "./context/ContextProvider";

// Extra
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const minDate = new Date("2021-05-18");
  const maxDate = new Date("2022-01-10");

  const [value, setValue] = useState(dayjs("2022-01-10"));
  const [startDate, setStartDate] = useState(dayjs("2022-01-10"));
  const [endDate, setEndDate] = useState(dayjs("2022-01-10"));
  const { getOrderDate, jsonData, subDataIndex, barChartData, getDateRange } =
    useStateContext();

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
    getDateRange(startDate, endDate, jsonData);
  }, [value]);

  return (
    <Box
      pt="5rem"
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "grid", gap: "5%" }} gap="20%">
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          pb="2rem"
        >
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    ".MuiCalendarPicker-root": {
                      color: "#111111",
                    },
                    ".MuiSvgIcon-root": {
                      color: "#ffffff",
                    },
                    "& .MuiFormLabel-root": {
                      color: "#ffffff",
                    },
                    ".MuiInputBase-input": {
                      color: "#f0f0f0",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Box>
            <Typography
              color="#f0f0f0"
              variant="h4"
              pb="1rem"
            >{`The selected item_date is: ${formatDate(value)}`}</Typography>
            <Chart />
          </Box>

          <Box>
            <Typography
              color="#f0f0f0"
              variant="h4"
              pb="1rem"
            >{`The selected date to expand is: ${
              barChartData[subDataIndex] == undefined
                ? 0
                : barChartData[subDataIndex].x
            }`}</Typography>
            <LineChart />
          </Box>
        </Box>

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          pb="2rem"
        >
          <DateRangePickerComponent
            id="daterangepicker"
            placeholder="Select a range"
            startDate={startDate}
            endDate={endDate}
            min={minDate}
            max={maxDate}
          />
          <Bonus />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
