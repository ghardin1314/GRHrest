import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/actions/CftcActions";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    maxHeight: "80vh",
    maxWidth: "100%",
  },
  lightRow: {
    background: theme.palette.background.default,
  },
  darkRow: {
    background: theme.palette.background.paper,
  },
}));

export default function CftcTable() {
  const state = useSelector((state) => state);
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.populateCftcTable());
    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table
        className={classes.table}
        size="small"
        aria-label="cftc table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell align="right">Latest Net Long (Contracts)</TableCell>
            <TableCell align="right">"W/W Change"</TableCell>
            <TableCell align="right">3M Avg</TableCell>
            <TableCell align="right">6M Avg</TableCell>
            <TableCell align="right">1Y Avg</TableCell>
            <TableCell align="right">3Y Max</TableCell>
            <TableCell align="right">3Y Min</TableCell>
            <TableCell align="right">1Y Z-Score</TableCell>
            <TableCell align="right">3Y Z-Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody stripedRows>
          {state.CftcData.map((row, index) => (
            <TableRow
              key={row.key}
              className={index % 2 ? classes.lightRow : classes.darkRow}
            >
              <TableCell components="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="right">
                {row["Latest"].toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell align="right">
                {row["W/W Chg"].toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell align="right">
                {row["3M Avg"].toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell align="right">
                {row["6M Avg"].toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell align="right">
                {row["1Y Avg"].toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell align="right">
                {row["3Y Max"].toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell align="right">
                {row["3Y Min"].toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}
              </TableCell>
              <TableCell align="right">{row["1Y Z-Score"]}</TableCell>
              <TableCell align="right">{row["3Y Z-Score"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
