import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import breadcrumb_bg from '../components/img/bg/breadcrumb_bg.jpg';
import pawprint from '../components/img/icon/pawprint.png';
import breeder_img01 from '../components/img/images/breeder_img01.jpg';
import breeder_img02 from '../components/img/images/breeder_img02.jpg';
import breeder_img03 from '../components/img/images/breeder_img03.jpg';
import breeder_img04 from '../components/img/images/breeder_img04.jpg';
import breeder_img05 from '../components/img/images/breeder_img05.jpg';
import breed_services_bg from '../components/img/bg/breed_services_bg.jpg';

const Adoption = () => {
    const navigate = useNavigate();

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    return (
        <>
            <style>
                {`
                .full-height-img {
                    height: 100%;
                    object-fit: cover;
                    width: 100%;
                }
                `}
            </style>
            {/* breadcrumb-area */}
            <section
                className="breadcrumb-area breadcrumb-bg"
                style={{ backgroundImage: `url(${breadcrumb_bg})` }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h2 className="title">Get Adoption</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Adoption
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* breadcrumb-area-end */}

            <section className="inner-breeder-area breeder-bg">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-4 col-lg-9 col-md-12 col-sm-9">
                            <div className="adoption-content">
                                <h5 className="sub-title">Meet Adoption</h5>
                                <h2 className="title">
                                    Work For <span>Adoption</span> Happy Time
                                </h2>
                                <p>
                                    The best overall dog DNA test is Embark Breed &amp; Health Kit view
                                    at Chewy which pres domesti dog is a sticated descendant.
                                </p>
                                <div className="adoption-list">
                                    <ul>
                                        <li>
                                            <i className="flaticon-tick" /> Embark Breed &amp; Health
                                        </li>
                                        <li>
                                            <i className="flaticon-tick" /> The domestic dog is a
                                            domesticated
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-9 col-md-12 col-sm-9">
                            <div className="breeder-info-wrap">
                                <div className="row no-gutters justify-content-center">
                                    <div className="col-md-6">
                                        <Slider {...settings}>
                                            <div className="breeder-item">
                                                <a href="breeder-details.html">
                                                    <img src={breeder_img01} alt="Breeder 1" className="full-height-img" />
                                                </a>
                                            </div>
                                            <div className="breeder-item">
                                                <a href="breeder-details.html">
                                                    <img src={breeder_img02} alt="Breeder 2" className="full-height-img" />
                                                </a>
                                            </div>
                                            <div className="breeder-item">
                                                <a href="breeder-details.html">
                                                    <img src={breeder_img03} alt="Breeder 3" className="full-height-img" />
                                                </a>
                                            </div>
                                            <div className="breeder-item">
                                                <a href="breeder-details.html">
                                                    <img src={breeder_img04} alt="Breeder 4" className="full-height-img" />
                                                </a>
                                            </div>
                                            <div className="breeder-item">
                                                <a href="breeder-details.html">
                                                    <img src={breeder_img05} alt="Breeder 5" className="full-height-img" />
                                                </a>
                                            </div>
                                        </Slider>

                                    </div>
                                    <div className="col-md-6">
                                        <div
                                            className="breed-services-info"
                                            style={{ backgroundImage: `url(${breed_services_bg})` }}
                                        >
                                            <h5 className="sub-title">Dog Adoption</h5>
                                            <h3 className="title">Available for Adoption</h3>
                                            <p>
                                                The best overall dog DNA test is Embark Breed &amp; Health Kit
                                                (view at Chewy), which provid dogs
                                            </p>
                                            <a href="#" onClick={() => navigate('/petlist')} className="btn">
                                                More Pets <img src={pawprint} alt="Paw Print" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Adoption;
