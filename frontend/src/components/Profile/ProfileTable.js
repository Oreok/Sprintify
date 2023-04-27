import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";


export default function ProfileTable(props) {
  const rows = props.user;

  return (
    <Box
      sx={{
        bgcolor: "background.secondary",
        color: "text.default",
        p: "1px",
      }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: "bold", color: "text.default" }}>
                  {row.name}
                </TableCell>
                <TableCell align="left" sx={{ pl: 10, color: "text.default" }}>
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
