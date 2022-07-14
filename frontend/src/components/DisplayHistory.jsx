import React from "react";
import { useEffect } from "react";
import ResultTable from "./ResultTable";
import { Button } from "@mui/material";
import Axios from "axios";

function DisplayHistory({
  history,
  historyVisible,
  setHistory,
  setHistoryVisible,
}) {
  function getHistory() {
    Axios.get("//" + process.env.REACT_APP_BASE_URL + "getHistory")
      .then((res) => {
        console.log(res);
        setHistory(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log("Response Error, data: ", error.response.data);
          console.log("Response Error, header: ", error.response.headers);
        } else if (error.request) {
          console.log("Request Error: ", error.request);
        } else {
          console.log("Error ", error.message);
        }
        console.log(error.config);
      });
  }

  const clearHistory = () => {
    Axios.delete("//" + process.env.REACT_APP_BASE_URL + "clearHistory")
      .then((res) => {
        console.log(res);
        getHistory();
      })
      .catch(function (error) {
        if (error.response) {
          console.log("Response Error, data: ", error.response.data);
          console.log("Response Error, header: ", error.response.headers);
        } else if (error.request) {
          console.log("Request Error: ", error.request);
        } else {
          console.log("Error ", error.message);
        }
        console.log(error.config);
      });
  };

  let j = 0;

  useEffect(() => {
    getHistory(); 
  }, []);

  return (
    <div className="newlink information">
      <h1>Results History: </h1>
      <Button
        onClick={clearHistory}
        variant="outlined"
        style={{ fontSize: "18px" }}
      >
        Clear History
      </Button>
      {history && history.map((rows) => {
        return <ResultTable rows={rows} key={j++} />;
      })}
    </div>
  );
}

export default DisplayHistory;
