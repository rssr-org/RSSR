import React, {useState} from 'react';
import {connect} from "trim-redux";
import {Link, withRouter} from "react-router-dom";
import {toast} from "react-toastify";
import {regexp} from "../../setup/constant";
import axios from "axios";
import {api} from "../../setup/api";
import {signingIn} from "./__action/signingIn";
import Loading from "rssr-loading";
import {route} from "../../setup/route";



function SignUp(props) {

    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {localUser} = props





    function submitSignUp() {
        setIsLoading(true);

        axios({
            url: api.signup,
            method: 'POST',
            data: {
                email: username,
                password: password
            }
        })
            .then((response) => {
                // set token to localStorage if remember me checked and get user details
                signingIn(response.data.token, true)
                    .then(function () {
                        toast.success('signed-up successfully!', {autoClose: 1200});
                    })
                    .catch(function () {
                        toast.success('signed-up successfully but occur an error in fetch user details, try again or tell to support!', {autoClose: false});
                    });
            })
            .catch(() => {
                toast.error('Server Error,try again or tell to support!');
            })
            .then(() => {
                setIsLoading(false);
            })
    }





    return (
        <form onSubmit={submitSignUp} className="signup-form">
            <div className="form-group">
                <label>E-mail</label>
                <input type="text"
                       className="form-control ltr-value"
                       aria-describedby="emailHelp"
                       name="username"
                       pattern={regexp.email}
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       required/>
            </div>

            <div className="form-group mb-4">
                <label>Password <sup>More than 6 characters</sup></label>
                <input type="password"
                       name="password"
                       className="form-control ltr-value"
                       pattern={regexp.password}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
                <div className="invalid-feedback">password is not valid!</div>
            </div>

            <Loading isLoading={isLoading || !localUser.updated}>
                <button className="btn btn-block btn-success mb-3" disabled={isLoading || !localUser.updated} type="submit">
                    Sign up
                </button>
            </Loading>

            <Link to={route.signIn}>Sign in</Link>
        </form>
    );
}


export default withRouter(connect(s => ({localUser: s.localUser}))(SignUp));
