import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { useCookies } from 'react-cookie';

import FacebookLogin from 'react-facebook-login';

import spotDS from '../api/spots';

export default (props) => {
    const [, setShow] = useState(false);
    const [, setCookie] = useCookies(['token']);

    const responseFacebook = async (response) => {
        const user = await spotDS.login({
            email: response.email,
            name: response.name,
            accessToken: response.accessToken,
        });

        setCookie('token', user.token);
        props.onClose();
    }

    return (
        <div>
            <Modal show={props.show} >
                <Modal.Body>
                    <FacebookLogin
                        appId="559437671598227"
                        fields="name,email,picture"
                        icon="fa-facebook"
                        callback={responseFacebook} />
                </Modal.Body>
            </Modal>
        </div>
    );
};