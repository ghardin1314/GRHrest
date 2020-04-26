import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/actions/AutoActions";
import Plot from "react-plotly.js";

export default function AutoGraph() {
  const state = useSelector((state) => state);

  //   const dispatch = useDispatch();

  var MyTitle =
    state.MakeName + " " + state.ModelName + " " + state.TrimName + " Results";

  var MyBest =
    "Best: " +
    state.BestBuy.year +
    " with " +
    state.BestBuy.miles +
    " miles at $" +
    state.BestBuy.price;

  return (
    <div style={{ height: "80vh", width: "90vw", justifyContent: "center" }}>
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
          aspectmode: "manual",
          title: MyTitle,
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
              title: "Price",
            },
          },
        }}
      />
    </div>
  );
}
