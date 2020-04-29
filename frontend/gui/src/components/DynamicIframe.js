import React from 'react';
import IframeResizer from 'react-iframe-resizer-super';

export const DynamicIFrame = props => {
  const { src } = props;
  const iframeResizerOptions = {
    // log: true,
    // autoResize: true,
    checkOrigin: false,
    // resizeFrom: 'parent',
    // heightCalculationMethod: 'max',
    // initCallback: () => { console.log('ready!'); },
    // resizedCallback: () => { console.log('resized!'); },
  };
  return (
    <IframeResizer src={src} iframeResizerOptions={iframeResizerOptions} style = {{ width: '100%', minHeight: 350}}/>
  );
};