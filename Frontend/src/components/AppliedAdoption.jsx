import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import breadcrumb_bg from '../components/img/bg/breadcrumb_bg.jpg'
import pawprint from '../components/img/icon/pawprint.png';
import w_pawprint from '../components/img/icon/w_pawprint.png';
import BreadCrumb from '../components/BreadCrumb';
import { fetchPetsData, fetchprofiledata } from '../API/endpoint';

const AppliedAdoptions = ({ userid }) => {

    const [adoptingList, setAdoptingList] = useState([]);
    const [pets, setPets] = useState({});

    const navigate = useNavigate();

    const getuserdetails = async () => {
        try {
            const userData = await fetchprofiledata(userid);
            setAdoptingList(userData.data.user.adoptinglist);
        } catch (error) {
            console.error("Error fetching user ID:", error);
        }
    };

    const fetchadoptions = async () => {
        if (adoptingList.length > 0) {
            try {
                const petIds = adoptingList.map(item => item.petid);
                const response = await fetchPetsData(petIds.join(','));
                setPets(response.data.data);
            } catch (error) {
                console.error("Error fetching pets:", error);
            }
        }
    };

    
    useEffect(() => {
        getuserdetails()
    }, []);

    useEffect(() => {
        fetchadoptions()
    }, [adoptingList]);


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
                                    <h2 className="title">Adoptions Applied</h2>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <a href="/">Home</a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                All Applied Pets
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* breadcrumb-area-end */}


                {/* adoption-shop-area */}
                <section className="adoption-shop-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            {pets.length > 0 ? (
                                pets.map(pet => (
                                    <div key={pet._id} className="col-lg-4 col-md-6" >
                                        <div className="adoption-shop-item" style={{
                                            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', borderRadius: "20px"
                                        }}>
                                            <div className="adoption-shop-thumb" >
                                                <img src={`http://localhost:5000/${pet.picture}`} alt="Pet Image" style={{ height: "400px", width: "100%" }} />
                                                <button className="btn" onClick={() => navigate(`/applyadoption/${pet._id}`)}>
                                                    Check Status <img src={w_pawprint} alt="" />
                                                </button>
                                                {/* <button onClick={() => navigate(`/adoptionform/${pet.id}`)} className="btn">
                                                    Adoption <img src={w_pawprint} alt="" />
                                                </button> */}
                                            </div>
                                            <div className="adoption-shop-content">
                                                <h4 className="title">
                                                    <a href="#">{pet.petName}</a>
                                                </h4>
                                                <div className="adoption-meta">
                                                    <ul>
                                                        <li>
                                                            <i className="fas fa-cog" />
                                                            <a href="#">{pet.breed}</a>
                                                        </li>
                                                        <li>
                                                            <i className="far fa-calendar-alt" /> Birth : {pet.birthDate}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="adoption-rating">
                                                    <ul>
                                                        <li className="rating">
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li className="price">
                                                            Location : <span>{pet.location}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-md-12 text-center">
                                    <h3>You have applied for no adoptions</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                {/* adoption-shop-area-end */}
            </>
    )
}

export default AppliedAdoptions;