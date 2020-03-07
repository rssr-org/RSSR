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
                        toast.success('با موفقیت وارد حساب شدید.');
                    })
                    .catch(function () {
                        toast.success('ورود موفقیت آمیز بود ولی دریافت مشخصات به خطا خورد. مجددا برای ورود تلاش نمایید!');
                    });
            })
            .catch(() => {
                setIsLoading(false);
                toast.error('نام کاربری یا رمز عبور اشتباه است!');
            });
    }


    return (
        <Form onSubmit={submitSignIn} className="signin-form">
            <div className="form-group">
                <label>ایمیل</label>
                <input type="text"
                       className="form-control ltr-value"
                       name="username"
                       pattern={regexp.email}
                       value={userName}
                       onChange={(e) => setUserName(e.target.value)}
                       required/>
                <div className="invalid-feedback">ایمیل معتبری درج نشده است!</div>
            </div>

            <div className="form-group">
                <label>رمز عبور</label>
                <input type="password"
                       name="password"
                       className="form-control"
                       value={password}
                       pattern={regexp.password}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
                <div className="invalid-feedback">رمز عبور معتبر نیست! باید بیش از 8 کاراکتر باشد.</div>
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
                    <label className="custom-control-label" htmlFor="rememberme-input">مرا به خاطر بسپار</label>
                </div>

                <a onClick={showForgetPasswordForm}>
                    <span>فراموشی رمز عبور</span>
                    <i className="icon-angle-right"></i>
                </a>
            </div>

            <Loading isLoading={isLoading || !localUser.updated}>
                <button className="btn btn-block btn-primary mb-3" disabled={isLoading || !localUser.updated} type="submit">
                    ورود به حساب
                </button>
            </Loading>

            <Link to={route.signUp}>ایجاد حساب کاربری جدید</Link>
        </Form>
    );
}

export default connect(s => ({localUser: s.localUser}))(SignInForm);