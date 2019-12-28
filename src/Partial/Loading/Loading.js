import PropTypes from 'prop-types';
import "./loadingEffect.scss";


function setupLoading(theProps, children, classes) {
    const props = {...theProps}
    let childrenProps = children.props

    if (props.isLoading || props.reloading) {
        childrenProps = {...childrenProps}
        //
        childrenProps.className = childrenProps.className ? childrenProps.className : ''
        childrenProps.className += classes
        //
        children.props = childrenProps
    }

    // pass down props
    delete props.isLoading;
    delete props.reloading;
    delete props.children;
    children.props = {...childrenProps, ...props}

    return children
}



const Loading = (props) => {
    const isArray = Array.isArray(props.children);
    let children = isArray ? [...props.children] : {...props.children};

    let classes = '';
    classes += props.isLoading ? " loading-animate" : "";
    classes += props.reloading ? " reload-animate" : "";

    children = isArray ?
        children.map(function (child) {
            return setupLoading(props, {...child}, classes)
        })
        :
        setupLoading(props, children, classes)

    return children;
}


Loading.propTypes = {
    isLoading: PropTypes.bool,
    reloading: PropTypes.bool,
}

export default Loading;
