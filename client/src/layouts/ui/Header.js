import React, {Fragment, useEffect, useState} from 'react';

const Header = ({ title, description }) => {

    // Load
    const init = () => {

    };

    useEffect(() => {
        init();
    }, []);

    return(
        <header>
            <div className="container">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </header>
    )
};

export default Header;