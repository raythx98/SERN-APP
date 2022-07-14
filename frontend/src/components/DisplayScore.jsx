import React from "react";
import ResultTable from "./ResultTable";

function DisplayScore({ resError, newResult, resultVisible }) {

  return (
    <div>
      {resultVisible ? (
        resError ? (
          <div className="error information">{resError}</div>
        ) : (
          <div className="newlink information">
            <h1>First round results: </h1>
            <ResultTable rows={newResult}/>
          </div>
        )
      ) : null}
    </div>
  );
}

export default DisplayScore;
