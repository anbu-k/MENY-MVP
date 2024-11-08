import { SectionLayer, SectionLayerItem } from "@/app/models/layers/layer.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faMinusSquare, faPlusSquare, faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { faCrosshairs, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { getFontawesomeIcon } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { MapZoomProps } from "@/app/models/maps/map.model";

type SectionLayerGroupItemProps = {
    item: SectionLayerItem,
    activeLayerCallback: (activeLayers: string[]) => void,
    activeLayers: string[],
    openWindow: () => void,
    editFormVisibleCallback: (isOpen: boolean) => void,
    editFormIdCallback: (id: string) => void,
    mapZoomCallback:(zoomProps: MapZoomProps) => void
}

const SectionLayerGroupItemComponent = (props: SectionLayerGroupItemProps) => {

    const handleLayerChange = () => {
        console.log('handleLayerChange Hit: ', props.item);
        if(props.item.layerId)
        {
            console.log('CALLBACK ITEMS: ', props.activeLayers, props.item.layerId)
            if (props.activeLayers.includes(props.item.layerId)) {
                props.activeLayerCallback(props.activeLayers.filter((d) => d !== props.item.layerId));
              } else {
                props.activeLayerCallback([...props.activeLayers, props.item.layerId]);
              }
        }
    }

    return (
        <>
            <div className="layer-list-row">
                <input
                type="checkbox"
                id={`section-layer-group-item-${props.item?.id ?? ""}`}
                style={{
                    marginLeft: "20px",
                    marginRight: "5px"
                }}
                onChange={handleLayerChange}
                />

                <label htmlFor={`section-layer-group-item-${props.item?.id ?? ""}`}>
                <FontAwesomeIcon icon={getFontawesomeIcon(props.item.iconType, props.item.isSolid)} style={{
                    color: props.item.iconColor
                }} /> {props.item.label}
                <div className="dummy-label-layer-space"></div> 
                </label>
                <div className="layer-buttons-block">
                    <div className="layer-buttons-list">
                        <FontAwesomeIcon
                        className="layer-menu edit-modal"
                        title="Edit Layer"
                        color="black"
                        icon={getFontawesomeIcon(FontAwesomeLayerIcons.PEN_TO_SQUARE)}
                        onClick={() => {
                            props.openWindow();
                            props.editFormIdCallback(props.item.layerId ?? '');
                            console.log("Layer id: " + props.item.layerId);
                            props.editFormVisibleCallback(true);
                        }}
                        />
                        <FontAwesomeIcon
                        className="zoom-to-layer"
                        title="Zoom to Layer"
                        color="blue"
                        icon={getFontawesomeIcon(FontAwesomeLayerIcons.CROSSHAIRS)}
                        onClick={() => {
                            props.mapZoomCallback({
                                center: props.item.center,
                                zoom: props.item.zoom,
                                speed: 0.2,
                                curve: 1,
                                duration: 2500,
                            })
                        }}
                        />
                        <FontAwesomeIcon
                        className="layer-info trigger-popup"
                        title="Layer Info"
                        color="grey"
                        icon={getFontawesomeIcon(FontAwesomeLayerIcons.INFO_CIRCLE)}
                        onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit This to pull up a modal
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionLayerGroupItemComponent;
