import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function ResultTable({rows}) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team Name</TableCell>
            <TableCell align="right">Group</TableCell>
            <TableCell align="right">Points</TableCell>
            <TableCell align="right">Goals</TableCell>
            <TableCell align="right">Alt Points</TableCell>
            <TableCell align="right">Reg Date</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.group}</TableCell>
              <TableCell align="right">{row.tpoint}</TableCell>
              <TableCell align="right">{row.tgoal}</TableCell>
              <TableCell align="right">{row.apoint}</TableCell>
              <TableCell align="right">{row.rdate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResultTable;
