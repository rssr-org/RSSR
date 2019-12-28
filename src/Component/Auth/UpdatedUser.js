import {connect} from "trim-redux";

const UpdatedUser = props => props.localUser.updated ? props.children : '';

export default connect(s => ({localUser: s.localUser}))(UpdatedUser);