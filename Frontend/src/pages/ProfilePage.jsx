import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../components/styles/ProfilePage.css';
import Footer from '../components/Footer';
import { fetchprofiledata, updateprofilephoto, updateprofiledata } from '../API/endpoint';

const ProfilePage = ({ id }) => {

    const navigate = useNavigate();
    const [profiledata, setProfileData] = useState({
        userName: "",
        email: "",
        phoneNumber: "",
        country: "",
        state: "",
        city: "",
        profilephoto: ""
    })
    const fileInputRef = useRef(null)
    const [profilepic, setProfilepic] = useState({ picture: null });
    const [isEditing, setIsEditing] = useState(false);
    const [showList, setList] = useState(false);

    console.log(profiledata, 'dfghjkl;')

    const gotohomepage = () => {
        navigate('/')
    }

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const getuserdata = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userData = await fetchprofiledata(id);
                console.log('User Data:', userData);
                setProfileData(userData.data.user);
            }
        } catch (error) {
            console.error("Error fetching user ID:", error);
        }
    };

    const handleUpdatePictureClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        getuserdata();
    }, [id]);


    const updateProfilePhoto = async () => {
        const formData = new FormData();
        formData.append("profilephoto", profilepic);
        try {
            const res = await updateprofilephoto(id, formData);
            getuserdata();
            setList(!showList)
            alert("Profile photo is updated");
        }
        catch (error) {
            console.error('Error:', error);
        }
    };


    const updateProfileData = async () => {
        try {
            const res = await updateprofiledata(id, profiledata)
            alert("Profile Details updated")
            getuserdata()
            setIsEditing(false)
        } catch (err) {
            console.log(err)
        }
    }

    const toggleList = () => {
        setList(!showList);
    };

    const cancelUpdatePhoto = () => {
        setList(!showList);
    };


    return (<>
        <div className="profile-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="profile-header">
                            <h2>User Profile</h2>
                            <button className='btn' onClick={gotohomepage}>Go To HomePage</button>
                        </div>
                        <div className="profile-content">
                            <div className="profile-image">
                                <img src={`http://localhost:5000/${profiledata.profilephoto}`} alt="Profile" />
                                {/* <FaRegEdit className="icnnn" onClick={toggleList} /> */}
                                {!showList && <button
                                    className="btn"
                                    style={{ marginTop: "20px", width: "100%", justifyContent: "center" }}
                                    // onClick={()=>{toggleList(); handleUpdatePictureClick()}}
                                    onClick={toggleList}
                                >
                                    Update Picture
                                </button>}

                                {showList && <div className="fileupload">
                                    <input
                                        type="file"
                                        onChange={(e) => setProfilepic(e.target.files[0])}
                                        style={{
                                            marginTop: "20px",
                                            width: "100%",
                                            padding: "10px",
                                            fontSize: "16px",
                                            border: "1px solid #ccc",
                                            borderRadius: "5px",
                                            justifyContent: "center"
                                        }}
                                    />
                                    < div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <button
                                            className="btn"
                                            style={{ marginTop: "20px", width: "58%", justifyContent: "center" }}
                                            onClick={updateProfilePhoto}
                                        >
                                            Save Picture
                                        </button>
                                        <button
                                            className="btn"
                                            style={{ marginTop: "20px", width: "38%", justifyContent: "center" }}
                                            onClick={cancelUpdatePhoto}
                                        >
                                            Cancel
                                        </button>
                                    </div >
                                </div>}
                            </div>




                            {isEditing && (
                                <div className="profile-details">

                                    <div className="profile-detail-item">
                                        <p className='editingenabledlabel'>Username : </p>
                                        <input
                                            type="text"
                                            value={profiledata.userName}
                                            onChange={(e) => setProfileData({ ...profiledata, userName: e.target.value })}
                                        />
                                    </div>

                                    <div className="profile-detail-item">
                                        <p className='editingenabledlabel'>Email : </p>
                                        <input
                                            type="email"
                                            value={profiledata.email}
                                            onChange={(e) => setProfileData({ ...profiledata, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="profile-detail-item">
                                        <p className='editingenabledlabel'>Phone No. : </p>
                                        <input
                                            type="tel"
                                            value={profiledata.phoneNumber}
                                            onChange={(e) => setProfileData({ ...profiledata, phoneNumber: e.target.value })}
                                        />
                                    </div>

                                    <div className="profile-detail-item">
                                        <p className='editingenabledlabel'>Country : </p>
                                        <input
                                            type="text"
                                            value={profiledata.country}
                                            onChange={(e) => setProfileData({ ...profiledata, country: e.target.value })}
                                        />
                                    </div>
                                    <div className="profile-detail-item">
                                        <p className='editingenabledlabel'>State : </p>
                                        <input
                                            type="text"
                                            value={profiledata.state}
                                            onChange={(e) => setProfileData({ ...profiledata, state: e.target.value })}
                                        />
                                    </div>
                                    <div className="profile-detail-item">
                                        <p className='editingenabledlabel'>City : </p>
                                        <input
                                            type="text"
                                            value={profiledata.city}
                                            onChange={(e) => setProfileData({ ...profiledata, city: e.target.value })}
                                        />
                                    </div>
                                    <div className="btns">
                                    <button className='btn' onClick={() => updateProfileData()}>Save</button>
                                    <button className='btn' onClick={() => setIsEditing(false)}>Cancel</button>
                                    </div>
                                </ div>
                            )}
                            {!isEditing && (
                                <div className="profile-details">
                                    <p>Username : {profiledata.userName}</p>
                                    <p>Email : {profiledata.email}</p>
                                    <p>Phone No. : {profiledata.phoneNumber}</p>
                                    <p>Country : {profiledata.country}</p>
                                    <p>State : {profiledata.state}</p>
                                    <p>City : {profiledata.city}</p>
                                    <button className="btn" onClick={handleEditProfile}>Edit Profile</button>
                                </div>
                            )}


                        </div>
                    </div>


                    {/* <div className="col-lg-6">
                        <div className="pet-info">
                            <h3>Pet Information</h3>
                            <div className="pet-list">
                                <div className="pet-item">
                                    <img src={pawIcon} alt="Pet" />
                                    <p>Dog</p>
                                </div>
                                <div className="pet-item">
                                    <img src={pawIcon} alt="Pet" />
                                    <p>Cat</p>
                                </div>
                                <div className="pet-item">
                                    <img src={pawIcon} alt="Pet" />
                                    <p>Bird</p>
                                </div>
                            </div>
                        </div>
                    </div> */}


                </div>
            </div>
        </div>

        <Footer></Footer>
    </>
    );
}

export default ProfilePage;
