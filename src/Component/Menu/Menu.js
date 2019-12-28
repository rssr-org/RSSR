import React from 'react';
import {Link} from "react-router-dom";
import {route} from "../../setup/route";
import {signingOut} from "../Auth/__action/signingOut";
import ValidUser from "../Auth/ValidUser";
import InvalidUser from "../Auth/InvalidUser";
import LoadingUser from "../Auth/LoadingUser";


function Menu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to={route.home} className="navbar-brand">RSSR</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={route.home} className="nav-link">خانه</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/404" className="nav-link">راهنما</Link>
                        </li>

                        <ValidUser>
                            {
                                (detail) => (
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => window.confirm('می‌خواهید خارج شوید؟') ? signingOut() : ''}>
                                            سلام {detail.firstName}
                                        </a>
                                    </li>
                                )
                            }
                        </ValidUser>

                        <InvalidUser>
                            <li className="nav-item">
                                <a className="nav-link" data-notify="signin-modal">ورود</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-notify="signup-modal">ثبت نام</a>
                            </li>
                        </InvalidUser>

                        <LoadingUser>
                            <li className="nav-item">
                                <div className="nav-link">در حال اعتبار سنجی ...</div>
                            </li>
                        </LoadingUser>
                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default Menu;