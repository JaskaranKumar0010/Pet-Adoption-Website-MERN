import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import images
import pawprint from './img/icon/pawprint.png';
import breedServicesImg01 from './img/images/breed_services_img01.jpg';
import breedServicesImg02 from './img/images/breed_services_img02.jpg';
import breedServicesImg03 from './img/images/breed_services_img03.jpg';
import breedServicesImg04 from './img/images/breed_services_img04.jpg';
import breedServicesBg from './img/bg/breed_services_bg.jpg';
import breedServicesShape01 from './img/images/breed_services_shape01.png';
import breedServicesShape02 from './img/images/breed_services_shape02.png';

const Breedservices = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="breeds-services pt-110 pb-110">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-9">
                        <div className="section-title text-center mb-65">
                            <div className="section-icon">
                                <img src={pawprint} alt="Pawprint" />
                            </div>
                            <h5 className="sub-title">Service to Breeds</h5>
                            <h2 className="title">Most Popular Dog Breed</h2>
                            <p>
                                The best overall dog DNA test is Embark Breed &amp; Health Kit
                                (view at Chewy), which provides you with a breed breakdown and
                                information. Most dogs
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <Slider {...settings}>
                            {[breedServicesImg01, breedServicesImg02, breedServicesImg03, breedServicesImg04].map((imgSrc, index) => (
                                <div className="breed-services-item" key={index}>
                                    <div className="thumb">
                                        <img src={imgSrc} alt={`Breed ${index + 1}`} />
                                    </div>
                                    <div className="content">
                                        <h3 className="title">
                                            <a href="/">
                                                {["Golden Retriever", "German Shepherd", "Siberian Husky", "Bernese Mountain"][index]}
                                            </a>
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div
                            className="breed-services-info"
                            style={{ backgroundImage: `url(${breedServicesBg})` }}
                        >
                            <h5 className="sub-title">Dog Breeder</h5>
                            <h3 className="title">Available for Breed</h3>
                            <p>
                                The best overall dog DNA test is Embark Breed &amp; Health Kit
                                (view at Chewy), which provides dogs
                            </p>
                            <a href="dog-list.html" className="btn">
                                More Pets <img src={pawprint} alt="Pawprint" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breed-services-shape">
                <img src={breedServicesShape01} alt="Shape 1" />
            </div>
            <div className="breed-services-shape shape-two">
                <img src={breedServicesShape02} alt="Shape 2" />
            </div>
        </section>
    );
};

export default Breedservices;
