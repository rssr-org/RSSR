import React, {Fragment} from 'react';
import {Helmet} from "react-helmet";
import Link from "react-router-dom/es/Link";
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {fetcher} from "../../Partial/fetcher/fetcher";
import {LOADING_CLASS} from "../../setup/constant";
import {fetching} from "../../setup/utility/fetching";
import {tokenToHeaders} from "../../setup/utility/tokenToHeaders";


function Post(props) {
    const
        postId = Number(props.match.params.postId),
        {post} = props;

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
                            <div className={`w-100 text-center ${LOADING_CLASS}`}>
                                در حال بار گذاری مطلب
                            </div>
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


Post.redux = 'post';
Post.fetch = ({match, req}) => {
    return fetching({
        url: api.post(match.params.postId),
        headers: tokenToHeaders({}, undefined, req)
    });
}

export default fetcher(Post);