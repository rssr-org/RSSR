import React from 'react';
import SignIn from "../../Component/Auth/SignIn/SignIn";
import SignUp from "../../Component/Auth/SignUp";
import ValidUser from "../../Component/Auth/ValidUser";
import InvalidUser from "../../Component/Auth/InvalidUser";
import {Link} from "react-router-dom";
import {route} from "../../setup/route";
import {signingOut} from "../../Component/Auth/__action/signingOut";

const Sign = props => {
    const isSignIn = props.match.params.type === 'in';


    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4 offset-lg-4 py-5">
                    <InvalidUser>
                        <h1 className="text-center pb-5">
                            {
                                isSignIn ? 'Login' : 'Register'
                            }
                        </h1>
                        {
                            isSignIn ? <SignIn/> : <SignUp/>
                        }
                    </InvalidUser>

                    <ValidUser>
                        {
                            (detail) => (
                                <div className="text-center">
                                    <h1> Hi {detail.firstName}</h1>
                                    see
                                    <br/>
                                    <Link to={route.home}>Home page</Link>
                                    <br/>
                                    or
                                    <br/>
                                    <a href="#" onClick={signingOut}>log out</a>
                                </div>
                            )
                        }
                    </ValidUser>
                </div>
            </div>
        </div>
    )
}

export default Sign;
