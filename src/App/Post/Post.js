import React, {Fragment} from 'react';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {fetcher} from "../../Partial/fetcher/fetcher";
import {fetching} from "../../setup/utility/fetching";
import {tokenToHeaders} from "../../setup/utility/tokenToHeaders";
import Loading from "../../Partial/Loading/Loading";


function Post(props) {
    const postId = Number(props.match.params.postId)
    const {post} = props

    return (
        <div className="container">
            <Helmet title={post !== null ? post.title : 'باگذاری ...'}/>
            <div className="jumbotron mt-3">
                {
                    (post !== null) ? (
                            <Fragment>
                                <h1>{post.title + ' ' + postId}</h1>
                                <p className="lead">{post.body}</p>
                            </Fragment>
                        )
                        :
                        (
                            <Loading isLoading={true}>
                                <div className="w-100 text-center">
                                    در حال بار گذاری مطلب
                                </div>
                            </Loading>
                        )
                }
            </div>
            <div className="d-flex justify-content-between pb-5">
                <Link to={route.post(postId - 1)} className="btn btn-outline-primary">last post</Link>
                <Link to={route.post(postId + 1)} className="btn btn-outline-primary">next post</Link>
            </div>
        </div>
    );
};


const fetch = ({match, req}) => {
    return fetching({
        url: api.post(match.params.postId),
        headers: tokenToHeaders({}, undefined, req)
    });
}

export default fetcher(Post, fetch, 'post');