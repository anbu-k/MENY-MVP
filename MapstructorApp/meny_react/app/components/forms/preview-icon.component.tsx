import { getFontawesomeIcon, parseFromString } from "@/app/helpers/font-awesome.helper";
import { FontAwesomeLayerIcons } from "@/app/models/font-awesome.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type PreviewIconProps = {
    color: string,
    iconType: string
}

const PreviewIcon = (props: PreviewIconProps) => {
    return <FontAwesomeIcon color={props.color} icon={parseFromString(props.iconType) ?? getFontawesomeIcon(FontAwesomeLayerIcons.LINE)}></FontAwesomeIcon> 
}

export default PreviewIcon;