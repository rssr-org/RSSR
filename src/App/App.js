import React, {Fragment, useEffect} from 'react';
import {Helmet} from "react-helmet";
import {ToastContainer} from 'react-toastify';
import Router from "../Partial/Router/Router";
import Menu from "../Component/Menu/Menu";
import {skeletonClientProvider} from "../setup/utility/skeletonClientProvider";
import {firstSetup} from "../Component/Auth/__action/firstSetup";
import SignInModal from "../Component/Auth/SignInModal";
import SignUpModal from "../Component/Auth/SignUpModal";
import axios from "axios";
import {api} from "../setup/api";
import OverLoading from "../Component/OverLoading/OverLoading";


function App() {
    useEffect(() => {
        // user Authentication, get cart, set theme and more.
        firstSetup();

        // refetch skeleton on client when server fetch skeleton error
        skeletonClientProvider()
    }, []);

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
    );
};

App.skeleton = function () {
    return axios({url: api.skeleton})
}
App.skeleton.cache = 6; //reset cache in each 6 hour

export default App;
