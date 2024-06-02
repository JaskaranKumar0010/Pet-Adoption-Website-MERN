import { useState, useEffect } from 'react';
import { fetchpetonclick, fetchprofiledata, applyadoptionuser, applyadoptionpet, deleteadoption } from '../API/endpoint';
import breadcrumb_bg from '../components/img/bg/breadcrumb_bg.jpg';
import paw_img from '../components/img/icon/w_pawprint.png'
import sn_icon from '../components/img/icon/sn_icon.png'
import { useNavigate, useParams } from 'react-router-dom';
import '../components/styles/ApplyAdoption.css'
import deleteicon from '../components/img/icon/icons8-delete-100.png'
import mypet from '../components/img/icon/mypet.png'
import editicon from '../components/img/icon/icons8-edit-24.png'

const ManagePet = ({ userid }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [owner, setOwner] = useState({});
    const [applyingData, setApplyingData] = useState({
        petid: ""
    });
    const [appliedBy, setAppliedBy] = useState({
        userid: userid
    });

    useEffect(() => {
        if (pet) {
            setApplyingData({
                petid: pet._id
            });
        }
    }, [pet]);

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
    

    const deleteAdoption = async () => {
        try {
            const response = await deleteadoption(id);
            if (response.status == 200) {
                alert('Pet Adoption Deleted Successfully')
                navigate('/petlist')
            }
        } catch (error) {
            console.error("Error deleting pet adoption:", error);
        }
    };

    const gotoEditAdoption = () =>{
        navigate(`/editadoptionform/${id}`)
    }

    useEffect(() => {
        fetchPet();
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
                                <h2 className="title">Manage Your Pet</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Manage your Pet
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
                                       <img src={mypet} alt="" style={{width:"52px", height:"52px", position:"absolute", zIndex:"1", left:"360px", top:"50px", padding:"2px"}} />
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
                                                        <p className="owner-contact">{owner && owner.phoneNumber ? owner.phoneNumber.substring(0, 4) + "-" + owner.phoneNumber.substring(4, 7) + "-" + owner.phoneNumber.substring(7, 10) : "Loading..."}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="manage-options">
                                                <img className="edit-icon" onClick={gotoEditAdoption} src={editicon} alt="" />
                                                <p>Edit Pet Details</p>
                                                <img className="delete-icon" onClick={deleteAdoption} src={deleteicon} alt="" />
                                                <p>Delete Adoption</p>
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

                                       <button className="btn" onClick={() => navigate(`/applicantlist/${pet._id}`)} style={{ width: "100%", justifyContent: "center", borderRadius: "8px" }}>
                                            Check Applicants ({pet.appliedBy.length}) <img src={paw_img} alt="" />
                                        </button>

                                    </div>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <div className="col-lg-4">
                            <aside className="breeder-sidebar">

                                <div className="widget sidebar-newsletter">
                                    <div className="sn-icon">
                                        <img src={sn_icon} alt="" />
                                    </div>
                                    <div className="sn-title">
                                        <h4 className="title">Subscribe Newsletter</h4>
                                        <p>Sign-up For Latest News</p>
                                    </div>
                                    <form action="#" className="sn-form">
                                        <input type="text" placeholder="Enter Your Email" />
                                        <button className="btn">subscribe</button>
                                    </form>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
            {/* breeder-details-area-end */}
        </>
    );
};

export default ManagePet;
