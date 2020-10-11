import React, {useEffect, useState} from "react";
import {getAllUsers} from "../../../user/apiUser";
import {useSelector} from "react-redux";

const SelectOpponent = ({ values, setValues, moveModal, setMoveModal, translateModal, handleClose }) => {

    // Grab user token/auth
    const token = useSelector(state => state.user.user.token);

    // init state
    const [opponents, setOpponents] = useState([]);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        init()
    },[]);

    const init = () => {
        // Get Spitbox Opponents
        // TODO: Replace all users with only users who are rappers/signed up to battle or cypher.
        getAllUsers(token)
            .then(users => {
                if(users.error){
                    setError(true);
                } else {
                    setOpponents(users);
                }
            })
            .catch(e => console.log('Error getting opponents: ', e));
    }

    // Handle Search Input
    const handleSearchInput = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const filteredUsers = opponents.filter(opponent => {
        if (opponent.name){
            return opponent.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        }
    })

    const filterUsers = () => {
        if (opponents && filteredUsers < 1){
            return <small style={{
                color: '#8c8895',
                textAlign: 'center'
            }}>No users found matching <strong><i>'{search}'</i></strong>.</small>
        } else {
            return opponents && filteredUsers.map((opponent, index) => {
                 return <li key={index} className={`select-members__item`}>
                    <button className={`select-members__button`} onClick={() => {
                        const { name, _id } = opponent;
                        setValues({
                            ...values,
                            opponent: {
                                _id,
                                name
                            }
                        })
                    }}>
                                        <span className="select-members__avatar">
                                            <img src="https://fakeimg.pl/36x36/333/fff" className={`select-members__image`}/>
                                        </span>
                                <span className="select-members__name">{opponent.name}</span>
                                <label className={`form__radio-label float-right`}>
                                    <input type="radio" name="test" value="small" className={`form__radio-input`}/>
                                    <span className="select-members__checkbox form__custom-radio">
                                            <lord-icon
                                                animation="custom"
                                                target="button"
                                                palette="#8c8895;#fecb47"
                                                src={`../../assets/icons/388-check-box-3-morph/388-check-box-3-morph.json`}>
                                            </lord-icon>
                                        </span>
                                </label>
                    </button>
                </li>
            })
        }
    }

    return(
        <div className={`translate-this screen-select-opponent modal-inner`} style={ moveModal.screen ==='select-opponent' ? { transform:'translateX(0%) translateZ(1px)', position: 'absolute'} : { transform:'translateX(200%) translateZ(1px)', visibility: 'hidden' } }>
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
                        <div className="modal-inner__title">Select opponent</div>
                        <button className={`modal-inner__button modal-inner__button--right`} onClick={handleClose}>
                            <lord-icon
                                animation="loop"
                                target="button"
                                palette="#8c8895;#8c8895"
                                src={`../../assets/icons/38-error-cross-simple-outline/38-error-cross-simple-outline.json`}>
                            </lord-icon>
                        </button>
                <div className="modal-inner__search">
                    <span className="modal-inner__search-icon">
                    <lord-icon
                        animation="hover"
                        target="div"
                        palette="#8c8895;#8c8895"
                        src={`../../assets/icons/19-magnifier-zoom-search/19-magnifier-zoom-search-outline.json`}>
                    </lord-icon>
                </span>
                    <input type="text"
                           placeholder={`Search`}
                           className={`modal-inner__input`}
                           value={search}
                           onChange={e => handleSearchInput(e)}/>
                </div>
                <ul className={`select-members__list`}>
                    {filterUsers()}
                </ul>
                <button className={`modal-inner__footer-button`} onClick={e => {
                    e.preventDefault();
                    translateModal(e, 'default')
                    setMoveModal({
                        screen: 'default'
                    })
                }}>Select</button>
        </div>
    )
}

export default SelectOpponent;