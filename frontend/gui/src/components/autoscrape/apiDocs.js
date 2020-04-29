import React from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { CodeBlock, dracula } from "react-code-blocks";

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

export function MakeBlockAPI() {
  const Query = `
    params: {}
    `;
  const Response = `
    [
        {
        "id": 1,
        "name": "Acura",
        "value": "ACURA"
    },
    {
        "id": 2,
        "name": "Alfa Romeo",
        "value": "ALFA"
    },
    {
        "id": 3,
        "name": "AMC",
        "value": "AMC"
    },
    .
    .
    .
    ]
    `;

  return (
    <div>
        <br />
      <BlockAPI title="GET /api/autoscrape/makes/:id" codestring={Query} />
      <br />
      <BlockAPI title="RESPONSE" codestring={Response} />
      <br />
    </div>
  );
}

export function ModelBlockAPI() {
    const Query = `
      params: {
          carmake_pk: 1, //optional
      }
      `;
    const Response = `
      [
        {
            "id": 1,
            "name": "CL",
            "value": "ACUCL",
            "carmake_pk": 1
        },
        {
            "id": 2,
            "name": "ILX",
            "value": "ILX",
            "carmake_pk": 1
        },
        {
            "id": 3,
            "name": "Integra",
            "value": "INTEG",
            "carmake_pk": 1
        },
      .
      .
      .
      ]
      `;
  
    return (
      <div>
          <br />
        <BlockAPI title="GET /api/autoscrape/models/:id" codestring={Query} />
        <br />
        <BlockAPI title="RESPONSE" codestring={Response} />
        <br />
      </div>
    );
  }


  export function TrimBlockAPI() {
    const Query = `
      params: {
          carmake_pk: 1, //optional, 
          carmodel_pk: 3, //optional, prioritized over carmake_pk 
      }
      `;
    const Response = `
      [
        {
            "id": 2,
            "name": "GS",
            "value": "INTEG|GS",
            "carmake_pk": 1,
            "carmodel_pk": 3
        },
        {
            "id": 3,
            "name": "GS-R",
            "value": "INTEG|GS-R",
            "carmake_pk": 1,
            "carmodel_pk": 3
        },
        {
            "id": 4,
            "name": "LS",
            "value": "INTEG|LS",
            "carmake_pk": 1,
            "carmodel_pk": 3
        },
      .
      .
      .
      ]
      `;
  
    return (
      <div>
          <br />
        <BlockAPI title="GET /api/autoscrape/trims/:id" codestring={Query} />
        <br />
        <BlockAPI title="RESPONSE" codestring={Response} />
        <br />
      </div>
    );
  }

  export function ResultsBlockAPI() {
    const Query = `
      params: {
          carmake_pk: 1, 
          carmodel_pk: 12, //prioritized over carmake_pk 
          cartrim_pk: 18, //prioritized over carmodel_pk 
      }
      
      *Some queries do not have results, this causes an error in the results processing
      `;
    const Response = `
    [
        {
            "results": [
                {
                    "id": 2182,
                    "year": 2014,
                    "miles": 89937,
                    "price": 16690.0,
                    "carmake_pk": 1,
                    "carmodel_pk": 12,
                    "cartrim_pk": 18
                },
                .
                .
                .
                ]
            },
            {
                "bestBuy": {
                    "year": 2010,
                    "miles": 155000,
                    "price": 9000
                }
            },
            {
                "surface": {
                    "x": [linspace(minYear, MaxYear, 100)],
                    "y": [linspace(minMiles, MaxMiles, 100)],
                    "z": [100x100 matrix of price surface],
            }
      ]
      `;
  
    return (
      <div>
          <br />
        <BlockAPI title="GET /api/autoscrape/results/" codestring={Query} />
        <br />
        <BlockAPI title="RESPONSE" codestring={Response} />
        <br />
      </div>
    );
  }