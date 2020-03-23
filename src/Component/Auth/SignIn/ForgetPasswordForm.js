import React, {useState} from 'react';
import {connect} from "trim-redux";
import {regexp} from "../../../setup/constant";
import axios from "axios";
import {api} from "../../../setup/api";
import {route} from "../../../setup/route";
import {toast} from "react-toastify";
import {badConnectionAlert} from "../../../setup/utility/badConnectionAlert";


function ForgetPasswordForm(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const {localUser, showSignInForm} = props


    function submitForgetPassword() {
        setIsLoading(true);

        axios({
            url: api.forgetPassword,
            // method: 'POST',
            data: {
                "email": email,
                // server must add token number to end of url and redirect to it
                "callback": window.location.origin + route.resetPassword('')
            }
        })
            .then(() => {
                const message = (
                    <div>
                        Recovery email sent.
                        <br/>
                        Please check your email inbox or spam and click on link.
                        <br/>
                        {email}
                        <br/>
                        Apply again if you did not receive it.
                    </div>
                );
                toast.success(message, {autoClose: false});
            })
            .catch((err) => {
                setIsLoading(false);

                if (err.status === 400)
                    toast.error('E-mail is not valid');
                else
                    badConnectionAlert('Submit forget password');
            });
    }





    return (
        <form onSubmit={submitForgetPassword} className="forget-password-form">
            <div className="d-flex justify-content-between pb-5">
                <h5>Password recovery</h5>
                <a href="#" className="signin-toggle" onClick={showSignInForm}>Back</a>
            </div>
            <div className="form-group">
                <label>Account Email</label>
                <input type="text"
                       className="form-control ltr-value"
                       name="forgetpassword"
                       pattern={regexp.email}
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required/>
                <div className="invalid-feedback">E-mail is not valid. please enter your email account like: sample@gmail.com</div>
            </div>
            <button className="btn btn-block btn-primary" disabled={isLoading || !localUser.updated} type="submit">
                Recovery
            </button>
        </form>
    )
}

export default connect(s => ({localUser: s.localUser}))(ForgetPasswordForm);
