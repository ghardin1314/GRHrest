import React, { useEffect, useState } from "react";
import "date-fns";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/actions/CftcActions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  root: {
    borderBottom: "none",
  },
}))(TableCell);

const StyledPicker = withStyles((theme) => ({
  root: {
    "& .MuiInputBase-input": {
      color: theme.palette.common.white, // Text color
    },

    "& .MuiInput-underline:before": {
      borderBottomColor: theme.palette.common.white,
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: theme.palette.common.white,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.common.white,
    },
  },
}))(KeyboardDatePicker);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(2),
    height: "80vh",
  },
  table: {
    minWidth: 650,
  },
  tableContainer: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  tableHead: {
    flexgrow: 1,
  },
  lightRow: {
    background: theme.palette.background.default,
  },
  darkRow: {
    background: theme.palette.background.paper,
  },
  dangerText: {
    background: theme.palette.secondary.main,
    color: theme.palette.common.black,
  },
  input: {
    color: theme.palette.common.white,
  },
  icon: {
    fill: theme.palette.common.white,
  },
}));

export default function CftcTable() {
  const data = useSelector((state) => state.CftcData);
  const keys = useSelector((state) => state.CftcKeys);
  const classes = useStyles();
  const [selectedDate, handleChange] = useState(new Date());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.populateCftcTable());
    // eslint-disable-next-line
  }, []);

  function updateTable(date) {
    // Formate date because I'm too good for datetime objects apperently
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    const endDate = [
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
      date.getYear(),
    ].join("");
    const params = {
      params: {
        keys: JSON.stringify(keys),
        endDate: endDate,
      },
    };
    dispatch(actions.getCftcData(params));
  }

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  function handleDateChange(date) {
    handleChange(date);
    //validate date before sending api call
    isValidDate(date) && updateTable(date);
  }

  return (
    <div className={classes.root}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          className={classes.table}
          size="small"
          aria-label="cftc table"
          stickyHeader
        >
          <TableHead className={classes.tableHead}>
            <TableRow key="pickhead">
              <StyledTableCell align="center" colSpan={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <StyledPicker
                      disableFuture
                      autoOk
                      variant="inline"
                      label="Pick Historical Date"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      KeyboardButtonProps={{
                        color: "secondary"
                      }}
                      InputLabelProps={{
                        classes: {
                          root: classes.input,
                        },
                      }}
                      onChange={(date) => handleDateChange(date)}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </StyledTableCell>
              <StyledTableCell />
              <StyledTableCell />
              <StyledTableCell align="center" className={classes.dangerText}>
                High Z-Score{" "}
              </StyledTableCell>
              <StyledTableCell />
              <StyledTableCell colSpan={2} align="right">
                Data as of:
              </StyledTableCell>
              <StyledTableCell colSpan={2} align="left">
                {data[0]["Last Updated"]}
              </StyledTableCell>
            </TableRow>
            <TableRow key="datahead">
              <StyledTableCell style={{ top: 58 }}>Key</StyledTableCell>
              <StyledTableCell style={{ top: 58 }} align="right">
                Latest Net Long (Contracts)
              </StyledTableCell>
              <StyledTableCell style={{ top: 58 }} align="right">
                "W/W Change"
              </StyledTableCell>
              <StyledTableCell style={{ top: 58 }} align="right">
                3M Avg
              </StyledTableCell>
              <StyledTableCell style={{ top: 58 }} align="right">
                6M Avg
              </StyledTableCell>
              <StyledTableCell style={{ top: 58 }} align="right">
                1Y Avg
              </StyledTableCell>
              <StyledTableCell style={{ top: 58 }} align="right">
                3Y Max
              </StyledTableCell>
              <StyledTableCell style={{ top: 58 }} align="right">
                3Y Min
              </StyledTableCell>
              <StyledTableCell style={{ top: 58 }} align="right">
                1Y Z-Score
              </StyledTableCell>
              <StyledTableCell style={{ top: 58 }} align="right">
                3Y Z-Score
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.key}
                className={index % 2 ? classes.lightRow : classes.darkRow}
              >
                <TableCell scope="row">{row.key}</TableCell>
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
                <TableCell
                  align="right"
                  className={
                    Math.abs(row["1Y Z-Score"]) > 2
                      ? classes.dangerText
                      : classes.text
                  }
                >
                  {row["1Y Z-Score"]}
                </TableCell>
                <TableCell
                  align="right"
                  className={
                    Math.abs(row["1Y Z-Score"]) > 2
                      ? classes.dangerText
                      : classes.text
                  }
                >
                  {row["3Y Z-Score"]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
