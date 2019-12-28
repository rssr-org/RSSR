import React, {useState} from 'react';
import {connect} from "trim-redux";
import {withRouter} from "react-router-dom";
import {toast} from "react-toastify";
import {regexp} from "../../setup/constant";
import axios from "axios";
import {api} from "../../setup/api";
import {isSet} from "../../setup/utility/checkSet";
import {signingIn} from "./__action/signingIn";
import Form from "../../Partial/Form/Form";



function SignUp(props) {

    const
        [isLoading, setIsLoading] = useState(false),
        [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        {localUser} = props;





    function closeModal() {
        if (isSet(props.notify))
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
                <label>ایمیل</label>
                <input type="text"
                       className="form-control ltr-value"
                       aria-describedby="emailHelp"
                       name="username"
                       pattern={regexp.email}
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       required/>
                <div className="invalid-feedback">ایمیل معتبری درج نشده است!</div>
            </div>

            <div className="form-group">
                <label>رمز عبور (حداقل ۸ کاراکتر)</label>
                <input type="password"
                       name="password"
                       className="form-control ltr-value"
                       pattern={regexp.password}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required/>
                <div className="invalid-feedback">رمز عبور باید بیش از ۸ کاراکتر باشد.</div>
            </div>

            <button type="submit"
                    className={`btn btn-block mt-7 ${(isLoading) ? 'loading-effect' : 'btn-primary'} `}
                    disabled={isLoading || !localUser.updated}>
                ثبت نام
            </button>
        </Form>
    );
}


export default withRouter(connect(s => ({localUser: s.localUser}))(SignUp));
