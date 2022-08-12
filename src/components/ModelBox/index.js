import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModelBox } from '../../slices/global';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
const ModelBoxComponent = ({ title, body, footer }) => {
  const globalStates = useSelector((state) => { return state.global });
  //console.log('globalStates--->', globalStates);
  const showModel = globalStates.showModelBox;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '5px',
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    // <Modal show={showModel}>
    //   <ModalHeader>
    //     <ModalTitle>{title}</ModalTitle>
    //   </ModalHeader>
    //   <ModalBody>{body}</ModalBody>
    //   {(footer != undefined)? <ModalFooter>footer</ModalFooter>:null}
    // </Modal>

    <Modal
      open={showModel}
      //onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h3>{title}</h3>
        <Divider />
        {body}
      </Box>
    </Modal>
  );
}

export default ModelBoxComponent;