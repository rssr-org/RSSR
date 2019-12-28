import {connect} from "trim-redux";

const LoadingUser = props => !props.localUser.updated ? props.children : '';

export default connect(s => ({localUser: s.localUser}))(LoadingUser);