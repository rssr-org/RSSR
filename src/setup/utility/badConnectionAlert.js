import React from 'react';
import {toast} from "react-toastify";



export const badConnectionAlert = function (whereOf) {

    const message = (
        <div>
            <div className="mb-2 font-weight-bold">
                خطای
                &nbsp;
                {whereOf}
            </div>
            اتصال اینترنت خود را بررسی نماید و مجددا تلاش نمایید.
            در صورت عدم رفع خطا به پشتیبانی اطلاع دهید.
        </div>
    )

    toast.error(message, {autoClose: false});
}