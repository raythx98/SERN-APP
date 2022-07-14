import React from "react";
import { useState } from "react";
import Axios from "axios";
import { Button, TextField, Box, Grid } from "@mui/material";

function InsertMatch({ setResError, setNewResult, setResultVisible, setHistory }) {
  const [team, setTeam] = useState("");
  const [teamError, setTeamError] = useState("");
  const [match, setMatch] = useState("");
  const [matchError, setMatchError] = useState("");
  const intRegex = new RegExp("^[0-9]{1,9}$");
  const dateRegex = new RegExp("^[0-9][0-9]/[0-9][0-9]$");

  function allTrim(str) {
    // Removes leading, trailing and consecutive whitespaces
    return str.trim().replace(/\s+/g, " ");
  }

  function validateTeams(teams) {
    if (teams.filter((team) => team.length).length !== 12) {
      setTeamError("Please enter details for 12 teams");
      return;
    }

    const team_list = [];
    for (const team of teams) {
      if (!team.length) continue;
      const details = allTrim(team).split(" ");
      if (details.length !== 3) {
        setTeamError("Each row should contain `groupName DD/MM groupNum`");
        return;
      } else if (!dateRegex.test(details[1])) {
        // check date format
        setTeamError("Please ensure date format is in DD/MM");
        return;
      } else if (!intRegex.test(details[2])) {
        // check group number
        setTeamError("Use a group number between 0 - 999999999");
        return;
      } else {
        team_list.push(details);
      }
    }
    return team_list;
  }

  function validateMatches(matches) {
    if (matches.filter((match) => match.length).length !== 30) {
      setMatchError("Please enter details for 30 matches");
      return;
    }

    const match_list = [];
    for (const match of matches) {
      if (!match.length) continue;
      const details = allTrim(match).split(" ");
      if (details.length !== 4) {
        setMatchError(
          "Each row should contain `groupName groupName score score`"
        );
        return;
      } else if (!intRegex.test(details[2]) || !intRegex.test(details[3])) {
        // check group number
        setMatchError("Goals should be between 0 - 999999999");
        return;
      } else {
        match_list.push(details);
      }
    }
    return match_list;
  }

  function getHistory() {
    Axios.get("//" + process.env.REACT_APP_BASE_URL + "getHistory")
      .then((res) => {
        console.log(res);
        console.log("history: ", res.data);
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

  const getResult = () => {
    setTeamError("");
    setMatchError("");
    setResError("");
    setResultVisible(false);

    // validate team information and append to array
    let team_list = [];
    if (!team.length) {
      setTeamError("Team details should not be empty");
    } else {
      const teams = team.split(/\r\n|\r|\n/);
      team_list = validateTeams(teams);
    }

    console.log(team_list);

    // validate match information and append to array
    let match_list = [];
    if (!match.length) {
      setMatchError("Team details should not be empty");
    } else {
      const matches = match.split(/\r\n|\r|\n/);
      match_list = validateMatches(matches);
    }

    console.log(match_list);

    if (teamError.length || matchError.length) {
      return;
    }
    setResultVisible(true);
    Axios.post("//" + process.env.REACT_APP_BASE_URL + "getResult", {
      team_list: team_list,
      match_list: match_list,
    })
      .then((res) => {
        console.log(res);
        setNewResult(res.data);
        getHistory();
      })
      .catch(function (error) {
        setResError(
          error.response.data + " Server error, please contact hongxian@comp.nus.edu.sg for urgent attention..."
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
