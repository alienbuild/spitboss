import React, {useEffect} from "react";
import { useSelector } from 'react-redux';

import SpitbossLogo from "../../assets/images/spitboss.svg";

const PreLoader = () => {

    // Grab user token from redux store
    const loading = useSelector(state => state.spitbox.loading);

    useEffect(() => {
        const preLoader = document.getElementById('preloader');
        if (!loading) {
            setTimeout(() => {
                preLoader.classList.add('loaded');
                setTimeout(() => {
                    preLoader.classList.add('ninja');
                }, 1600);
            }, 1000);
        } else {
            preLoader.classList.remove('loaded');
        }
    },[loading]);

    return (
        <div id={`preloader`}>
            <img src={SpitbossLogo} />
        </div>
    )
}

export default PreLoader;