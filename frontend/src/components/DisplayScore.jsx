import React from "react";
import ResultTable from "./ResultTable";

function createData(name, group, tpoint, tgoal, apoint, rdate) {
  return { name, group, tpoint, tgoal, apoint, rdate };
}

function DisplayScore({ resError, newResult, resultVisible }) {
  resultVisible = true;
  resError = false;
  //process newResult
  const rows = [
    createData("TeamName1", "Group", "Points", "Total Goals", "Alt Points", "Registration"),
    createData("TeamName1", "Group", "Points", "Total Goals", "Alt Points", "Registration"),
    createData("TeamName1", "Group", "Points", "Total Goals", "Alt Points", "Registration"),
    createData("TeamName1", "Group", "Points", "Total Goals", "Alt Points", "Registration"),
    createData("TeamName1", "Group", "Points", "Total Goals", "Alt Points", "Registration"),
    createData("TeamName1", "Group", "Points", "Total Goals", "Alt Points", "Registration"),
    createData("TeamName1", "Group", "Points", "Total Goals", "Alt Points", "Registration"),
    createData("TeamName1", "Group", "Points", "Total Goals", "Alt Points", "Registration"),
  ];

  return (
    <div>
      {resultVisible ? (
        resError ? (
          <div className="error information">{resError}</div>
        ) : (
          <div className="newlink information">
            <h1>First round results: </h1>
            <ResultTable rows={rows}/>
          </div>
        )
      ) : null}
    </div>
  );
}

export default DisplayScore;
