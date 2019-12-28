import React from 'react';
import {Route, Switch} from "react-router-dom";
import {routeMap} from "../../setup/routeMap";
import {jumpScrollToTop} from "../../setup/utility/jumpScrollToTop";


function Router() {
    return (
        <Switch>
            {
                routeMap.map((route, index) => {
                    return <Route key={index} {...route} />
                })
            }
            {
                jumpScrollToTop()
            }
        </Switch>
    );
};

export default Router;