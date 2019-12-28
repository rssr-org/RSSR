import React, {useState} from 'react';
import {toast} from "react-toastify";
import axios from "axios";
import {api} from "../../../setup/api";
import {signingIn} from "../__action/signingIn";
import {LOADING_CLASS, regexp} from "../../../setup/constant";
import {random} from "../../../setup/utility/random";
import {connect} from "trim-redux";
import Form from "../../../Partial/Form/Form";

function SignInForm(props) {

    const
        [isLoading, setIsLoading] = useState(false),
        [userName, setUserName] = useState(''),
        [rememberMe, setRememberMe] = useState(true),
        [password, setPassword] = useState(''),
        {localUser, showForgetPasswordForm} = props,
        readmeId = "remmber-me-" + random(1000); // fix confilict in Parallel usage



    function submitSignIn() {
        setIsLoading(true);

        axios({
            url: api.signin,
            method: 'POST',
            data: {email: userName, password: password}
        })
            .then((response) => {
                // close the modal when launched from  modal
                props.closeModal();

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

            <div className="d-flex justify-content-between">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox"
                           name="rememberme"
                           className="custom-control-input"
                           id={readmeId}
                           checked={rememberMe}
                           onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="custom-control-label" htmlFor={readmeId}>مرا به خاطر بسپار</label>
                </div>

                <a onClick={showForgetPasswordForm}>
                    <span>فراموشی رمز عبور</span>
                    <i className="icon-angle-right"></i>
                </a>
            </div>

            <button className={`btn btn-block btn-primary mt-3  ${(isLoading || !localUser.updated) ? LOADING_CLASS : ''} `}
                    disabled={isLoading || !localUser.updated}
                    type="submit">
                ورود
            </button>
        </Form>
    );
}

export default connect(s => ({localUser: s.localUser}))(SignInForm);