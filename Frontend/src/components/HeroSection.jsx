import React, { useEffect } from 'react';
import slider_bg01 from './img/slider/slider_bg01.jpg';
import slider_bg02 from './img/slider/slider_bg02.jpg';
import pawprint from './img/icon/w_pawprint.png';
import slider_shape01 from './img/slider/slider_shape01.png';
import slider_shape02 from './img/slider/slider_shape02.png';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
    const navigate = useNavigate()
    return (
        <>
            <>
                {/* main-area */}
                <main>
                    {/* slider-area */}
                    <section className="slider-area">
                        <div className="slider-active">
                            <div
                                className="single-slider slider-bg d-flex align-items-center"
                                style={{ backgroundImage: `url(${slider_bg01})` }}
                            >
                                <div className="container custom-container">
                                    <div className="row">
                                        <div className="col-xl-5 col-lg-7 col-md-10">
                                            <div className="slider-content">
                                                <div className="slider-title">
                                                    <h2
                                                        className="title"
                                                        data-animation="fadeInUpBig"
                                                        data-delay=".2s"
                                                        data-duration="1.2s"
                                                    >
                                                        Best Friend with <br />Happy Time
                                                    </h2>
                                                </div>
                                                <div className="slider-desc">
                                                    <p
                                                        className="desc"
                                                        data-animation="fadeInUpBig"
                                                        data-delay=".4s"
                                                        data-duration="1.2s"
                                                    >
                                                        Human Shampoo on Dogs After six days of delirat, the jury
                                                        found Hernandez guilty of first-degree murder
                                                    </p>
                                                </div>
                                                <a
                                                    href=""
                                                    className="btn"
                                                    data-animation="fadeInUpBig"
                                                    data-delay=".6s"
                                                    data-duration="1.2s"
                                                    onClick={()=>navigate('/adoption')}
                                                >
                                                    View More <img src={pawprint} alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div
                                className="single-slider slider-bg d-flex align-items-center"
                                style={{ backgroundImage: `url(${slider_bg02})` }}
                            >
                                <div className="container custom-container">
                                    <div className="row">
                                        <div className="col-xl-5 col-lg-7 col-md-10">
                                            <div className="slider-content">
                                                <div className="slider-title">
                                                    <h2
                                                        className="title"
                                                        data-animation="fadeInUpBig"
                                                        data-delay=".2s"
                                                        data-duration="1.2s"
                                                    >
                                                        Best Friend <span>with</span> Happy Time
                                                    </h2>
                                                </div>
                                                <div className="slider-desc">
                                                    <p
                                                        className="desc"
                                                        data-animation="fadeInUpBig"
                                                        data-delay=".4s"
                                                        data-duration="1.2s"
                                                    >
                                                        Human Shampoo on Dogs After six days of delirat, the jury
                                                        found Hernandez guilty of first-degree murder
                                                    </p>
                                                </div>
                                                <a
                                                    href="dog-list.html"
                                                    className="btn"
                                                    data-animation="fadeInUpBig"
                                                    data-delay=".6s"
                                                    data-duration="1.2s"
                                                >
                                                    View More <img src={pawprint} alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="slider-shape">
                            <img src={slider_shape01} alt="" />
                        </div>
                        <div className="slider-shape shape-two">
                            <img src={slider_shape02} alt="" />
                        </div>
                    </section>
                    {/* slider-area-end */}
                </main>
            </>

        </>
    );
}

export default HeroSection;
