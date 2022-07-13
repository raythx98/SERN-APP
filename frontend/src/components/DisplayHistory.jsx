import React from "react";
import ResultTable from "./ResultTable";
import { Button } from "@mui/material";

function createData(name, group, tpoint, tgoal, apoint, rdate) {
  return { name, group, tpoint, tgoal, apoint, rdate };
}

function DisplayHistory() {
  const resultVisible = true;
  const resError = false;
  //process newResult
  const rows = [
    createData(
      "TeamName1",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName1",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName1",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName1",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName1",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName1",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName1",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
    createData(
      "TeamName1",
      "Group",
      "Points",
      "Total Goals",
      "Alt Points",
      "Registration"
    ),
  ];

  const rowss = [rows, rows];

  const clearHistory = () => {
    return;
  };

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
              return <ResultTable rows={rows} />;
            })}
          </div>
        )
      ) : null}
    </div>
  );
}

export default DisplayHistory;
