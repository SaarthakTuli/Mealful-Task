import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [josnData, setJsonData] = useState({});

  useEffect(() => {
    fetch("https://jsonkeeper.com/b/P2VO", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJsonData(data);
      });
  }, []);

  return (
    <div className="App">
      <p>Data has finally been extracted</p>
    </div>
  );
}

export default App;
