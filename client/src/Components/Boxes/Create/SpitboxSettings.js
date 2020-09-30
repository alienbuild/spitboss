import React from "react";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import Modal from "react-bootstrap/cjs/Modal";
import Button from "react-bootstrap/cjs/Button";
import {useSelector} from "react-redux";

const SpitboxSettings = ({ values, setValues, moveModal, setMoveModal, translateModal, handleClose }) => {

    // Grab state from redux store
    const username = useSelector(state => state.user.user.user.name);

    return (
        <div className={`translate-this screen-settings modal-inner`} style={ moveModal.screen ==='settings' ? { transform:'translateX(0%) translateZ(1px)', position: 'absolute'} : { transform:'translateX(200%) translateZ(1px)', visibility: 'hidden'} }>
            <Modal.Header className={`modal-inner__header`}>
                <Row className={`align-items-center`}>
                    <Col>
                        <button className={`modal-inner__button modal-inner__button--left`} onClick={e => {
                            e.preventDefault();
                            translateModal(e, 'default')
                            setMoveModal({
                                screen: 'default'
                            })
                        }}>
                            <lord-icon
                                animation="loop"
                                target="button"
                                palette="#8c8895;#8c8895"
                                src={`../../assets/icons/32-arrow-left/32-arrow-left-outline.json`}>
                            </lord-icon>
                        </button>
                    </Col>
                    <Col md={6}>
                        <div className="modal-inner__title">Settings</div>
                    </Col>
                    <Col>
                        <button className={`modal-inner__button modal-inner__button--right`} onClick={handleClose}>
                            <lord-icon
                                animation="loop"
                                target="button"
                                palette="#8c8895;#8c8895"
                                src={`../../assets/icons/38-error-cross-simple-outline/38-error-cross-simple-outline.json`}>
                            </lord-icon>
                        </button>
                    </Col>
                </Row>
            </Modal.Header>
            <Modal.Body>
                <small style={{ textTransform: 'lowercase'}}>#{username}vs{values.opponent.name && values.opponent.name ? values.opponent.name.toLowerCase().replace(/ /g, '') : null}</small>
            </Modal.Body>
            <Modal.Footer className={`modal-inner__footer`}>
                <Button className={`modal-inner__footer-button`} onClick={e => {
                    e.preventDefault();
                    translateModal(e, 'default')
                    setMoveModal({
                        screen: 'default'
                    })
                }}>Save</Button>
            </Modal.Footer>
        </div>
    )
}

export default SpitboxSettings;