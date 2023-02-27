import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [josnData, setJsonData] = useState(null);

  const api_url = "https://jsonkeeper.com/b/P2VO";

  // const fetchJson = async () => {
  //   const res = await fetch(api_url, { mode: "no-cors" });
  //   const resData = await JSON.parse(res);
  //   console.log(resData);

  //   return;
  // };

  // useEffect(() => {
  //   fetchJson();
  // }, []);

  useEffect(() => {
    axios.get(api_url, { header: "no-cors" }).then((response) => {
      console.log(response);
      setJsonData(response.data);
    });
  }, []);

  return (
    <div className="App">
      <p>Data has finally been extracted</p>
    </div>
  );
}

export default App;
