import React from 'react';
import {toast} from "react-toastify";



export const badConnectionAlert = function (whereOf) {

    const message = (
        <div>
            <div className="mb-2 font-weight-bold">
                {whereOf} Error
            </div>
            Server Error, try again or tell to support!
        </div>
    )

    toast.error(message, {autoClose: false});
}