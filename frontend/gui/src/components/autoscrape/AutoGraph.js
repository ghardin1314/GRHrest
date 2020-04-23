import React, {Component} from 'react';
import {render} from 'react-dom';
import DeckGL from '@deck.gl/react';
import {OrbitView} from '@deck.gl/core';
// import PlotLayer from './plot-layer';
import {scaleLinear} from 'd3-scale';

const INITIAL_VIEW_STATE = {
    target: [0.5, 0.5, 0.5],
    orbitAxis: 'Y',
    rotationX: 30,
    rotationOrbit: -30,
    /* global window */
    zoom: typeof window !== `undefined` ? Math.log2(window.innerHeight / 3) : 1 // fit 3x3x3 box in current viewport
  };

function getScale({min, max}) {
    return scaleLinear()
      .domain([min, max])
      .range([0, 1]);
  }


export default function AutoGraph(data){
return(
    <div>
         
    </div>
)
}