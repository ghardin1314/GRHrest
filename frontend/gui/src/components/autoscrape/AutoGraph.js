import React from "react";
import { useSelector } from "react-redux";

import Plot from "react-plotly.js";

import Grid from "@material-ui/core/Grid";

export default function AutoGraph() {
  const state = useSelector((state) => state);

  var MyTitle =
    state.MakeName +
    " " +
    (state.ModelName === "" ? "" : state.ModelName + " ") +
    (state.TrimName === "" ? "" : state.TrimName + " ") +
    "Results";

  var anno = state.Results.length === 0 ? "Please select make, model, trim and submit." : "";

  return (
    <Grid container item xs={12} style={{ height: "80vh" }}>
      <Plot
        data={[
          {
            type: "scatter3d",
            name: "Listings",
            x: state.unpackedData.x,
            y: state.unpackedData.y,
            z: state.unpackedData.z,
            mode: "markers",
            visible: state.showScatter,
            marker: {
              color: "rgb(0,0,255)",
              size: 5,
            },
          },
          {
            type: "scatter3d",
            name: "Best",
            x: [state.BestBuy["year"]],
            y: [state.BestBuy["miles"]],
            z: [state.BestBuy["price"]],
            mode: "markers",
            visible: state.showBest,
            marker: {
              color: "rgb(255, 0, 0)",
              size: 15,
              symbol: "diamond",
            },
          },
          {
            type: "surface",
            x: state.Surface.x,
            y: state.Surface.y,
            z: state.Surface.z,
            visible: state.showSurface,
            showscale: false,
          },
        ]}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
        layout={{
          autosize: true,
          margin: {
            l: 10,
            r: 10,
            b: 10,
          },
          aspectmode: "manual",
          title: MyTitle,
          annotations: [
            {
              text: anno,
              showarrow: false,
              size: 20,
            },
          ],
          scene: {
            aspectratio: { x: 3, y: 3, z: 1 },
            xaxis: {
              title: "Year",
              dtick: 1,
            },
            yaxis: {
              title: "Miles",
            },
            zaxis: {
              rangemode: "nonnegative",
              title: "Price",
              
            },
          },
          legend: {
            x: 1,
            xanchor: "right",
            y: 1,
          },
        }}
      />
    </Grid>
  );
}
