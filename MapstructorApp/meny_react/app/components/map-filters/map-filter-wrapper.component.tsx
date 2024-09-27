import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { MapFiltersGroup, MapFiltersItem } from "@/app/models/maps/map.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MapFilterComponent from "./map-filter.component";
import MapFiltersGroupComponent from "./map-filters-group.component";


export type MapFilterWrapperProps = {
    defaultMap: MapFiltersItem,
    mapGroups: MapFiltersGroup[]
}

const MapFilterWrapperComponent = (props: MapFilterWrapperProps) => {

    return (
        <>
        <div>
            <p className="title">MAPS</p>
            <MapFilterComponent map={props.defaultMap}></MapFilterComponent>
            <br />
            <div id="maps-group">
                {
                    props.mapGroups.map(m => (
                        <MapFiltersGroupComponent group={m}></MapFiltersGroupComponent>
                    ))
                }
            </div>
            <center>
                <button onClick={() => {}/*() => zoomtobounds('World')*/} id="zoom-world">
                    <FontAwesomeIcon icon={getFontawesomeIcon(FontAwesomeLayerIcons.GLOBE)}></FontAwesomeIcon>
                    <b>Zoom to World</b> &nbsp; &nbsp; &nbsp;
                </button>
            </center>
        </div>
    </>
    );
}

export default MapFilterWrapperComponent;