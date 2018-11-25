import React from 'react';
import { Modal } from 'antd';
import '../login.css'

const ConfirmModal = ({showModal}) => {
    return(
        <Modal
          visible={showModal}
        >
         <p> Congratulations ! You have logged successfully!</p>
        </Modal>
    )
}
export default ConfirmModal;