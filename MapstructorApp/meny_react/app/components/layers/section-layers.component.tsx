import { SectionLayer } from "@/app/models/layers/layer.model";
import SectionLayerComponent from "./section-layer.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type SectionLayersProps = {
    layers: SectionLayer[]
}

const SectionLayersComponent = (props: SectionLayersProps) => {
    return (
        <div id="studioMenu">
        <FontAwesomeIcon id="mobi-hide-sidebar" icon="arrow-circle-left" />
        <p className="title">LAYERS</p>
        <br />
        {
            props.layers.map(layer => {
                return (
                    <>
                        <SectionLayerComponent layer={layer} />
                        <br />
                    </>
                )
            })
        }
      </div>
    )
}

export default SectionLayersComponent;