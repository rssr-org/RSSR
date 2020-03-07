import React, {useState} from 'react';
import ForgetPasswordForm from "./ForgetPasswordForm";
import SignInForm from "./SignInForm";

const SignIn = () => {
    const [showSignInForm, setShowSignInForm] = useState(true);

    return (
        showSignInForm ?
            <SignInForm showForgetPasswordForm={() => setShowSignInForm(false)}/>
            :
            <ForgetPasswordForm showSignInForm={() => setShowSignInForm(true)}/>
    )
};

export default SignIn;
