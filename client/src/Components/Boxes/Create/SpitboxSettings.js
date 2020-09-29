import React from "react";

const SpitboxSettings = ({ moveModal, translateModal, setMoveModal}) => {
    return (
        <div className={`translate-this screen-settings`} style={ moveModal.screen ==='settings' ? { transform:'translateX(0%) translateZ(1px)', position: 'absolute'} : { transform:'translateX(200%) translateZ(1px)', visibility: 'hidden'} }>
            <header className="screen-heading">
                <button onClick={e => {
                    e.preventDefault();
                    translateModal(e, 'default')
                    setMoveModal({
                        screen: 'default'
                    })
                }}>Go Back</button>
            </header>Yo.
        </div>
    )
}

export default SpitboxSettings;