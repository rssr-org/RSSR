import React from 'react';
import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import {api} from "../../setup/api";
import {route} from "../../setup/route";
import {fetcher} from "../../Partial/fetcher/fetcher";
import Breakpoint from "rssr-breakpoint";
import Namespace from "rssr-namespace";
import {fetching} from "../../setup/utility/fetching";
import "./home.scss";
import SmartDirection from "rssr-smart-direction";
import Carousel from "rssr-carousel";
import SmartLinkTest from "./SmartLinkTest";


function Home(props) {
    const {homepage} = props;
    const sampleTextForSmartDirection = ['this is sample LTR text for test smart direction', 'نمونه متن راست چین برای ازمایش چینش هوشمند']
    const sampleCarousel = [
        '/asset/img/rssr-logo.png',
        '/asset/img/rssr-logo.png',
        '/asset/img/rssr-logo.png',
        '/asset/img/rssr-logo.png',
        '/asset/img/rssr-logo.png',
        '/asset/img/rssr-logo.png',
        '/asset/img/rssr-logo.png',
        '/asset/img/rssr-logo.png'
    ]

    const carouselOptions = {
        rightToLeft: true,
        cellAlign: 'right',
        groupCells: true
    }

    return (
        <Namespace namespace="home">
            <div className="container">
                <Helmet title="صفحه ‌اصلی"/>

                <div className="jumbotron mt-3" id="abc">
                    <h5>موفقیت اتفاقی نیست!</h5>
                    <p className="lead">
                        برای خلق بهترین‌ها باید بیشتر تلاش کرد، چیزی که ساده به دست بیاد، می‌تونه خیلی ساده هم از دست بره.
                    </p>
                </div>

                <Carousel className="slider-wrap" options={carouselOptions}>
                    {
                        sampleCarousel.map((img, index) => (
                            <div className="item" key={index}>
                                <img src={img} alt="RSSR LOGO"/>
                            </div>
                        ))
                    }
                </Carousel>

                <Breakpoint from="md">
                    {
                        () => (
                            <div className="alert alert-info">مثالی برای Breackpoint</div>
                        )
                    }
                </Breakpoint>

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
                                <div className="col-24 text-center">
                                    <img src="/asset/img/loading.gif" alt="loading"/>
                                    <div> در حال بار گذاری مطالب</div>
                                </div>
                            )
                            :
                            (
                                homepage.map((item) => (
                                    <div className="col-md-8 my-2 px-3 animated fadeIn" key={item.id}>
                                        <Link to={route.post(item.id)} className="card">
                                            <div className="card-body">
                                                <h3 className="card-title text-truncate h6">{item.title}</h3>
                                                <p className="card-text text-truncate">{item.body}</p>
                                                <span>مشاهده مطلب</span>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )
                    }
                </div>

                <SmartLinkTest/>
            </div>
        </Namespace>
    )
}


const fetch = () => fetching({url: api.posts})

export default fetcher(Home, fetch, 'homepage');
