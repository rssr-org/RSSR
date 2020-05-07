import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import axios from "axios";
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {regexp} from "../../setup/constant";
import {browserHistory} from "../../setup/browserHistory";
import {badConnectionAlert} from "../../setup/utility/badConnectionAlert";




function ResetPassword(props) {

    const [viewMod, setViewMod] = useState('LOADING') // LOADING || FORM || ERROR
    const [newpassword, setNewpassword] = useState('')
    const [repassword, setRepassword] = useState('')



    useEffect(() => {
        axios({
            url: api.resetPassword.trust,
            method: 'POST',
            data: {
                token: props.match.params.token
            }
        })
            .then(() => {
                setViewMod('FORM');
            })
            .catch((e) => {
                if (e.status === 404)
                    setViewMod('ERROR');
                else
                    badConnectionAlert('reset Password trust');
            });
    }, [props.match.params.token]);





    function submitForm(e) {
        //-------------------------------------------//
        e.preventDefault()
        e.stopPropagation()
        const form = e.target
        if (form.checkValidity() === false) {
            form.classList.add('was-validated')
            return false;
        }
        form.className.replace(" was-validated", "")
        //-------------------------------------------//

        axios({
            url: api.resetPassword.submit,
            method: 'POST',
            data: {
                password: newpassword,
                token: props.match.params.token
            }
        })
            .then(() => {
                toast.success('Password successfully changed!');
                browserHistory.replace(route.home);
            })
            .catch(() => {
                badConnectionAlert('reset Password submit');
            })
    }





    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 offset-md-7 pt-5">
                    <h3 className="mb-5">Change password</h3>
                    {
                        (viewMod === 'FORM') ?
                            (
                                <form onSubmit={submitForm} noValidate={true}>
                                    <div className="form-group">
                                        <label>New password</label>
                                        <input name="newPassword"
                                               className="form-control"
                                               type='password'
                                               pattern={regexp.password}
                                               value={newpassword}
                                               onChange={(e) => setNewpassword(e.target.value)}
                                               required/>
                                    </div>

                                    <div className="form-group">
                                        <label>Confirm password</label>
                                        <input name="renewPassword"
                                               className="form-control"
                                               type='password'
                                               pattern={`^${newpassword}$`}
                                               value={repassword}
                                               onChange={(e) => setRepassword(e.target.value)}
                                               required/>
                                    </div>

                                    <button className="btn btn-primary mt-4" type="submit">Submit</button>
                                </form>
                            )
                            :
                            (
                                viewMod === 'LOADING' ?
                                    <strong>User Validation, please wait...</strong>
                                    :
                                    <strong>User Token is not valid!</strong>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
