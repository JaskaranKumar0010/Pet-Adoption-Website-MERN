import { useState, useEffect } from 'react';
import { fetchpetonclick, fetchprofiledata, applyadoptionuser, applyadoptionpet, deleteadoption } from '../API/endpoint';
import breadcrumb_bg from '../components/img/bg/breadcrumb_bg.jpg';
import paw_img from '../components/img/icon/w_pawprint.png'
import { useNavigate, useParams } from 'react-router-dom';
import '../components/styles/ApplyAdoption.css'
import ChatWindow from '../components/ChatWindow';

const ApplyAdoption = ({ userid }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [userdata, setUserData] = useState({});
    const [owner, setOwner] = useState({});
    const [applyingData, setApplyingData] = useState({
        petid: ""
    });
    const [appliedBy, setAppliedBy] = useState({
        userid: userid
    });
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
    const [isChatEnabled, setIsChatEnabled] = useState(false);

    useEffect(() => {
        if (pet) {
            setApplyingData({
                petid: pet._id
            });
        }
    }, [pet]);

    useEffect(() => {
        if (pet) {
            setIsAlreadyApplied(pet.appliedBy.some(application => application.userid === userid));
        }
    }, [pet, userid]);

    const handleApplyAdoption = async () => {
        try {
            await applyadoptionuser(userid, applyingData);
            await applyadoptionpet(pet._id, appliedBy);
            alert('Adoption Applied Successfully');
            navigate('/petlist');
        } catch (error) {
            console.error("Error applying adoption:", error);
        }
    };

    const fetchUser = async () => {
        try {
            const res = await fetchprofiledata(userid);
            setUserData(res.data)
            const applicant = res.data.adoptinglist.find(item => item.petid === id);
            if (applicant) {
                setIsChatEnabled(applicant.chatEnabled);
            }
            console.log(res.user)
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const fetchPet = async () => {
        try {
            const response = await fetchpetonclick(id);
            setPet(response.data);
        } catch (error) {
            console.error("Error fetching pet:", error);
        }
    };

    const fetchOwner = async () => {
        try {
            if (pet) {
                const response = await fetchprofiledata(pet.owner);
                setOwner(response.data.user);
            }
        } catch (error) {
            console.error("Error fetching pet:", error);
        }
    };


    useEffect(() => {
        fetchPet();
        fetchUser()
    }, [id]);

    useEffect(() => {
        fetchOwner();
    }, [pet]);

    return (
        <>
            {/* breadcrumb-area */}
            <section
                className="breadcrumb-area breadcrumb-bg"
                style={{ backgroundImage: `url(${breadcrumb_bg})` }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h2 className="title">Apply for adoption</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Apply for adoption
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* breadcrumb-area-end */}

            {/* breeder-details-area */}
            <section className="breeder-details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {pet ? (
                                <div className="breeder-details-content">
                                    <div className="details">
                                        <div className="breeder-details-img" style={{ margin: "0" }}>
                                            <img src={`http://localhost:5000/${pet.picture}`} alt="" />
                                        </div>

                                        <div className="all-options">

                                            <div className="manage-options">
                                                <h5 className="title">Pet Name : {pet.petName}</h5>
                                            </div>

                                            <div className="owner-details">
                                                <div className="title">
                                                    <h5>Owner Details</h5>
                                                </div>
                                                <div className="owner-content">
                                                    <div className="owner-img">
                                                        <img src={`http://localhost:5000/${owner.profilephoto}`} alt="Owner" className="owner-photo" />
                                                    </div>
                                                    <div className="owner-info">
                                                        <h6 className="owner-name">{owner && owner.userName ? owner.userName : "Loading..."}</h6>
                                                        <p className="owner-contact">{owner && owner.phoneNumber ? owner.phoneNumber.substring(0, 4) + "-XXX-XXX" : "Loading..."}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="breeder-dog-info">
                                        <div className="row">
                                            <div className="col-md-3 col-sm-4 col-6">
                                                <div className="breeder-info-item">
                                                    <h6>Gender:</h6>
                                                    <span>{pet.gender}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-4 col-6">
                                                <div className="breeder-info-item">
                                                    <h6>Birth Date:</h6>
                                                    <span>{pet.birthDate}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-4 col-6">
                                                <div className="breeder-info-item">
                                                    <h6>Color:</h6>
                                                    <span>{pet.color}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-4 col-6">
                                                <div className="breeder-info-item">
                                                    <h6>Posted On:</h6>
                                                    <span>{(pet.postedAT).substring(0, 10)}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-4 col-6">
                                                <div className="breeder-info-item">
                                                    <h6>Size:</h6>
                                                    <span>{pet.size}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-4 col-6">
                                                <div className="breeder-info-item">
                                                    <h6>City:</h6>
                                                    <span>{pet.location}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-sm-4 col-6">
                                                <div className="breeder-info-item">
                                                    <h6>Breed:</h6>
                                                    <span>{pet.breed}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="btn"
                                            onClick={handleApplyAdoption}
                                            style={{ width: "100%", justifyContent: "center", borderRadius: "8px" }}
                                            disabled={isAlreadyApplied}
                                        >
                                            {isAlreadyApplied ? "Already Applied" : "Apply For Adoption Today"} <img src={paw_img} alt="" /></button>

                                    </div>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <div className="col-lg-4">
                            <aside className="breeder-sidebar">
                                <ChatWindow isEnabled={isChatEnabled} />
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
            {/* breeder-details-area-end */}
        </>
    );
};

export default ApplyAdoption;
