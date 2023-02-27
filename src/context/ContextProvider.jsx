import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    axios
      .get("../data.json")
      .then((response) => {
        setJsonData(response.data);
      })
      .catch((err) =>
        console.error(
          "ERROR: Unable to retrieve data from Json isong Axios....." + err
        )
      );
  }, []);
  return (
    <StateContext.Provider value={{ jsonData }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
