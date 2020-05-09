import React from "react";
import VisibilitySensor from "react-visibility-sensor";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import { CodeBlock } from "react-code-blocks";

import { useDispatch } from "react-redux";

import * as actions from "../../store/actions/AutoActions";

function BlockAPI({ title, codestring }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <CodeBlock
              language="json"
              showLineNumbers={false}
              text={codestring}
            />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function CftcKeysAPI() {
  const Query = `
      params: {}
      `;
  const Response = `
    {
        "keys": [
            "10-YEAR US TREASURY NOTES",
            "2 HEATING OIL- NY HARBOR-ULSD",
            "2-YEAR US TREASURY NOTES",
            .
            .
            .
        ]
    }
      `;

  return (
    <div>
      <br />
      <BlockAPI title="GET /api/cftc/getCFTCkeys/" codestring={Query} />
      <br />
      <BlockAPI title="RESPONSE" codestring={Response} />
      <br />
    </div>
  );
}

export function CftcDataAPI() {
  const Query = `
      params: {
          endDate: 102415, //optional, format is MMDDYY, returns data as it would appear from that date
          keys: JSON.stringify(["10-YEAR US TREASURY NOTES", "2 HEATING OIL- NY HARBOR-ULSD"]) //NOTE: must be passed as a list in JSON string format
      }
      `;
  const Response = `
    {
        "results": [
        {
            "key": "10-YEAR US TREASURY NOTES",
            "Latest": 2557.0,
            "W/W Chg": -34969.0,
            "3M Avg": 7551.0,
            "6M Avg": -23026.0,
            "1Y Avg": -87319.0,
            "3Y Max": 214021.0,
            "3Y Min": -277477.0,
            "1Y Z-Score": 1.0,
            "3Y Z-Score": 0.29,
            "Last Updated": "10-20-15"
        },
        {
            "key": "2 HEATING OIL- NY HARBOR-ULSD",
            "Latest": -10715.0,
            "W/W Chg": 2497.0,
            "3M Avg": -4212.0,
            "6M Avg": -1827.0,
            "1Y Avg": -14483.0,
            "3Y Max": 40594.0,
            "3Y Min": -34705.0,
            "1Y Z-Score": 0.28,
            "3Y Z-Score": -0.29,
            "Last Updated": "10-20-15"
        },
            .
            .
            .
        ]
    }
      `;

  return (
    <div>
      <br />
      <BlockAPI title="GET /api/cftc/getCFTCdata/" codestring={Query} />
      <br />
      <BlockAPI title="RESPONSE" codestring={Response} />
      <br />
    </div>
  );
}

export default function CftcApiSection() {
  const updateSelection = (field, selection) => {
    dispatch(actions.updateSelection(field, selection));
  };

  const dispatch = useDispatch();

  function backStep(isVisible, step) {
    if (!isVisible) {
      updateSelection("activeStep", step - 1);
    }
  }

  function setStep(isVisible, step) {
    if (isVisible) {
      updateSelection("activeStep", step);
    }
  }

  return (
    <React.Fragment>
      <VisibilitySensor
        offset={{ top: 200, bottom: 200 }}
        onChange={(isVisible) => setStep(isVisible, 1)}
      >
        <VisibilitySensor
          offset={{ bottom: 200 }}
          partialVisibility="bottom"
          onChange={(isVisible) => backStep(isVisible, 1)}
        >
          <Typography variant="h4" gutterBottom>
            API:
          </Typography>
        </VisibilitySensor>
      </VisibilitySensor>
      <Typography variant="subtitle1" gutterBottom>
        Get keys of commodities and indices for which data is available.
      </Typography>
      <CftcKeysAPI />
      <Typography variant="subtitle1" gutterBottom>
        Get statistics of net long contracts for different key names. Can
        specify date for historical data. 
      </Typography>
      <CftcDataAPI />
    </React.Fragment>
  );
}
