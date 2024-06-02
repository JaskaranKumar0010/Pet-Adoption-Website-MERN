import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postadoption } from "../API/endpoint";

const AdoptionForm = ({userid}) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        petName: "",
        picture: null,
        breed: "",
        gender: "",
        color: "",
        size: "",
        birthDate: "",
        location: "",
        owner: userid
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the input
        setFormData({ ...formData, picture: file }); // Set the file object in formData
    };

    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('petName', formData.petName);
            formDataToSend.append('breed', formData.breed);
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('color', formData.color);
            formDataToSend.append('size', formData.size);
            formDataToSend.append('birthDate', formData.birthDate);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('owner', formData.owner);

            // Only append image data if uploaded by the user
            if (formData.picture) {
                formDataToSend.append('picture', formData.picture);
            }

            const res = await postadoption(formDataToSend);
            if (res.status === 200) {
                alert("Adoption Posted Successfully");
                navigate('/petlist')
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                alert("Internal Server Error");
            } else {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Post Adoption</h2>
            <form >
                <div className="form-group">
                    <label htmlFor="petName">Pet Name *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="petName"
                        name="petName"
                        value={formData.petName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="picture">Choose Image *</label>
                    <div className="form-control" style={{ display: "flex", padding: "0px"}}>
                        {formData.picture ? (
                            <span style={{ padding: "6px 12px" }}>{formData.picture.name}</span>
                        ) : (
                            <span style={{ padding: "6px 12px" }}>No file chosen</span>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            id="picture"
                            name="picture"
                            className="d-none"
                            onChange={handleImageChange}
                        />
                        <div style={{ marginLeft: "auto" }}>
                            <label htmlFor="picture" className="btn" style={{ height: "36px", width: "300px", justifyContent: "center", borderRadius:"0px"  }}>
                                Upload Image
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="breed">Breed *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="breed"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender*</label>
                    <input
                        type="text"
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="color">Color *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="size">Size *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="birthDate">Birth Date *</label>
                    <input
                        type="date"
                        className="form-control"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Location">Location *</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button onClick={handleSubmit} className="btn" style={{width:"100%", marginTop:"10px", justifyContent:"center"}}>Submit</button>

            </form>
        </div>
    );
};

export default AdoptionForm;
