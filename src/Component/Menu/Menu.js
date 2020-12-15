import React from 'react';
import {Link} from "react-router-dom";
import {route} from "../../setup/route";
import {signingOut} from "../Auth/__action/signingOut";
import ValidUser from "../Auth/ValidUser";
import InvalidUser from "../Auth/InvalidUser";
import LoadingUser from "../Auth/LoadingUser";
import Namespace from "rssr-namespace";
import "./menu.scss"
import {connect} from "trim-redux";


function Menu({skeleton}) {

    return (
        <Namespace namespace="menu">
            <nav className="navbar navbar-expand-lg navbar-light" style={{"backgroundColor": "#eeeeee"}}>
                <div className="container">
                    <Link to={route.home} className="navbar-brand">
                        <img src="/asset/img/rssr-logo.png" alt="RSSR"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={route.home} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/invalid-route" className="nav-link">Erorr 404</Link>
                            </li>
                            <ValidUser>
                                {
                                    (detail) => (
                                        <li className="nav-item">
                                            <button className="btn btn-link nav-link" onClick={() => window.confirm('Are you want sign out?') ? signingOut() : ''}>
                                                Hi {detail.firstName}
                                            </button>
                                        </li>
                                    )
                                }
                            </ValidUser>
                            <InvalidUser>
                                <li className="nav-item">
                                    <Link to={route.signIn} className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={route.signUp} className="nav-link">Register</Link>
                                </li>
                            </InvalidUser>
                            <LoadingUser>
                                <li className="nav-item">
                                    <span className="nav-link">Check Authentication ...</span>
                                </li>
                            </LoadingUser>
                        </ul>
                    </div>
                    <span className="navbar-text" title="daily message">
                        {skeleton.dailyMessage}
                    </span>
                </div>
            </nav>
        </Namespace>
    )
}

export default connect(state => ({skeleton: state.skeleton}))(Menu);