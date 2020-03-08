import React from 'react';
import SignIn from "../../Component/Auth/SignIn/SignIn";
import SignUp from "../../Component/Auth/SignUp";

const Sign = props => {
    const isSignIn = props.match.params.type === 'in';

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4 offset-lg-4 py-5">
                    <h1 className="text-center">
                        {
                            isSignIn ? 'Login' : 'Register'
                        }
                    </h1>
                    {
                        isSignIn ? <SignIn/> : <SignUp/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Sign;
