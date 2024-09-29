'use client';
import React, { DetailedHTMLProps, HTMLAttributes, RefObject, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxCompareWrapper from './mapbox-compare.component';

interface MapboxCompareProps {
  comparisonContainerRef: RefObject<HTMLDivElement>;
  beforeMapContainerRef: RefObject<HTMLDivElement>;
  afterMapContainerRef: RefObject<HTMLDivElement>;
}

const isClient = typeof window !== 'undefined'
const MapComparisonComponent = (props: MapboxCompareProps) => {  
    return (
      <>
      <MapboxCompareWrapper
        comparisonContainerRef={props.comparisonContainerRef}
        beforeMapContainerRef={props.beforeMapContainerRef}
        afterMapContainerRef={props.afterMapContainerRef}
      ></MapboxCompareWrapper>
      </>
    );
}

export default MapComparisonComponent;