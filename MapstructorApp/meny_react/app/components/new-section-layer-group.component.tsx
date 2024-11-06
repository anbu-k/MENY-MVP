import { useEffect, useState } from "react";
import Modal from 'react-modal';
import LayerForm from './forms/LayerForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeLayerIcons } from "../models/font-awesome.model";
import { getFontawesomeIcon } from "../helpers/font-awesome.helper";
import NewLayerGroupForm from "./forms/LayerGroupForm";

type LayerFormButtonProps = {
    sectionLayerName: string,
    beforeOpen: () => void,
    afterClose: () => void,
}

const NewSectionLayerGroup = (props: LayerFormButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const openWindow = () => {
        props.beforeOpen()
        setIsOpen(true)
    }

    const closeWindow = () => {
        props.afterClose()
        setIsOpen(false)
    }

    useEffect(() => {
        console.log(isOpen)
    }, [isOpen])

    // Necessary for the Modal to know what to hide
    Modal.setAppElement('#app-body-main');

    return (
        <>
            <div style={{paddingLeft: '15px', paddingRight: '10px', textAlign: 'center'}}>
                <a style={{width: '100%', backgroundColor: 'grey', color: 'white', margin: 'auto', padding: '2px 7px 2px 7px'}} onClick={openWindow}>
                    <FontAwesomeIcon icon={getFontawesomeIcon(FontAwesomeLayerIcons.PLUS_SQUARE, true)}></FontAwesomeIcon> New Group
                </a>
            </div>
            <Modal
                style={{
                    content: {
                        width: '30%',
                        right: '5px'
                    }
                }}
                isOpen={isOpen}
                onRequestClose={closeWindow}
                contentLabel='New Group'
            >
                <NewLayerGroupForm sectionLayerName={props.sectionLayerName}></NewLayerGroupForm>
            </Modal>
        </>
    )
}

export default NewSectionLayerGroup;