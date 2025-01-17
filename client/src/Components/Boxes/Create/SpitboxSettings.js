import React, {useState} from "react";
import {useSelector} from "react-redux";
import Select from 'react-dropdown-select';

const SpitboxSettings = ({ values, setValues, moveModal, setMoveModal, translateModal, handleClose }) => {

    // Grab state from redux store
    const username = useSelector(state => state.user.user.user.name);

    // init state
    const [loading, setLoading] = useState(false);
    const [selected,setSelected] = useState([{ label: 'Battle', value: 'battle'}]);

    const options = [
        {
            label: 'Battle',
            value: 'battle'
        },
        {
            label: 'Cypher',
            value: 'cypher'
        },
    ]

    const customContentRenderer = ({ props, state }) =>
        loading ? (
            <div>Loading...</div>
        ) : (
            <div>
                <label className={`form__select-label`}>Mode</label>
                <span className="form__select-selected">{selected[0].label}</span>
            </div>
        );

    return (
        <div className={`translate-this screen-settings modal-inner`} style={ moveModal.screen ==='settings' ? { transform:'translateX(0%) translateZ(1px)', position: 'absolute'} : { transform:'translateX(200%) translateZ(1px)', visibility: 'hidden'} }>
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
                        <div className="modal-inner__title">Settings</div>
                        <button className={`modal-inner__button modal-inner__button--right`} onClick={handleClose}>
                            <lord-icon
                                animation="loop"
                                target="button"
                                palette="#8c8895;#8c8895"
                                src={`../../assets/icons/38-error-cross-simple-outline/38-error-cross-simple-outline.json`}>
                            </lord-icon>
                        </button>
                <small style={{
                    textTransform: 'lowercase',
                    marginBottom: '20px',
                    fontSize: '16px'
                }}>#{username}vs{values.opponent.name && values.opponent.name ? values.opponent.name.toLowerCase().replace(/ /g, '') : null}</small>
                <Select
                    contentRenderer={customContentRenderer}
                    options={options}
                    onChange={(e) => {setSelected(e)}}
                    className={`form__select-selectbox`}
                    itemRenderer={({ item, methods }) => (
                        <>
                            {item.disabled ? (
                                <div aria-disabled>{item.label}</div>
                            ) : (
                                <div onClick={() => methods.addItem(item)} className={`react-dropdown-select-item`}>
                                    {item.label === 'Cypher' ? (
                                        <lord-icon
                                            animation="loop"
                                            target="div"
                                            palette="#FECB47"
                                            src={`../../assets/icons/314-three-avatars-icon-calm/314-three-avatars-icon-calm-solid.json`}>
                                        </lord-icon>
                                    ) : (
                                        <lord-icon
                                            animation="loop"
                                            target="div"
                                            palette="#e5251f"
                                            src={`../../assets/icons/134-target/134-target-solid.json`}>
                                        </lord-icon>
                                    )}
                                    {item.label}
                                </div>
                            )}
                        </>
                    )}
                />
                <button className={`modal-inner__footer-button`} onClick={e => {
                    e.preventDefault();
                    translateModal(e, 'default')
                    setMoveModal({
                        screen: 'default'
                    })
                }}>Save</button>
        </div>
    )
}

export default SpitboxSettings;