import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pawprint from '../components/img/icon/pawprint.png';
import w_pawprint from '../components/img/icon/w_pawprint.png';
import mypet from '../components/img/icon/mypet.png'
import BreadCrumb from '../components/BreadCrumb';
import { fetchpets } from '../API/endpoint';

const PetList = ({ userid }) => {

    const [pets, setPets] = useState([]);
    const [filteredpets, setFilteredPets] = useState({});

    const navigate = useNavigate();

    const fetchPets = async () => {
        try {
            const response = await fetchpets()
            setPets(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    }

    useEffect(() => {
        fetchPets()
    }, []);

    useEffect(() => {
        setFilteredPets(pets.filter(pet => pet.owner !== userid));
    }, [pets]);



    return (
            <>
                <BreadCrumb></BreadCrumb>
                {/* adoption-shop-area */}
                <section className="adoption-shop-area" style={{paddingTop:"40px"}}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-9">
                                <div className="section-title text-center mb-65">
                                    <div className="section-icon">
                                        <img src={pawprint} alt="" />
                                    </div>
                                    <h5 className="sub-title">Meet the animals</h5>
                                    <h2 className="title" style={{margin:"0"}}>Pets Waiting for Adoption</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {filteredpets.length > 0 ? (
                                filteredpets.map(pet => (
                                    <div key={pet.id} className="col-lg-4 col-md-6">
                                        <div className="adoption-shop-item" style={{
                                            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', borderRadius: "20px"
                                        }}>
                                            <div className="adoption-shop-thumb" >
                                                <img src={`https://pet-adoption-server-inrv.onrender.com/${pet.picture}`} alt="Pet Image" style={{ height: "400px", width: "100%" }} />
                                                <button
                                                    className="btn"
                                                    onClick={() => navigate(`/applyadoption/${pet._id}`)}
                                                >
                                                    {(pet.appliedBy.some(application => application.userid === userid)) ? "Already Applied" :  "Adopt"} <img src={w_pawprint} alt="" /></button>
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
                                                        <li className="location">
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
                                    <h3>No pets available for adoption</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                {/* adoption-shop-area-end */}
            </>
    )
}

export default PetList