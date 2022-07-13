const router = require("express").Router();
var db = require("./database");

function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

function getErrorAndInitTeams(team_points, team_list) {
  const group_frequency = {};
  for (const team of team_list) {
    // check date
    const DDMM = team[1].split("/");
    const date = "2022-" + DDMM[1] + "-" + DDMM[0];
    if (!dateIsValid(new Date(date))) {
      return "Invalid Dates exists... ";
    }
    const group = team[2];
    if (group_frequency[group]) {
      group_frequency[group]++;
    } else {
      group_frequency[group] = 1;
    }
    team_points[team[0]] = {
      gnum: group,
      tpoint: 0,
      tgoal: 0,
      apoint: 0,
      rdate: date,
    };
  }
  if (Object.keys(team_points).length !== 12) {
    return "Incorrect number of distinct teams... ";
  }
  if (Object.keys(group_frequency).length !== 2) {
    return "Incorrect number of distinct groups... ";
  }
  for (const [key, value] of Object.entries(group_frequency)) {
    if (value !== 6) {
      return "Groups are not distributed evenly... ";
    }
  }
  return "";
}

function getErrorAndInitMatches(team_points, match_list) {
  const match_frequency = {};
  for (const match of match_list) {
    const team1 = match[0];
    const team2 = match[1];
    const team1_score = parseInt(match[2]);
    const team2_score = parseInt(match[3]);

    if (team1 === team2) {
      return "Teams should not play against self... ";
    }

    if (!team_points[team1] || !team_points[team2]) {
      return "Teams contradict with matches... ";
    }

    if (match_frequency[team1]) {
      match_frequency[team1]++;
    } else {
      match_frequency[team1] = 1;
    }

    if (match_frequency[team2]) {
      match_frequency[team2]++;
    } else {
      match_frequency[team2] = 1;
    }
    team_points[team1].tgoal += team1_score;
    team_points[team2].tgoal += team2_score;
    if (team1_score === team2_score) {
      // draw
      team_points[team1].tpoint += 1;
      team_points[team2].tpoint += 1;
      team_points[team1].apoint += 3;
      team_points[team2].apoint += 3;
    } else if (team1_score > team2_score) {
      // team 1 win
      team_points[team1].tpoint += 3;
      team_points[team2].tpoint += 0;
      team_points[team1].apoint += 5;
      team_points[team2].apoint += 1;
    } else {
      // team 2 win
      team_points[team1].tpoint += 0;
      team_points[team2].tpoint += 3;
      team_points[team1].apoint += 1;
      team_points[team2].apoint += 5;
    }
  }
  for (const [key, value] of Object.entries(match_frequency)) {
    if (value !== 5) {
      return "Teams not doing round robin... ";
    }
  }
  return "";
}

function rollback(result_id) {
  db.query(
    "UPDATE results SET is_visible = false WHERE result_id = ?;",
    [result_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Database Error, rollback failed");
      } else {
        console.log(result);
        return res.status(500).json("Database Error, rollback success");
      }
    }
  );
}

router.post("/", (req, res) => {
  const team_list = req.body.team_list;
  const match_list = req.body.match_list;
  let insert_id = -1;

  const team_points = {};
  const team_error = getErrorAndInitTeams(team_points, team_list);
  const match_error = getErrorAndInitMatches(team_points, match_list);

  if (team_error.length || match_error.length) {
    return res.status(500).json(team_error + match_error);
  }
  console.log(team_points);

  db.query("INSERT INTO results (is_visible) VALUES (true)", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Database error during insertion...");
    } else {
      console.log(result);
      insert_id = result.insertId;
      const insert_array = [];
      for (const [tname, values] of Object.entries(team_points)) {
        insert_array.push([
          tname,
          insert_id,
          values.gnum,
          values.tpoint,
          values.tgoal,
          values.apoint,
          values.rdate,
        ]);
      }

      console.log(insert_array);
      db.query(
        `INSERT INTO teamresult (tname, result_id, gnum, tpoint, tgoal, apoint, rdate) VALUES ?`,
        [insert_array],
        (err, result) => {
          if (err) {
            console.log(err);
            return rollback();
          } else {
            console.log(result);
            db.query(
              `(select tname, gnum, tpoint, tgoal, apoint, rdate 
                from teamresult 
                where result_id = ? and gnum = (select (select min(gnum) from teamresult where result_id=?))
                order by  tpoint DESC, tgoal DESC, apoint DESC, rdate ASC
                limit 4 )
                UNION
                (select tname, gnum, tpoint, tgoal, apoint, rdate 
                from teamresult 
                where result_id = ? and gnum = (select (select max(gnum) from teamresult where result_id=?))
                order by tpoint DESC, tgoal DESC, apoint DESC, rdate ASC 
                limit 4 );`,
              [insert_id, insert_id, insert_id, insert_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(500)
                    .json("Database error after insertion, please refresh...");
                } else {
                  console.log(result);
                  result.forEach((element, index) => {
                    // date_obj = new Date(element.rdate)=
                    //  new_date = date_obj.getDate().toString().padStart(2, '0');
                    //  new_month = date_obj.getMonth().toString().padStart(2, '0');
                    //  element.rdate = new_date + '/' + new_month;
                  });
                  console.log(result);
                  res.send(result);
                }
              }
            );
          }
        }
      );
    }
  });
});

module.exports = router;
