import { useEffect, useState, useRef } from 'react';
import preloader from "./img/preloader.gif"
import logo from "./img/logo/logo.png"
import { useNavigate } from "react-router-dom";
import header_shape from './img/bg/header_shape.png'
import defaultProfilePic from './img/Default_pfp.jpg'
import SigningOutPrompt from './SigningOutPrompt';
import './styles/Header.css'
import { fetchprofiledata } from '../API/endpoint';

const Header = ({ id }) => {


    const [isLoading, setIsLoading] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('Home');
    const [showusermenu, setShowUserMenu] = useState(false);
    const [profiledata, setProfileData] = useState({})
    const [isSigningOut, setisSigningOut] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const getuserdetails = async () => {
        try {
            const userData = await fetchprofiledata(id);
            // console.log('User Data:', userData);
            setProfileData(userData.data.user);
        } catch (error) {
            console.error("Error fetching user ID:", error);
        }
    };


    useEffect(() => {
        getuserdetails();
    }, [id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const gotoProfile = () => {
        navigate(`/profile-page`)
    }

    const toggleMenu = () => {
        setShowUserMenu(prevState => !prevState);
    };


    useEffect(() => {
        // Simulating page loading delay
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // Clear timeout on component unmount to prevent memory leaks
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const preventNavigation = (event) => {
            event.preventDefault();
        };

        // Attach event listener to prevent navigation for all <a> tags
        document.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', preventNavigation);
        });

        // Cleanup function to remove event listener when component unmounts
        return () => {
            document.querySelectorAll('a').forEach((link) => {
                link.removeEventListener('click', preventNavigation);
            });
        };
    }, []);

    const handleLogout = () => {
        setisSigningOut(true);
    
        setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userID');
          setProfileData({}); // Clear profile data
          setShowUserMenu(false); // Close user menu if open
          setisSigningOut(false);
          navigate('/'); // Navigate to home page
        }, 500);
      };

    const handleloginClick = () => {
        navigate('/login');
    };

    const gotoappliedadoptions = () => {
        navigate('/appliedadoptions');
    };

    const gotoMyPets = () => {
        navigate('/mypets');
    };

    const handleNavItemClick = (itemName, path) => {
        setActiveNavItem(itemName);
        setIsMobileMenuOpen(false);
        navigate(path);
    };

    const toggleSearch = (e) => {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const scrollButton = document.querySelector('.scroll-to-target');

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        if (scrollButton) {
            scrollButton.addEventListener('click', scrollToTop);
        }

        return () => {
            if (scrollButton) {
                scrollButton.removeEventListener('click', scrollToTop);
            }
        };
    }, []);


    return (
        <>
            {/* Preloader */}
            {isLoading && (
                <div id="preloader">
                    <img src={preloader} alt="" />
                </div>
            )}
            {/* Preloader-end */}

            {/* Scroll-top */}
            <button className="scroll-top scroll-to-target" data-target="html">
                <i className="fas fa-angle-up" />
            </button>
            {/* Scroll-top-end*/}

            <>
                <div id="sticky-header" className="menu-area">
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="mobile-nav-toggler" onClick={toggleMobileMenu}>
                                    <i className="fas fa-bars" />
                                </div>
                                <div className="menu-wrap">
                                    <nav className="menu-nav show">
                                        <div className="logo">
                                            <a href="/">
                                                <img src={logo} alt="" />
                                            </a>
                                        </div>
                                        <div className="navbar-wrap main-menu d-none d-lg-flex">
                                            <ul className="navigation">
                                                <li className={activeNavItem === 'Home' ? 'active menu-item-has-children' : 'menu-item-has-children'}>
                                                    <a href="" onClick={() => handleNavItemClick('Home', '/')}>Home</a>
                                                </li>
                                                <li className={activeNavItem === 'Adoption' ? 'active' : ''}>
                                                    <a href="" onClick={() => handleNavItemClick('Adoption', '/adoption')}>Adoption</a>
                                                </li>
                                                <li className={activeNavItem === 'Pet List' ? 'active' : ''}>
                                                    <a href='' onClick={() => handleNavItemClick('Pet List', '/petlist')}>Pet List</a>
                                                </li>
                                                <li className={activeNavItem === 'Post Adoption' ? 'active' : ''}>
                                                    <a href='' onClick={() => handleNavItemClick('Post Adoption', '/adoptionform')}>Post Adoption</a>
                                                </li>
                                                <li className={activeNavItem === 'Contact Us' ? 'active' : ''}>
                                                    <a href="" onClick={() => handleNavItemClick('Contact Us', '/contactus')}>Contact Us</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="header-action d-none d-md-block">
                                            <ul>
                                                <li className="header-search" onClick={toggleSearch}>
                                                    <a href=""  >
                                                        <i className="flaticon-search" />
                                                    </a>
                                                </li>
                                                {localStorage.getItem('token') && <li className="header-shop-cart">
                                                    <a href="/">
                                                        <div className="profile-pic" onClick={toggleMenu}>
                                                            <img src={`http://localhost:5000/${profiledata.profilephoto}`} alt="Profile" style={{ borderRadius: '50%', width: '48px', height: '48px', overflow: "hidden" }} />
                                                            {showusermenu && (<div className="profile-menu" ref={menuRef}>
                                                                <ul>
                                                                    <h5>{profiledata && profiledata.userName ? profiledata.userName : "Loading..."}</h5>
                                                                    <li onClick={gotoProfile}>My Profile</li>
                                                                    <li onClick={gotoMyPets}>My Pets</li>
                                                                    <li onClick={gotoappliedadoptions}>Applied Adoptions</li>
                                                                </ul>
                                                            </div>)}
                                                        </div>
                                                    </a>

                                                </li>}

                                                {localStorage.getItem('token') ? (
                                                    <li className="header-btn">
                                                        <button className="btn" onClick={handleLogout}>
                                                            Logout
                                                        </button>

                                                    </li>
                                                ) : (
                                                    <li className="header-btn">
                                                        <button className="btn" style={{ width: "180px", justifyContent: "center" }} onClick={handleloginClick}>
                                                            Log In / Sign Up
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </nav>
                                </div>

                                {/* Mobile Menu  */}
                                <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                                    <nav className="menu-box">
                                        <div className="close-btn" onClick={toggleMobileMenu}>
                                            <i className="fas fa-times" />
                                        </div>
                                        <div className="nav-logo">
                                            <a href="/">
                                                <img src={logo} alt="Logo" title="Logo" />
                                            </a>
                                        </div>
                                        <div className="menu-outer">
                                            <ul>
                                                <li><a href="/" onClick={() => handleNavItemClick('Home', '/')}>Home</a></li>
                                                <li><a href="/adoption" onClick={() => handleNavItemClick('Adoption', '/adoption')}>Adoption</a></li>
                                                <li><a href="/petlist" onClick={() => handleNavItemClick('Pet List', '/petlist')}>Pet List</a></li>
                                                <li><a href="/adoptionform" onClick={() => handleNavItemClick('Post Adoption', '/adoptionform')}>Post Adoption</a></li>
                                                <li><a href="/contactus" onClick={() => handleNavItemClick('Contact Us', '/contactus')}>Contact Us</a></li>
                                            </ul>
                                        </div>
                                    </nav>
                                    <div className="menu-backdrop" onClick={toggleMobileMenu} />
                                </div>
                                {/* End Mobile Menu */}

                            </div>
                        </div>
                    </div>
                    <div className="header-shape" style={{ backgroundImage: `url(${header_shape})` }} />
                </div>


                {/* header-search */}
                <div className={`search-popup-wrap ${isSearchOpen ? 'active' : ''}`} role="dialog">
                    <div className="search-popup-content">
                        <div className="search-popup-header">
                            <h2 className="search-popup-title">Search</h2>
                            <button className="search-popup-close" onClick={toggleSearch}><i className="fas fa-times"></i></button>
                        </div>
                        <form className="search-popup-form" action="#">
                            <input type="text" name="search" className="search-popup-input" placeholder="Type keywords here" />
                            <button type="submit" className="search-popup-submit">Search</button>
                        </form>
                    </div>
                </div>

                {/* </div> */}

                {/* header-search-end */}

                {isSigningOut && <SigningOutPrompt />}
            </>

        </>
    );
}

export default Header;
