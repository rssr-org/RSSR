import React from 'react';
import {connect} from "trim-redux";
import {Helmet} from "react-helmet-async";
import {browserHistory} from "../../setup/browserHistory";

function Error404(props) {
    return (
        <div className="container mb-3">
            <Helmet title="متاسفانه صفحه مورد نظر یافت نشد!"/>
            <div className="row">
                <div className="col-12 text-center">
                    <h4 className="py-5">Page Not Found!</h4>
                    <img src="/asset/img/error-404.png" alt="page not found" width="300"/>
                    <br/>
                    <button className="btn btn-secondary ml-3 mt-4" onClick={() => browserHistory.goBack()}>
                        <i className="fa fa-angle-right font-weight-bold ml-1"></i>
                        Back
                    </button>
                    <div className="mt-3 alert alert-info">
                        example skeleton data
                        <br/>
                        {props.skeleton.title}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(s => ({skeleton: s.skeleton}))(Error404);
