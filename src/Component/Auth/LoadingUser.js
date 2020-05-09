import {connect} from "trim-redux";

const LoadingUser = props => !props.user.updated ? props.children : '';

export default connect(s => ({user: s.user}))(LoadingUser);