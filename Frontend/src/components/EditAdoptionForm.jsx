import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postadoption, fetchpetonclick, updateadoption } from "../API/endpoint"; // Added fetchpetonclick import

const EditAdoptionForm = ({ userid }) => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [previousPicture, setPreviousPicture] = useState("");
    const [formData, setFormData] = useState({
        petName: "",
        picture: null,
        breed: "",
        gender: "",
        color: "",
        size: "",
        birthDate: "",
        location: ""
    });

    const cancelEditing = () => {
        navigate(`/applyadoption/${id}`)
    }

    console.log(formData)

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

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await fetchpetonclick(id);
                const petData = response.data;

                setFormData({
                    petName: petData.petName,
                    picture: null, // Assuming you don't want to update the image by default
                    breed: petData.breed,
                    gender: petData.gender,
                    color: petData.color,
                    size: petData.size,
                    birthDate: petData.birthDate,
                    location: petData.location
                });
                setPreviousPicture(petData.picture);
            } catch (error) {
                console.error("Error fetching pet data:", error);
            }
        };

        fetchPetData();
    }, [id, userid]);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                formDataToSend.append('image', formData.picture); // Correct field name
            }

            const res = await updateadoption(id, formDataToSend);
            if (res.status === 200) {
                alert("Adoption Updated Successfully");
                navigate('/petlist');
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
            <h2 className="mb-4">Edit Adoption</h2>
            <form onSubmit={handleSubmit}>
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
                    <div className="form-control" style={{ display: "flex", padding: "0px" }}>
                        {formData.picture ? (
                            <span style={{ padding: "6px 12px" }}>{formData.picture.name}</span>
                        ) : (
                            <span style={{ padding: "6px 12px" }}>{previousPicture ? previousPicture.split('/').pop() : "No file chosen"}</span>
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
                            <label htmlFor="picture" className="btn" style={{ height: "36px", width: "300px", justifyContent: "center", borderRadius: "0px" }}>
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
                    <label htmlFor="location">Location *</label>
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
                <div className="both-btns" style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <button type="submit" className="btn" style={{ width: "48%", marginTop: "10px", justifyContent: "center" }}>Submit</button>
                    <button onClick={cancelEditing} className="btn" style={{ width: "48%", marginTop: "10px", justifyContent: "center" }}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditAdoptionForm;
