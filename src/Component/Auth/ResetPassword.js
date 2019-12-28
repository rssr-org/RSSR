import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import axios from "axios";
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {regexp} from "../../setup/constant";
import {browserHistory} from "../../setup/browserHistory";
import Form from "../../Partial/Form/Form";




function ResetPassword(props) {

    const
        [viewMod, setViewMod] = useState('loading'), // loading || form || error
        [newpassword, setNewpassword] = useState(''),
        [repassword, setRepassword] = useState('');





    useEffect(() => {
        axios({
            url: api.resetPassword.trust,
            method: 'POST',
            data: {
                token: props.match.params.token
            }
        })
            .then(() => {
                setViewMod('form');
            })
            .catch((e) => {
                if (e.status === 404)
                    setViewMod('error');
                else
                    toast.error('خطا: ارتباط خود را چک کنید و مجددا امتحان نمایید.');
            });
    }, [props.match.params.token]);





    function submitForm() {
        axios({
            url: api.resetPassword.submit,
            method: 'POST',
            data: {
                password: newpassword,
                token: props.match.params.token
            }
        })
            .then(() => {
                toast.success('پسورد با موفقیت تغییر کرد.');
                browserHistory.replace(route.home);
            })
            .catch(() => {
                toast.error('خطا: ارتباط خود را چک کنید و مجددا امتحان نمایید.');
            });
    }





    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-7 pt-5">
                    <h3 className="mb-5">تغییر رمز عبور</h3>
                    {
                        (viewMod === 'form') ?
                            (
                                <Form onSubmit={submitForm}>
                                    <div className="form-group">
                                        <label>رمز عبور جدید</label>
                                        <input name="newPassword"
                                               className="form-control"
                                               type='password'
                                               pattern={regexp.password}
                                               value={newpassword}
                                               onChange={(e) => setNewpassword(e.target.value)}
                                               required/>
                                        <div className="invalid-feedback">رمز عبور باید حداقل 8 کاراکتر باشد.</div>
                                    </div>

                                    <div className="form-group">
                                        <label>تکرار رمز عبور جدید</label>
                                        <input name="renewPassword"
                                               className="form-control"
                                               type='password'
                                               pattern={`^${newpassword}$`}
                                               value={repassword}
                                               onChange={(e) => setRepassword(e.target.value)}
                                               required/>
                                        <div className="invalid-feedback">تکرار رمز عبور باید مشابه رمز عبور باشد.</div>
                                    </div>

                                    <button className="btn btn-primary mt-4" type="submit">ثبت</button>
                                </Form>
                            )
                            :
                            (
                                viewMod === 'loading' ?
                                    <strong className="animated flash">اعتبار سنجی. لطفا صبر کنید...</strong>
                                    :
                                    <strong>توکن معتبر نیست!</strong>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
