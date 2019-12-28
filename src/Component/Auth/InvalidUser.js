import {connect} from "trim-redux";

// updated with null token
const InvalidUser = props => (props.localUser.token === null && props.localUser.updated) ? props.children : '';

export default connect(s => ({localUser: s.localUser}))(InvalidUser);