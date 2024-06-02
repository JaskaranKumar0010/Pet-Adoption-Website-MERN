import logo from "./img/logo/logo.png"
import insta01 from "./img/images/insta_img01.png"
import insta02 from "./img/images/insta_img02.png"
import insta03 from "./img/images/insta_img03.png"
import insta04 from "./img/images/insta_img04.png"
import insta05 from "./img/images/insta_img05.png"
import insta06 from "./img/images/insta_img06.png"
import footershape1 from "./img/images/footer_shape01.png"
import footershape2 from "./img/images/footer_shape02.png"
import footerBackgroundImage from "./img/bg/footer_bg.jpg"
import copyrightimg from "./img/bg/copyright_shape.png"

import india from "./img/icon/india.png"

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-top-area footer-bg" style={{ backgroundImage: `url(${footerBackgroundImage})`}}>
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-3">
                                <div className="footer-widget">
                                    <div className="f-logo">
                                        <a href="index.html">
                                            <img src={logo} alt="" />
                                        </a>
                                    </div>
                                    <div className="footer-text">
                                        <p>
                                            The best overall dog DNA test Embark Breed &amp; Health Kit
                                            (view at Chewy) which provides overall dog you.
                                        </p>
                                    </div>
                                    <div className="footer-contact">
                                        <div className="icon">
                                            <i className="fas fa-headphones" />
                                        </div>
                                        <div className="content">
                                            <h4 className="title">
                                                <a href="tel:9876543210">9876-XXX-XXX</a>
                                            </h4>
                                            <span>Call Now</span>
                                        </div>
                                    </div>
                                    <div className="footer-social">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fab fa-twitter" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fab fa-youtube" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fab fa-linkedin-in" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="footer-widget">
                                    <h4 className="fw-title">Our Policies</h4>
                                    <div className="fw-link">
                                        <ul>
                                            <li>
                                                <a href="contact.html">Privacy Policy</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Terms and Conditions</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Editorial Policy</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Return Policy</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">IP Policy</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Grievance Redressal Policy</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Terms and Conditions</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="footer-widget">
                                    <h4 className="fw-title">Our Services</h4>
                                    <div className="fw-link">
                                        <ul>
                                            <li>
                                                <a href="breeder.html">Our Breeder</a>
                                            </li>
                                            <li>
                                                <a href="adoption.html">Our Adoption</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Editorial Policy</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Return Policy</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Grievance Policy</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Redressal Policy</a>
                                            </li>
                                            <li>
                                                <a href="contact.html">Contact Us</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="footer-widget">
                                    <h4 className="fw-title">Instagram</h4>
                                    <div className="fw-insta">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <img src={insta01} alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src={insta02} alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src={insta03} alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src={insta04} alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src={insta05} alt="" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img src={insta06} alt="" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="footer-shape">
                        <img src={footershape1} alt="" />
                    </div>

                    <div className="footer-shape shape-two">
                        <img src={footershape2} alt="" />
                    </div>

                </div>


                <div className="copyright-area" >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="copyright-text" >
                                    <p style={{ width: "fit-content" }}>Copyright © 2024 Petco. All Rights Reserved.</p>
                                </div>
                            </div>
                            <div className="col-md-4 d-none d-md-block">
                                <div className="footer-lang">
                                    <div className="dropdown" style={{ marginRight: "50px" }}>
                                        <button><img src={india} alt="" /> English
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* footer-end */}
        </>

    )
}

export default Footer