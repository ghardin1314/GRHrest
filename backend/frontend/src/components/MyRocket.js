import React from "react";
import { ReactComponent as ColorRocket } from "../static/images/ColorTransport.svg";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
0% {
    transform: translate3d(0px, 0px, 0);
  }
  50% {
    transform: translate3d(0px, -4px, 0);
  }
  100% {
    transform: translate3d(0px, 0px, 0);
  }
`;

const shake = keyframes`
10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }`;

const move = keyframes`
  10%, 90% {
      transform: translate3d(0, -1px, 0);
    }
    
    20%, 80% {
      transform: translate3d(0, 2px, 0);
    }
  
    30%, 50%, 70% {
      transform: translate3d(0, -4px, 0);
    }
  
    40%, 60% {
      transform: translate3d(0, 4px, 0);
    }`;

const StyledRocket = styled(ColorRocket)`
  display: block;
  margin: auto;
  .Rocket {
    animation: ${move} 2s infinite;
  }
  .line1 {
    animation: ${bounce} 0.7s infinite;
  }
  .line2 {
    animation: ${bounce} 0.7s infinite;
    animation-direction: alternate;
  }
  .line3 {
    animation: ${bounce} 0.7s infinite reverse;
  }
  .cloud {
    animation: ${shake} 3s infinite reverse;
  }
`;

export default function MyRocket() {
  return <StyledRocket />;
}
