import { SectionLayer, SectionLayerGroup, SectionLayerItem } from "@/app/models/layers/layer.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faMinusSquare, faPlusSquare, faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import SectionLayerGroupComponent from "./section-layer-group.component";


type SectionLayerProps = {
    layersHeader: string,
    layer: SectionLayer,
    activeLayerCallback: (activeLayers: string[]) => void,
    activeLayers: string[],
    openWindow: () => void,
    editFormVisibleCallback: (isOpen: boolean) => void,
    editFormIdCallback: (id: string) => void,
}

const SectionLayerComponent = (props: SectionLayerProps) => {
    const [layerIsOpen, setLayerIsOpen] = useState<boolean>(false);
    
    return (
        <>
            <center>
                <b>
                <FontAwesomeIcon onClick={() => setLayerIsOpen(!layerIsOpen)} icon={layerIsOpen ? faMinusSquare : faPlusSquare}
                style={{
                    paddingRight: "5px"
                }} />
                {props.layersHeader ?? "" /* Possibly need a different "DisplayName" prop to be used for this if not formatted correctly */}</b>
            </center>
            {
                layerIsOpen &&
                props.layer.groups.map((grp, idx) => (
                    <SectionLayerGroupComponent 
                    key={`section-layer-component-${idx}`} 
                    activeLayers={props.activeLayers} 
                    activeLayerCallback={props.activeLayerCallback} 
                    layersHeader={props.layersHeader} 
                    group={grp} 
                    openWindow={props.openWindow}
                    editFormVisibleCallback={props.editFormVisibleCallback}
                    editFormIdCallback={props.editFormIdCallback}/>
                ))
            }
        </>
    )
}

export default SectionLayerComponent;