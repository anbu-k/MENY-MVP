import { SectionLayer } from "@/app/models/layers/layer.model";
import { useState } from "react"

type SectionLayerProps = {
    layer: SectionLayer
}

const SectionLayerComponent = (props: SectionLayerProps) => {
    const [layerIsOpen, setLayerIsOpen] = useState<boolean>(false);
    console.log(props)

    return (
        <>
            <center>
            <b
                ><i
                className={`fas compress-expand-icon ${layerIsOpen ? "fa-minus-square" : "fa-plus-square"}`}
                id="long-island-section-caret"
                onClick={() => setLayerIsOpen(!layerIsOpen)}
                ></i>
                &nbsp; {props.layer?.name ?? "" /* Possibly need a different "DisplayName" prop to be used for this if not formatted correctly */}</b>
            </center>
            <div className="layer-list-row">
                <input
                type="checkbox"
                id={props.layer?.id ?? ""}
                name={props.layer?.name ?? ""}
                />
            </div>

            <label htmlFor={props.layer.id}>
                <i className="fa fa-play-circle" style={
                {
                    color: props.layer.iconColor
                }}
                ></i>{props.layer.label}
            <div className="dummy-label-layer-space"></div> 
            </label>
            <div className="layer-buttons-block">
            <div className="layer-buttons-list">
                <i
                className="fa fa-crosshairs zoom-to-layer"
                onClick={() => {}/*zoomtocenter(layerData.zoomTo || "N/A")*/} // Edit zoomFunctions.js to create this function
                title="Zoom to Layer"
                ></i>
                <i
                className="fa fa-info-circle layer-info trigger-popup"
                id="${layerData.infoId || fallbackData.infoId}"
                title="Layer Info"
                ></i>
            </div>
            `;
            </div>
        </>
    )
}

export default SectionLayerComponent;