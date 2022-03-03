import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { useDispatch, useSelector } from "react-redux";
import { showModelBox } from '../../slices/global';
const ModelBoxComponent  = ({title, body, footer}) => {
    const globalStates = useSelector((state)=>{return state.global});
    //console.log('globalStates--->', globalStates);
    const showModel = globalStates.showModelBox
    return (
        <Modal show={showModel}>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
          <ModalBody>{body}</ModalBody>
          {(footer != undefined)? <ModalFooter>footer</ModalFooter>:null}
        </Modal>
      );
}

export default ModelBoxComponent;