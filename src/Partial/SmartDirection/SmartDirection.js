import PropTypes from 'prop-types';

const SmartDirection = ({children, text, disableInServer}) => {
    disableInServer = disableInServer || true;

    // ignore SmartDirection in server is better
    if(disableInServer && typeof window === "undefined")
        return children;

    const chd = {...children};
    const chdProps = {...chd.props};

    let direction = null, i = 0;
    while (direction === null) {
        if (/^[a-z A-Z]/.test(text[i]))
            direction = 'ltr';
        else if (/^[\u0600-\u06FF]/.test(text[i]))
            direction = 'rtl';
        else if ((i + 1) === text.length)
            direction = 'ltr'; // default
        //
        i++;
    }

    if (chdProps.style === undefined)
        chdProps.style = {};

    chdProps.style.direction = direction;
    chdProps.style.textAlign = (direction === 'rtl') ? "right" : "left";

    chd.props = chdProps;
    return chd;
};

SmartDirection.propTypes = {
    disableInServer: PropTypes.bool, // default is TRUE
    text: PropTypes.string.isRequired
};

export default SmartDirection;
