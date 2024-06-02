import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bg from './img/images/contact_img.png'
import './styles/Login.css';
import LoggingInPrompt from './LoggingInPrompt';
import { authlogin } from "../API/endpoint";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    
    const [isLoggingIn, setisLoggingIn] = useState(false);

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/signup')
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email is Required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid Email";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is Required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            Object.values(newErrors).forEach(error => {
                toast.error(error); // Display error as toast notification
            });
            return;

        }
        try {
            const res = await authlogin(formData);
            console.log(res)
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userID', res.data.existinguser._id);
                setisLoggingIn(true);
                setTimeout(() => {
                    setisLoggingIn(false);
                    navigate('/')
                }, 1000);
            } else if (res.status === 204) {
                toast.error("User doesn't exist");
            } else if (res.status === 201) {
                toast.error("Invalid password");
            }
        } catch (error) {
            console.error('Error:', error);
        }


    }

    const setShowPassword = () => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }



    return (
        <>
            <div className="loginform">
                <h1>Login</h1>
                <div className="logincontainer">
                    <div className="loginmain">
                        <ToastContainer />
                        <div className="logincontent">
                            <h2>Log In</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="E-mail"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    id='password'
                                    name="password"
                                    placeholder="User Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button className="loginbtn" type="submit">
                                    Login
                                </button>
                                <div className="showpassword">
                                    <input type="checkbox" onClick={() => setShowPassword()} /> Show Password
                                </div>
                            </form>
                            <p className="loginaccount" onClick={handleRegisterClick}>
                                Don't Have An Account? <a href="#">Register</a>
                            </p>
                        </div>
                        <div className="loginformimg">
                            <img src={bg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {isLoggingIn && <LoggingInPrompt />}
        </>
    );
};

export default Login;
