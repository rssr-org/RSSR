import {connect} from "trim-redux";

const UpdatedUser = props => props.user.updated ? props.children : '';

export default connect(s => ({user: s.user}))(UpdatedUser);