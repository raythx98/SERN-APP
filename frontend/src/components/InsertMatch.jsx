import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Button, TextField, Box, Grid } from "@mui/material";

function InsertMatch({ setResError, setNewResult, setResultVisible }) {
  const [team, setTeam] = useState("");
  const [teamError, setTeamError] = useState("");
  const [match, setMatch] = useState("");
  const [matchError, setMatchError] = useState("");

  const getResult = () => {
    setTeamError("");
    setMatchError("");
    setResError("");
    setResultVisible(false);
    if (!team.length) {
      setTeamError("Team details should not be empty");
    }
    if (!match.length) {
      setMatchError("Match details should not be empty");
    }
    if (!team.length||!match.length) {
        return;
    }
    // further validation
    setResultVisible(true);
    console.log(team);
    console.log(match);

    Axios.post("//" + process.env.REACT_APP_BASE_URL + "getResult", {
      team: team,
      match: match,
    })
      .then((res) => {
        console.log(res);
        setNewResult(res.data);
      })
      .catch(function (error) {
        setResError(
          "Server error, please contact hongxian@comp.nus.edu.sg for urgent attention..."
        );
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

  return (
    <div className="App">
      <div className="information">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="Team details"
                multiline
                rows={5}
                onChange={(event) => {
                  setTeam(event.target.value);
                }}
              />
              <div className="error information">{teamError}</div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="Match details"
                multiline
                rows={5}
                onChange={(event) => {
                  setMatch(event.target.value);
                }}
              />
              <div className="error information">{matchError}</div>
            </Grid>
          </Grid>
        </Box>

        <Button
          onClick={getResult}
          variant="outlined"
          style={{ fontSize: "18px" }}
        >
          Calculate Results
        </Button>
      </div>
    </div>
  );
}

export default InsertMatch;
