import React from 'react';
import Modal from 'react-bootstrap/Modal';
import cookie from 'react-cookies'

import FacebookLogin from 'react-facebook-login';

import spotDS from '../api/spots';

export default (props) => {
    const responseFacebook = async (response) => {
        const user = await spotDS.login({
            email: response.email,
            name: response.name,
            accessToken: response.accessToken,
        });

        cookie.save('token', user.token);
        props.setToken(user.token);
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