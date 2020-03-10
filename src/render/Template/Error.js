import React from 'react';
import {Helmet} from "react-helmet-async";
import {IS_DEVELOPMENT} from "../../setup/constant";


function Error(props) {
    return (
        <div className="p-5">
            <Helmet title="Process Error"/>
            {
                !IS_DEVELOPMENT ?
                    <div className="px-3 pb-3" dir="rtl">
                        <h2>Process Error</h2>
                        <p>
                            Sorry, an error occurred during processing. if possible, go back to the previous page and contact support.
                        </p>
                    </div>
                    : ''
            }
            <div className="alert alert-danger text-left" dir="ltr">
                {props.error.message}
            </div>
            {
                IS_DEVELOPMENT ?
                    <pre className="px-3 text-left">{props.error.stack}</pre>
                    :
                    <script dangerouslySetInnerHTML={{__html: 'console.log(`' + JSON.stringify(props.error.stack) + '`)'}}/>
            }
        </div>
    )
}


export default Error;