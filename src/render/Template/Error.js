import React from 'react';
import {Helmet} from "react-helmet";
import {IS_DEVELOPMENT} from "../../setup/constant";


function Error(props) {
    return (
        <div className="p-5">
            <Helmet title="خطای پردازش"/>
            {
                !IS_DEVELOPMENT ?
                    <div className="px-3 pb-3" dir="rtl">
                        <h2>خطای پردازش</h2>
                        <p>متاسفانه در طول پردازش خطایی رخ داده است، در صورت امکان به صفحه قبل بازگردید و با پشتیبانی تماس بگیرید.</p>
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