import {connect} from "trim-redux";

// updated with null token
const InvalidUser = props => (props.user.token === null && props.user.updated) ? props.children : '';

export default connect(s => ({user: s.user}))(InvalidUser);