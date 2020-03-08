import React, {useState} from 'react';
import {connect} from "trim-redux";
import {Link, withRouter} from "react-router-dom";
import {toast} from "react-toastify";
import {regexp} from "../../setup/constant";
import axios from "axios";
import {api} from "../../setup/api";
import {signingIn} from "./__action/signingIn";
import Form from "rssr-form";
import Loading from "rssr-loading";
import {route} from "../../setup/route";



function SignUp(props) {

    const
        [isLoading, setIsLoading] = useState(false),
        [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        {localUser} = props;





    function closeModal() {
        if (props.notify !== undefined)
            props.notify.$modal.modal('hide');
    }





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
                // close modal when launched from modal (Notify modal)
                closeModal();

                // set token to localStorage if remember me checked and get user details
                signingIn(response.data.token, true)
                    .then(function () {
                        toast.success('ثبت نام با موفقیت انجام شد و وارد حساب شدید.');
                    })
                    .catch(function () {
                        toast.success('ثبت نام موفقیت آمیز بود ولی دریافت مشخصات به خطا خورد. با مشخصاتی که ثبت نام کردید برای ورود به حساب تلاش نمایید!');
                    });
            })
            .catch(() => {
                setIsLoading(false);
                toast.error('خطا. مجددا تلاش نمایید و در صورت تکرار با پشتیبانی تماس بگیرید.');
            });
    }





    return (
        <Form onSubmit={submitSignUp} className="signup-form">
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
                <div className="invalid-feedback">E-mail is not valid. please enter your account email like: sample@gmail.com</div>
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
        </Form>
    );
}


export default withRouter(connect(s => ({localUser: s.localUser}))(SignUp));
