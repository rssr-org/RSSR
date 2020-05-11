import {connect}     from "trim-redux";
import {isValidUser} from "../../setup/utility/isValidUser";

const InvalidUser = props => {
    return !isValidUser() ? props.children : '';
}

export default connect(s => ({user: s.user}))(InvalidUser);