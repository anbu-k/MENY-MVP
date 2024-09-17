'use client';
import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const isClient = typeof window !== 'undefined'
const MapComparisonComponent = () => {
    const mapRef = useRef();
    const beforeMapContainerRef = useRef<HTMLDivElement>(null);
    const afterMapContainerRef = useRef<HTMLDivElement>(null);
    const comparisonContainerRef = useRef<HTMLDivElement>(null);
  
    const mapStyle = { position: 'absolute', top: 0, bottom: 0, width: '100%' };
  
    useEffect(() => {
      // some development servers will run this hook more than once
      // return if the map has already been initialized
      if (mapRef.current) return;
  
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ';
      mapboxgl.config.ACCESS_TOKEN = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ'
    }, []);
  
    return (
      <>
      <MapComparisonComponent></MapComparisonComponent>
      </>
    );
}

export default MapComparisonComponent;