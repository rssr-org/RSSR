import React, {Fragment, useEffect} from 'react';
import axios from "axios";
import {Helmet} from "react-helmet-async";
import {ToastContainer} from 'react-toastify';
import Router from "../Partial/Router/Router";
import Menu from "../Component/Menu/Menu";
import {firstSetup} from "../Component/Auth/__action/firstSetup";
import SignInModal from "../Component/Auth/SignInModal";
import SignUpModal from "../Component/Auth/SignUpModal";
import OverLoading from "../Component/OverLoading/OverLoading";
import {api} from "../setup/api";
import {skeleton} from "../Partial/skeleton/skeleton";
import {IS_BROWSER} from "../setup/constant";


function App() {
    useEffect(() => {
        // user Authentication, get cart, set theme and more.
        firstSetup();
    }, [])

    return (
        <Fragment>
            <OverLoading/>
            <Menu/>
            <Router/>
            <Helmet defaultTitle="React Server Side Rendering"/>
            <SignInModal/>
            <SignUpModal/>
            <ToastContainer rtl={true}/>
        </Fragment>
    )
}

const skeletonFetch = function () {
    return axios({url: IS_BROWSER ? api.skeleton : '*'})
}

export default skeleton(App, skeletonFetch, 2000);
