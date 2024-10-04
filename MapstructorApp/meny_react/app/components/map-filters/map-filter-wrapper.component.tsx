import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { MapFiltersGroup } from "@/app/models/maps/map-filters.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapFilterComponent from "./map-filter.component";
import MapFiltersGroupComponent from "./map-filters-group.component";
import { useEffect } from "react";
import { MapItem } from "@/app/models/maps/map.model";


export type MapFilterWrapperProps = {
    defaultMap: MapItem,
    mapGroups: MapFiltersGroup[],
    beforeMapCallback: (map: MapItem) => void,
    afterMapCallback: (map: MapItem) => void,
}

const MapFilterWrapperComponent = (props: MapFilterWrapperProps) => {

    return (
        <>
        <div>
            <p className="title">MAPS</p>
            <MapFilterComponent map={props.defaultMap} displayZoomButton={false} displayInfoButton></MapFilterComponent>
            <br />
            <div id="maps-group">
                {
                    props.mapGroups.map(m => (
                        <MapFiltersGroupComponent group={m}></MapFiltersGroupComponent>
                    ))
                }
            </div>
            <center>
                <button
                style={{
                    borderColor: 'grey',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderRadius: '5px',
                    padding: '1px',
                    paddingLeft: '5px',
                    paddingRight: '5px'
                }}
                onClick={() => {}/*() => zoomtobounds('World')*/} id="zoom-world">
                    <FontAwesomeIcon icon={getFontawesomeIcon(FontAwesomeLayerIcons.GLOBE)}></FontAwesomeIcon>
                    <strong>Zoom to World</strong>
                </button>
            </center>
        </div>
    </>
    );
}

export default MapFilterWrapperComponent;