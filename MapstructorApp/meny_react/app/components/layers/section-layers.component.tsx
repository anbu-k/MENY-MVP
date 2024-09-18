import { SectionLayer } from "@/app/models/layers/layer.model";
import SectionLayerComponent from "./section-layer.component";


type SectionLayersProps = {
    layers: SectionLayer[]
}

const SectionLayersComponent = (props: SectionLayersProps) => {
    console.log("LAYERSSSS: ", props.layers);

    return (
        <div id="studioMenu">
        <i id="mobi-hide-sidebar" className="fa fa-arrow-circle-left fa-3x"></i>
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