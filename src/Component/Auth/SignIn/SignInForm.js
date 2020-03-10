import React, {useState} from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import {api} from "../../../setup/api";
import {signingIn} from "../__action/signingIn";
import {regexp} from "../../../setup/constant";
import {connect} from "trim-redux";
import Form from "rssr-form";
import Loading from "rssr-loading";
import {Link} from "react-router-dom";
import {route} from "../../../setup/route";
import {badConnectionAlert} from "../../../setup/utility/badConnectionAlert";

function SignInForm(props) {

    const [isLoading, setIsLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [rememberMe, setRememberMe] = useState(true)
    const [password, setPassword] = useState('')
    const {localUser, showForgetPasswordForm} = props





    function submitSignIn() {
        setIsLoading(true);

        axios({
            url: api.signin,
            method: 'POST',
            data: {email: userName, password: password}
        })
            .then((response) => {
                // set token to localStorage if remember me checked and get user details
                signingIn(response.data.token, rememberMe)
                    .then(function () {
                        toast.success('logged-in successfully!', {autoClose: 1200});
                    })
                    .catch(function () {
                        toast.success('logged-in successfully but occur an error in fetch user details, try again or tell to support!', {autoClose: false});
                    });
            })
            .catch(() => {
                badConnectionAlert('Sing in');
            })
            .then(() => {
                setIsLoading(false);
            })
    }





    return (
        <Form onSubmit={submitSignIn} className="signin-form">
            <div className="form-group">
                <label>E-mail</label>
                <input type="text"
                       className="form-control ltr-value"
                       name="username"
                       pattern={regexp.email}
                       value={userName}
                       onChange={(e) => setUserName(e.target.value)}
                       required/>
                <div className="invalid-feedback">E-mail is not valid. please enter your account email like: sample@gmail.com</div>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password"
                       name="password"
                       className="form-control"
                       value={password}
                       pattern={regexp.password}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
                <div className="invalid-feedback">password is not valid!</div>
            </div>

            <div className="d-flex justify-content-between mb-3">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox"
                           name="rememberme"
                           className="custom-control-input"
                           id="rememberme-input"
                           checked={rememberMe}
                           onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor="rememberme-input">Remember me</label>
                </div>

                <button className="btn btn-link p-0" onClick={showForgetPasswordForm}>
                    <span>Forget password</span>
                    <i className="icon-angle-right"></i>
                </button>
            </div>

            <Loading isLoading={isLoading || !localUser.updated}>
                <button className="btn btn-block btn-primary mb-3" disabled={isLoading || !localUser.updated} type="submit">
                    Sign in
                </button>
            </Loading>

            <Link to={route.signUp}>Sign up</Link>
        </Form>
    );
}

export default connect(s => ({localUser: s.localUser}))(SignInForm);