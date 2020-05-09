import {connect} from "trim-redux";
import Cookies   from "js-cookie";

const InvalidUser = props => {
    const token = Cookies.get('token')
    return !token && props.user.updated ? props.children : '';
}

export default connect(s => ({user: s.user}))(InvalidUser);