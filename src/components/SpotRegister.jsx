import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import spotDS from '../api/spots';

export default (props) => {

    const {onClose} = props;

    const [spot, setSpot] = useState({
        name: "",
        quantity: 0
    });

    const setSpotNameHandler = e => {
        setSpot({
            ...spot,
            name: e.target.value
        })
    }

    const setSpotQuantityHandler = e => {
        setSpot({
            ...spot,
            quantity: e.target.value
        })
    };

    const saveSpot = async () => {
        await spotDS.save(spot);
        onClose();
    };

    return (
        <Modal show={props.show} onHide={onClose}>
            <Modal.Body>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Nombre del local (Opcional)</Form.Label>
                    <Form.Control type="text" onChange={setSpotNameHandler} value={spot.name} placeholder="Nombre" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Cuantas personas hay?</Form.Label>
                    <Form.Control onChange={setSpotQuantityHandler} as="select" value={spot.quantity}>
                        <option>Choose...</option>
                        <option value="0">Vacio</option>
                        <option value="1">Casi lleno</option>
                        <option value="2">Lleno</option>
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={saveSpot}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}