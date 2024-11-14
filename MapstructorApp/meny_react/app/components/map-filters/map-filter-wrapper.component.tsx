import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { MapFiltersGroup } from "@/app/models/maps/map-filters.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapFilterComponent from "./map-filter.component";
import MapFiltersGroupComponent from "./map-filters-group.component";
import { useEffect } from "react";
import { MapItem, MapZoomProps } from "@/app/models/maps/map.model";

export type MapFilterWrapperProps = {
  defaultMap: MapItem;
  mapGroups: MapFiltersGroup[];
  beforeOpen: () => void;
  afterClose: () => void;
  beforeMapCallback: (map: MapItem) => void;
  afterMapCallback: (map: MapItem) => void;
  mapZoomCallback: (zoomProps: MapZoomProps) => void;
};

const MapFilterWrapperComponent = (props: MapFilterWrapperProps) => {
  // Coordinates and zoom level for World view
  const worldZoomProps: MapZoomProps = {
    center: [24.7, -22], // Longitude and Latitude
    zoom: 1.6, 
    speed: 0.5, 
    curve: 1, 
    duration: 2000, 
  };

  return (
    <>
      <div>
        <p className="title">MAPS</p>
        <MapFilterComponent
          mapZoomCallback={props.mapZoomCallback}
          beforeMapCallback={props.beforeMapCallback}
          afterMapCallback={props.afterMapCallback}
          map={props.defaultMap}
          displayZoomButton={false}
          displayInfoButton
        ></MapFilterComponent>
        <br />
        <div id="maps-group">
          {props.mapGroups.map((m, idx) => (
            <MapFiltersGroupComponent
              beforeOpen={props.beforeOpen}
              afterClose={props.afterClose}
              mapZoomCallback={props.mapZoomCallback}
              key={`map-filters-group-${idx}`}
              beforeMapCallback={props.beforeMapCallback}
              afterMapCallback={props.afterMapCallback}
              group={m}
            ></MapFiltersGroupComponent>
          ))}
        </div>
        <center>
          <button
            style={{
              borderColor: "grey",
              borderWidth: "1px",
              borderStyle: "solid",
              borderRadius: "5px",
              padding: "1px",
              paddingLeft: "5px",
              paddingRight: "5px",
            }}
            onClick={() => props.mapZoomCallback(worldZoomProps)}
            id="zoom-world"
          >
            <FontAwesomeIcon
              icon={getFontawesomeIcon(FontAwesomeLayerIcons.GLOBE)}
            ></FontAwesomeIcon>
            <strong>Zoom to World</strong>
          </button>
        </center>
      </div>
    </>
  );
};

export default MapFilterWrapperComponent;
