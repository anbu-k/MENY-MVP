import { SectionLayer } from "@/app/models/layers/layer.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faMinusSquare, faPlusSquare, faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { faCrosshairs, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

type SectionLayerProps = {
    layer: SectionLayer
}

const SectionLayerComponent = (props: SectionLayerProps) => {
    const [layerIsOpen, setLayerIsOpen] = useState<boolean>(false);
    console.log(props);

    return (
        <>
            <center>
            <b>
                <FontAwesomeIcon onClick={() => setLayerIsOpen(!layerIsOpen)} icon={layerIsOpen ? faMinusSquare : faPlusSquare} />
                {props.layer?.name ?? "" /* Possibly need a different "DisplayName" prop to be used for this if not formatted correctly */}</b>
            </center>
            <div className="layer-list-row">
                <input
                type="checkbox"
                id={props.layer?.id ?? ""}
                name={props.layer?.name ?? ""}
                />
            </div>

            <label htmlFor={props.layer.id}>
                <FontAwesomeIcon icon={faPlayCircle} style={{
                    color: props.layer.iconColor
                }} /> {props.layer.label}
            <div className="dummy-label-layer-space"></div> 
            </label>
            <div className="layer-buttons-block">
                <div className="layer-buttons-list">
                    <FontAwesomeIcon
                    className="zoom-to-layer"
                    title="Zoom to Layer" 
                    icon={faCrosshairs}
                    onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit zoomFunctions.js to create this function
                    />
                    <FontAwesomeIcon
                    className="layer-info trigger-popup"
                    title="Layer Info" 
                    icon={faInfoCircle}
                    onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit This to pull up a modal
                    />
                </div>
            </div>
        </>
    )
}

export default SectionLayerComponent;