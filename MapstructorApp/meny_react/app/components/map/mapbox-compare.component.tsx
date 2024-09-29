"use client";
import mapboxgl, { Map } from 'mapbox-gl'; 
import { RefObject, useEffect, useRef, useState } from "react";
import { addBeforeLayers } from '../maps/beforemap';  
import '../../compare.css';  

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ';

interface MapboxCompareWrapperProps {
  comparisonContainerRef: RefObject<HTMLDivElement>;
  beforeMapContainerRef: RefObject<HTMLDivElement>;
  afterMapContainerRef: RefObject<HTMLDivElement>;
}

export default function MapboxCompareWrapper(props: MapboxCompareWrapperProps) {
  const footerHeight = 74;
  return (
    <div
      id="comparison-container"
      ref={props.comparisonContainerRef}
      style={{ height: `calc(100vh - ${footerHeight}px)`, width: '100vw', position: 'relative' }} 
    >
      {/* Before and After Maps */}
      <div id="before" ref={props.beforeMapContainerRef} className="map-style"></div>
      <div id="after" ref={props.afterMapContainerRef} className="map-style"></div>

      {/* Compare Swiper */}
      <div className="compare-swiper"></div>
    </div>
  );
}
