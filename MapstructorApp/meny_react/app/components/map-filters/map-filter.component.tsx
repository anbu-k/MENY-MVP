import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper"
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model"
import { MapItem } from "@/app/models/maps/map.model"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


type MapFilterComponentProps = {
    map: MapItem,
    displayZoomButton: boolean,
    displayInfoButton: boolean
}

const MapFilterComponent = (props: MapFilterComponentProps) => {

    return (
        <>
            <div className="layer-list-row">
                <input
                    className={props.map.mapId}
                    type="radio"
                    name="ltoggle"
                    value={props.map.mapId}
                    style={{
                        margin: "2px"
                    }}
                />
                <input
                    className={props.map.mapId}
                    type="radio"
                    name="rtoggle"
                    value={props.map.mapId}
                />
                &nbsp;
                <label htmlFor={props.map.mapId}>
                    { props.map.name }
                    <div className="dummy-label-layer-space"></div></label>
                <div className="layer-buttons-block">
                    <div className="layer-buttons-list">
                        {
                            props.displayZoomButton &&
                            (
                                <FontAwesomeIcon
                                className="zoom-to-layer"
                                title="Zoom to Layer"
                                color="blue"
                                icon={getFontawesomeIcon(FontAwesomeLayerIcons.CROSSHAIRS)}
                                onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit zoomFunctions.js to create this function
                                />
                            )
                        }
                        {
                            !props.displayZoomButton &&
                            (
                                <i style={{width: "16px"}}></i>
                            )
                        }
                        {
                            props.displayInfoButton &&
                            (
                                <FontAwesomeIcon
                                className="layer-info trigger-popup"
                                title="Layer Info"
                                color="grey"
                                icon={getFontawesomeIcon(FontAwesomeLayerIcons.INFO_CIRCLE)}
                                onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit This to pull up a modal
                                />
                            )
                        }
                        {
                            !props.displayInfoButton &&
                            (
                                <i style={{width: "16px"}}></i>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MapFilterComponent