import React from 'react';
import Notify from "../../Partial/Notify/Notify";
import SignUp from "./SignUp";

function SignUpModal() {
    return (
        <Notify id="signup-modal" className="auth-modal" title="ثبت نام">
            {
                // we pass SignUp component as a function because dont need run this component when modal is not open!
                (notifySelf) => <SignUp notify={notifySelf}/>
            }
        </Notify>
    );
}

export default SignUpModal;
