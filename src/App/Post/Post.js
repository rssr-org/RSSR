import React, {Fragment} from 'react';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {fetcher} from "../../Partial/fetcher/fetcher";
import {fetching} from "../../setup/utility/fetching";


function Post(props) {
    const postId = Number(props.match.params.postId)
    const {post} = props

    return (
        <div className="container">
            <Helmet title={post !== null ? post.title : 'Loading ...'}/>
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
                            <div className="w-100 text-center">
                                loading post ...
                            </div>
                        )
                }
            </div>
            <div className="pb-3">
                <Link to={route.post(postId - 1)} className="btn btn-link">&lt; previous</Link>
                <Link to={route.post(postId + 1)} className="btn btn-link">next &gt;</Link>
            </div>
        </div>
    );
};


const fetch = ({match, req}) => {
    return fetching({
        url: api.post(match.params.postId + '?delay=800')
    });
}

export default fetcher(Post, fetch, 'post');