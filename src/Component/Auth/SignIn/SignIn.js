import React, {useState} from 'react';
import ForgetPasswordForm from "./ForgetPasswordForm";
import SignInForm from "./SignInForm";

const SignIn = props => {
    const [showSignInForm, setShowSignInForm] = useState(true);

    function closeModal() {
        if (props.notify !== undefined)
            props.notify.$modal.modal('hide');
    }

    return (
        showSignInForm ?
            <SignInForm showForgetPasswordForm={() => setShowSignInForm(false)} closeModal={closeModal}/>
            :
            <ForgetPasswordForm showSignInForm={() => setShowSignInForm(true)} closeModal={closeModal}/>
    )
};

export default SignIn;
