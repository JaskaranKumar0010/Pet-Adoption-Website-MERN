import React from 'react';
import faqTv from './img/images/faq_tv.png';
import faqImg from './img/images/faq_img.png';
import faqShape from './img/images/faq_shape.png';

const FAQ = () => {


    return (
        
            <>
                {/* faq-area */}
                <section className="faq-area faq-bg">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="faq-img-wrap">
                                    <img src={faqTv} className="img-frame" alt="" />
                                    <img src={faqImg} className="main-img" alt="" />
                                    <a
                                        href="https://www.youtube.com/watch?v=XdFfCPK5ycw"
                                        className="popup-video"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="faq-wrapper">
                                    <div className="section-title mb-35">
                                        <h5 className="sub-title">FAQ Question</h5>
                                        <h2 className="title">History &amp; Family Adoption</h2>
                                    </div>
                                    <div className="accordion" id="accordionExample">
                                        <div className="card">
                                            <div className="card-header" id="headingOne">
                                                <h2 className="mb-0">
                                                    <button
                                                        className="btn btn-link btn-block text-left"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapseOne"
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Working for dog adoption
                                                    </button>
                                                </h2>
                                            </div>
                                            <div
                                                id="collapseOne"
                                                className="collapse show"
                                                aria-labelledby="headingOne"
                                                data-parent="#accordionExample"
                                            >
                                                <div className="card-body">
                                                    The best overall dog DNA test is embark breed &amp; health
                                                    Kit (view atths Chewy), which provides you with a breed brwn
                                                    and ition on provides ancestors most dogs.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingTwo">
                                                <h2 className="mb-0">
                                                    <button
                                                        className="btn btn-link btn-block text-left collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwo"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwo"
                                                    >
                                                        Competitions &amp; Awards
                                                    </button>
                                                </h2>
                                            </div>
                                            <div
                                                id="collapseTwo"
                                                className="collapse"
                                                aria-labelledby="headingTwo"
                                                data-parent="#accordionExample"
                                            >
                                                <div className="card-body">
                                                    The best overall dog DNA test is embark breed &amp; health
                                                    Kit (view atths Chewy), which provides you with a breed brwn
                                                    and ition on provides ancestors most dogs.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingThree">
                                                <h2 className="mb-0">
                                                    <button
                                                        className="btn btn-link btn-block text-left collapsed"
                                                        type="button"
                                                        data-toggle="collapse"
                                                        data-target="#collapseThree"
                                                        aria-expanded="false"
                                                        aria-controls="collapseThree"
                                                    >
                                                        The puppies are 3 months old
                                                    </button>
                                                </h2>
                                            </div>
                                            <div
                                                id="collapseThree"
                                                className="collapse"
                                                aria-labelledby="headingThree"
                                                data-parent="#accordionExample"
                                            >
                                                <div className="card-body">
                                                    The best overall dog DNA test is embark breed &amp; health
                                                    Kit (view atths Chewy), which provides you with a breed brwn
                                                    and ition on provides ancestors most dogs.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="faq-shape">
                        <img src={faqShape} alt="" />
                    </div>
                </section>
                {/* faq-area-end */}
            </>

    
    );
};

export default FAQ;
