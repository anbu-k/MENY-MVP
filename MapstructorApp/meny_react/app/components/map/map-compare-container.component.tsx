'use client';
import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxCompare from 'mapbox-gl-compare';

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

      const beforeMap = new mapboxgl.Map({
        container: 'before',
        style: 'mapbox://styles/nittyjee/cjooubzup2kx52sqdf9zmmv2j',
        center: [0, 0],
        hash: true,
        zoom: 0,
        attributionControl: false
      });
  
      const afterMap = new mapboxgl.Map({
        container: 'after',
        style: 'mapbox://styles/nittyjee/cjowjzrig5pje2rmmnjb5b0y2',
        center: [0, 0],
        hash: true,
        zoom: 0,
        attributionControl: false
      });
  
      mapRef.current = new MapboxCompare(
        beforeMap,
        afterMap,
        comparisonContainerRef.current
      );
    }, []);
  
    return (
      <>
      {
        isClient && (
          <div
          id="comparison-container"
          ref={comparisonContainerRef}
          style={{ height: '100%', position: 'relative' }}
          >
            <div id="before" ref={beforeMapContainerRef} style={mapStyle as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>}></div>
            <div id="after" ref={afterMapContainerRef} style={mapStyle as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>}></div>
          </div>
        )
      }
      </>
    );
}

export default MapComparisonComponent;