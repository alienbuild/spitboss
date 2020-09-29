import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/cjs/Modal";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import {getAllUsers} from "../../../user/apiUser";
import {useSelector} from "react-redux";

const SelectOpponent = ({ moveModal, setMoveModal, translateModal, handleClose }) => {

    // init state
    const [opponents, setOpponents] = useState([]);
    const [error, setError] = useState(false);

    const token = useSelector(state => state.user.user.token);
    console.log('Token is: ', token);

    // Get Spitbox Opponents
    getAllUsers(token)
        .then(users => {
            if(users.error){
                setError(true);
            } else {
                setOpponents(users);
            }
        })
        .catch(e => console.log('Error getting opponents: ', e));

    return(
        <div className={`translate-this screen-select-opponent`} style={ moveModal.screen ==='select-opponent' ? { transform:'translateX(0%) translateZ(1px)', position: 'absolute'} : { transform:'translateX(200%) translateZ(1px)', visibility: 'hidden' } }>
            <Modal.Header>
                <Row>
                    <Col>
                        <ul>
                            <li>
                                <button onClick={e => {
                                    e.preventDefault();
                                    translateModal(e, 'default')
                                    setMoveModal({
                                        screen: 'default'
                                    })
                                }}>Go Back</button>
                            </li>
                        </ul>
                    </Col>
                    <Col>
                        <ul>
                            <li>
                                <button onClick={handleClose}>
                                    <lord-icon
                                        animation="loop"
                                        target="button"
                                        palette="#8c8895;#8c8895"
                                        src={`../../assets/icons/38-error-cross-simple-outline/38-error-cross-simple-outline.json`}>
                                    </lord-icon>
                                </button>
                            </li>

                        </ul>
                    </Col>
                </Row>
            </Modal.Header>
            <input type="text" placeholder={`Search`} />
            <ul className={`members-select-list`}>
                {opponents && opponents.map((opponent, index) => (
                    <li key={index}>
                            <span className="list-avatar">
                                <img src="https://fakeimg.pl/36x36/333/fff" alt=""/>
                            </span>
                        <span className="list-name">{opponent.name}</span>
                        <button className="list-checkbox">
                            <lord-icon
                                animation="click"
                                target="button"
                                palette="#8c8895;#8c8895"
                                src={`../../assets/icons/388-check-box-3-morph/388-check-box-3-morph.json`}>
                            </lord-icon>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SelectOpponent;