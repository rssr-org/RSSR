import React from 'react';
import {formValidation} from "../../setup/utility/formValidation";
import PropTypes from "prop-types";

const Form = (theProps) => {
    const props = {...theProps};
    delete props.onSubmit;


    function submitAction() {
        if (!formValidation(arguments[0]))
            return false;

        theProps.onSubmit(...arguments);
    }


    return (
        <form onSubmit={submitAction} {...props} noValidate>
            {props.children}
        </form>
    );
};

Form.propTypes = {
    className: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
}

export default Form;