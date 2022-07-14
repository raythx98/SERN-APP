const router = require("express").Router();
const { query } = require("express");
var db = require("./database");

router.get("/getHistory", (req, res) => {
  db.query(
    "SELECT result_id FROM results WHERE is_visible = true ORDER BY result_id DESC",
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Database error...");
      } else {
        console.log(result);
        let query_string = "";
        let query_size= 0;

        const result_ids = result.map((row) => {
          query_size++;
          query_string += `
          (select tname, gnum, tpoint, tgoal, apoint, rdate 
            from teamresult 
            where result_id = ${row.result_id} 
            and gnum = (select (select min(gnum) from teamresult where result_id=${row.result_id}))
            order by  tpoint DESC, tgoal DESC, apoint DESC, rdate ASC
            limit 4 )
            UNION
            (select tname, gnum, tpoint, tgoal, apoint, rdate 
            from teamresult 
            where result_id = ${row.result_id} 
            and gnum = (select (select max(gnum) from teamresult where result_id=${row.result_id}))
            order by tpoint DESC, tgoal DESC, apoint DESC, rdate ASC 
            limit 4 );
          `;
        });
        console.log(result_ids);

        if (!query_size) {
          return res.send([]);
        }

        db.query(query_string,
          (err, result) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json("Database error after insertion, please refresh...");
            } else {
              console.log(result);
              if (query_size === 1) {
                result = [result];
              }
              result.forEach((element, index) => {
                element.forEach((innerElement, innerIndex) => {
                 const date_obj = new Date(innerElement.rdate)
                 new_date = date_obj.getDate().toString().padStart(2, '0');
                 new_month = (date_obj.getMonth()+1).toString().padStart(2, '0');
                 innerElement.rdate = new_date + '/' + new_month;
                });
              });
              console.log(result);
              res.send(result);
            }
          }
        );
      }
    }
  );
});

router.delete("/clearHistory", (req, res) => {
  db.query(
    `UPDATE results SET is_visible = false WHERE is_visible = true;`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("done");
      }
    }
  );
});

module.exports = router;
