import React from "react";
import ResultTable from "./ResultTable";
import { Button } from "@mui/material";
import Axios from "axios";

function createData(name, group, tpoint, tgoal, apoint, rdate) {
  return { name, group, tpoint, tgoal, apoint, rdate };
}

function DisplayHistory({history, historyVisible, setHistory, setHistoryVisible}) {
  const resultVisible = true;
  const resError = false;
  //process newResult
  const rows1 = [
    createData(
      "TeamName1",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName2",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName3",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName4",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName5",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName6",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName7",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName8",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
  ];

  const rows2 = [
    createData(
      "TeamNameA",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamNameB",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamNameC",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamNameD",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamNameE",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamNameF",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName7",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamNameG",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
  ];

  const rowss = [rows1, rows2];

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

    getHistory();
  };

  let j = 0;

  // call API
  

  return (
    <div>
      {resultVisible ? (
        resError ? (
          <div className="error information">{resError}</div>
        ) : (
          <div className="newlink information">
            <h1>Results History: </h1>
            <Button
          onClick={clearHistory}
          variant="outlined"
          style={{ fontSize: "18px" }}
        >
          Clear History
        </Button>
            {rowss.map((rows) => {
              return <ResultTable rows={rows} key = {j++} />;
            })}
          </div>
        )
      ) : null}
    </div>
  );
}

export default DisplayHistory;
