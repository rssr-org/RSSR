import {connect} from "trim-redux";
import {isValidUser} from "../../setup/utility/isValidUser";
import {dataType} from "../../setup/utility/dataType";

// updated with not null token
const ValidUser = props => {
    const result = () => {
        if (dataType(props.children) === "function")
            return props.children(props.localUser.detail)
        else
            return props.children;
    };

    return isValidUser() ? result() : ''
};

export default connect(s => ({localUser: s.localUser}))(ValidUser);
