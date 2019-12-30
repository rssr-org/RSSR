import PropTypes from 'prop-types';
const defaultConfig = require("./config.default");


let config;
try {
    config = require("~/namespace.json");
} catch (e) {
    try {
        config = require("~/package.json").namespace;
    } catch (e) {
        config = {}
    }
}
config = {
    ...defaultConfig,
    ...config
}


const Namespace = ({namespace, children}) => {
    const copy = {
        children: {...children},
        childrenProps: {...children.props}
    }
    copy.childrenProps[config.name] = namespace;
    copy.children.props = copy.childrenProps;
    return copy.children;
}

Namespace.propTypes = {
    namespace: PropTypes.string.isRequired
}

export default Namespace;
