import React from 'react';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {fetcher} from "../../Partial/fetcher/fetcher";
import Namespace from "rssr-namespace";
import {fetching} from "../../setup/utility/fetching";
import "./home.scss";





function Home(props) {
    const {homepage} = props;

    return (
        <Namespace namespace="home">
            <div className="container">
                <Helmet title="RSSR Boilerplate home page"/>

                <div className="jumbotron mt-3 pb-3" id="abc">
                    <h5>RSSR Boilderplate</h5>
                    <p className="lead">
                        We are no better than anyone else,
                        We are not in competition with anyone,
                        We want to be the best version of ourselves.
                        <br/>
                        <br/>
                        see <a href="https://github.com/rssr-org/RSSR-Documentation" target="_blank">Documentation</a>
                    </p>
                </div>

                <div className="row pb-3">
                    {
                        (homepage.isLoading) ?
                            (
                                <div className="col-12 text-center">
                                    <img src="/asset/img/loading.gif" alt="loading"/>
                                    <div> fetching data ...</div>
                                </div>
                            )
                            :
                            (
                                homepage.map((post) => (
                                    <div className="col-md-4 my-2 px-3" key={post.id}>
                                        <Link to={route.post(post.id)} className="card">
                                            <div className="card-body">
                                                <h3 className="card-title text-truncate h6">{post.title}</h3>
                                                <p className="card-text text-truncate">{post.body}</p>
                                                <span>See more</span>
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
