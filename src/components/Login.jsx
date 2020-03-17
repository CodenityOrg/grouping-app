import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import FacebookLogin from 'react-facebook-login';


export default () => {
    const [show, setShow] = useState(false);


    const responseFacebook = (response) => {
        console.log(response);
    }

    const componentClicked = () => {};
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <FacebookLogin
                        appId="559437671598227"
                        autoLoad={true}
                        fields="name,email,picture"
                        onClick={componentClicked}
                        icon="fa-facebook"
                        callback={responseFacebook} />
                </Modal.Body>
            </Modal>
        </div>
    );
};