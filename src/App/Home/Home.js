import React from 'react';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {fetcher} from "../../Partial/fetcher/fetcher";
import Namespace from "rssr-namespace";
import {fetching} from "../../setup/utility/fetching";
import "./home.scss";
import SmartDirection from "rssr-smart-direction";


function Home(props) {
    const {homepage} = props;
    const sampleTextForSmartDirection = ['this is sample LTR text for test smart direction', 'نمونه متن راست چین برای ازمایش چینش هوشمند']


    return (
        <Namespace namespace="home">
            <div className="container">
                <Helmet title="صفحه ‌اصلی"/>

                <div className="jumbotron mt-3 pb-3" id="abc">
                    <h5>RSSR Boilderplate</h5>
                    <p className="lead">
                        Be happy! Life is too short.
                        <br/>
                        We are no better than no one,
                        We are not in competition with anyone,
                        We want to be the best version of ourselves.
                        <br/>
                        <br/>
                        see <a href="https://github.com/rssr-org/RSSR-Documentation" target="_blank">Documentation</a>
                    </p>
                </div>

                <div>
                    {
                        sampleTextForSmartDirection.map((txt, index) => (
                            <SmartDirection text={txt} key={index}>
                                <div className="alert alert-success">{txt}</div>
                            </SmartDirection>
                        ))
                    }
                </div>

                <div className="row">
                    {
                        (homepage.isLoading) ?
                            (
                                <div className="col-6 text-center">
                                    <img src="/asset/img/loading.gif" alt="loading"/>
                                    <div> fetching data ...</div>
                                </div>
                            )
                            :
                            (
                                homepage.map((item) => (
                                    <div className="col-md-4 my-2 px-3" key={item.id}>
                                        <Link to={route.post(item.id)} className="card">
                                            <div className="card-body">
                                                <h3 className="card-title text-truncate h6">{item.title}</h3>
                                                <p className="card-text text-truncate">{item.body}</p>
                                                <span>See</span>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )
                    }
                </div>
            </div>
        </Namespace>
    )
}


const fetch = () => fetching({url: api.posts})

export default fetcher(Home, fetch, 'homepage');
