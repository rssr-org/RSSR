// TEST of Smart Link
import React from 'react';
import SmartLink from "rssr-smart-link";

const SmartLinkTest = () => { // ::R:: set green coler when pass test
    const urlList = [
        "domain.com/product/1",
        "https://domain.com/product/1",
        "https://wwww.domain.com/product/1",
        "wwww.domain.com/product/1",
        "https://wwww.sub.domain.com/product/1",
        "localhost:3000/product/1",
        "product/1",
        "sub.localhost:4000",
        "http://sub.localhost:4000",
        "http://www.sub.localhost:4000/product",
        "localhost:4000/1",
        "/product/1",
        "localhost:4000",
        "localhost:4000/product",
        "http://localhost:4000/product/1",
        "https://wwww.localhost:4000/product/1",
    ];


    return (
        urlList.map((to, i) => (
            <div className="w-100 text-left" dir="ltr" key={i}>
                <div>URL: {urlList[i]}</div>
                <SmartLink to={to}>{to}</SmartLink>
                <hr/>
            </div>
        ))
    );
};

export default SmartLinkTest;
