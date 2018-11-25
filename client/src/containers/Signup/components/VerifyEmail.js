import React from 'react';
import { Modal } from 'antd';
import '../signup.css'

const verifyEmail = ({showModal}) => {
    return(
        <Modal
          visible={showModal}
        >
         <p> A verification Link has been sent to your email. Please click on the link to verify it.</p>
        </Modal>
    )
}
export default verifyEmail;