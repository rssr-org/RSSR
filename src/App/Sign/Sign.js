import React from 'react';
import SignIn from "../../Component/Auth/SignIn/SignIn";
import SignUp from "../../Component/Auth/SignUp";

const Sign = props => {
    const isSignIn = props.match.params.type === 'in';

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-8 offset-lg-8 py-5">
                    {
                        isSignIn ? <SignIn/> : <SignUp/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Sign;
