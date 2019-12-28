import React, {useEffect} from 'react';
import "./overLoading.scss"
import {toggleOverLoading} from "./__action/toggleOverLoading";

const OverLoading = () => {
    useEffect(() => {
        toggleOverLoading(false)
    }, []);

    // if (IS_DEVELOPMENT)
    //     return ''

    return <div id="over-loading-wrap"></div>;
};

export default OverLoading;
