import React from "react";
import { useState } from "react";

import InsertMatch from "../components/InsertMatch";
import DisplayScore from "../components/DisplayScore";
import DisplayHistory from "../components/DisplayHistory";

function Homepage() {
  const [resError, setResError] = useState("");
  const [newResult, setNewResult] = useState([]);
  const [resultVisible, setResultVisible] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyVisible, setHistoryVisible] = useState(true);

  return (
    <div>
      <h1 className='title'>We are the Champions</h1>
      <InsertMatch setResError={setResError} setNewResult={setNewResult} setResultVisible={setResultVisible} setHistory={setHistory}/>
      <DisplayScore resError={resError} newResult={newResult} resultVisible={resultVisible} />
      <DisplayHistory history={history} historyVisible={historyVisible} setHistory={setHistory} setHistoryVisible={setHistoryVisible}/>
    </div>
  );
}

export default Homepage;
