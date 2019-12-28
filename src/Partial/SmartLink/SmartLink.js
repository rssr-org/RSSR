import React from 'react';
import {Link} from "react-router-dom";
import {IS_BROWSER} from "../../setup/constant";



const SmartLink = (props) => {
    let {children, to} = props;

    // build other props
    const finalProps = {...props};
    delete finalProps.to;

    let isInternalLink = false;
    let path = '';

    // convert other invalid to undefined type for pars as a <a></a> tag with out href
    // (when href of a tag is undefined then href prop will be remove)
    if (to === null || to === false || to === '')
        to = undefined;

    // when
    if (to) {
        let hostName;

        // domain.com || sub.domian.com
        if (IS_BROWSER)
            hostName = window.location.host.replace('www.', '');

        //ignore protocol slashes
        let startIndex = to.indexOf('://');
        if (startIndex !== -1)
            startIndex += 3;

        // cut line
        let firstSlashIndex = to.indexOf('/', startIndex);
        if (firstSlashIndex === -1)
            firstSlashIndex = to.length;

        // second part of URL
        // used for value of 'to' prop of 'Link' when isInternalLink is true
        path = to.substr(firstSlashIndex);

        const
            // first part of URL
            domain = to.substring(0, firstSlashIndex),

            // domain with out 'www.'
            cleanDomain = domain.replace('www.', ''),

            //
            domainIsExit = cleanDomain.search(hostName) !== -1;

        // check has sub domain
        let isEqualDomain = false;
        if (domainIsExit)
            isEqualDomain = cleanDomain.replace(hostName, '').indexOf('.') === -1;

        if (isEqualDomain || (to.substring(0, 1) === '/'))
            isInternalLink = true;
    }


    if (isInternalLink)
        return <Link to={path} data-internal="true" {...finalProps}>{children}</Link>;
    else
        return <a href={to} data-internal="false" {...finalProps}>{children}</a>;
};

export default SmartLink;
