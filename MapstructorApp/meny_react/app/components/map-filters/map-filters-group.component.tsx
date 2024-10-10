import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { MapFiltersGroup } from "@/app/models/maps/map-filters.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MapFilterComponent from "./map-filter.component";
import { IconColors } from "@/app/models/colors.model";
import { MapItem } from "@/app/models/maps/map.model";


type MapFiltersGroupComponentProps = {
    group: MapFiltersGroup,
    beforeMapCallback: (map: MapItem) => void,
    afterMapCallback: (map: MapItem) => void
}

const MapFiltersGroupComponent = (props: MapFiltersGroupComponentProps) => {
    const [layerIsOpen, setLayerIsOpen] = useState<boolean>(false);
    console.log('GROUPPPPP: ', props.group);

    return (
        <>
            <center>
                <b>
                <FontAwesomeIcon onClick={() => setLayerIsOpen(!layerIsOpen)} color={IconColors.GREY} icon={layerIsOpen ? getFontawesomeIcon(FontAwesomeLayerIcons.MINUS_SQUARE, true) : getFontawesomeIcon(FontAwesomeLayerIcons.PLUS_SQUARE, true)}
                style={{
                    paddingRight: "5px"
                }} />
                {props.group.label ?? "" /* Possibly need a different "DisplayName" prop to be used for this if not formatted correctly */}</b>
            </center>
            {
                layerIsOpen &&
                props.group.maps.map((map, idx) => (
                    <MapFilterComponent beforeMapCallback={props.beforeMapCallback} afterMapCallback={props.afterMapCallback} key={`map-filter-component-${idx}`} map={map} displayInfoButton displayZoomButton/>
                ))
            }
        </>
    )
}

export default MapFiltersGroupComponent