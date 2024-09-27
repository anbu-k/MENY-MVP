import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { MapFiltersGroup, MapFiltersItem } from "@/app/models/maps/map.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MapFilterComponent from "./map-filter.component";


type MapFiltersGroupComponentProps = {
    group: MapFiltersGroup
}

const MapFiltersGroupComponent = (props: MapFiltersGroupComponentProps) => {
    const [layerIsOpen, setLayerIsOpen] = useState<boolean>(false);
    
    return (
        <>
            <center>
                <b>
                <FontAwesomeIcon onClick={() => setLayerIsOpen(!layerIsOpen)} icon={layerIsOpen ? getFontawesomeIcon(FontAwesomeLayerIcons.MINUS_SQUARE) : getFontawesomeIcon(FontAwesomeLayerIcons.MINUS_SQUARE)}
                style={{
                    paddingRight: "5px"
                }} />
                {props.group.label ?? "" /* Possibly need a different "DisplayName" prop to be used for this if not formatted correctly */}</b>
            </center>
            {
                layerIsOpen &&
                props.group.maps.map(map => (
                    <MapFilterComponent map={map} />
                ))
            }
        </>
    )
}

export default MapFiltersGroupComponent