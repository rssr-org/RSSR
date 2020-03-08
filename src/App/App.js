import React, {Fragment, useEffect} from 'react';
import axios from "axios";
import {Helmet} from "react-helmet-async";
import {ToastContainer} from 'react-toastify';
import Router from "../Partial/Router/Router";
import Menu from "../Component/Menu/Menu";
import {firstSetup} from "../Component/Auth/__action/firstSetup";
import OverLoading from "../Component/OverLoading/OverLoading";
import {api} from "../setup/api";
import {skeleton} from "../Partial/skeleton/skeleton";


function App() {
    useEffect(() => {
        // user Authentication, get cart, set theme and more.
        firstSetup();
    }, [])

    return (
        <Fragment>
            <Helmet defaultTitle="React Server Side Rendering"/>
            <OverLoading/>
            <Menu/>
            <Router/>
            <ToastContainer rtl={true}/>
        </Fragment>
    )
}

const skeletonFetch = function () {
    return axios({url: api.skeleton})
}

export default skeleton(App, skeletonFetch, 8000);
