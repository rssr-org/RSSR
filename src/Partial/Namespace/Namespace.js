import PropTypes from 'prop-types';
import config from "../../../namespace";

let list = {};

function rebuildList() {
    list = {}

    config.namespace.forEach(function (item, index) {
        list[item] = config.prefix + item[0] + index
    })
}

const Namespace = ({namespace, children}) => {
    const copy = {
        children: {...children},
        childrenProps: {...children.props}
    }

    if (list[namespace] === undefined)
        rebuildList();

    copy.childrenProps.id = list[namespace];
    copy.childrenProps["data-namespace"] = namespace;

    copy.children.props = copy.childrenProps;

    return copy.children;
}

Namespace.propTypes = {
    namespace: PropTypes.oneOf(config.namespace).isRequired
}

export default Namespace;
