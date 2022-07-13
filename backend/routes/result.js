const router = require("express").Router();
var db = require("./database");

router.get("/getHistory", (req, res) => {
//   db.query(
//     `SELECT *`,
//     [name, insert_id, group, tpoint, tgoal, apoint, rdate],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//         res.send(result);
//       }
//     }
//   );
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
