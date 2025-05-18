import axios from "axios";

const token = localStorage.getItem("token");

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://pet-adoption-server-inrv.onrender.com";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    // "Content-Type": "application/json",
  },
});


export const authlogin = (logindata) => API.post( "/auth/login", logindata);
export const signup = (signupdata) => API.post("/auth/signup", signupdata);
export const postadoption = (formData) => API.post('/pet/postadoption',formData)
export const updateadoption = (userID, formData) => API.put(`/pet/updateadoption/${userID}`,formData)
export const deleteadoption = (petID) => API.delete(`/pet/deleteadoption/${petID}`)
export const fetchpets = () => API.get('/pet/fetchpets')
export const fetchpetonclick = (id) => API.get(`/pet/${id}`)

// export const addCommentToPost = (id, commentdata) => API.post(`/blog/${id}/comment`, commentdata);
// export const  deleteCommentFromPost = (blogid, commentid) => API.delete(`/blog/${blogid}/${commentid}`)
// export const editCommentFromBlog = (blogid, commentid, newtext) => API.patch(`/blog/${blogid}/${commentid}`, newtext)

export const fetchprofiledata= (userID) => API.get(`/auth/profiledata/${userID}`)
export const updateprofilephoto= (userID, formdata) => API.put(`/auth/profilephoto/${userID}`, formdata)
export const updateprofiledata= (userID, formdata) => API.put(`/auth/updateprofiledata/${userID}`, formdata)
export const fetchPetsData= (petIds) => API.post(`/pet/fetchPetsData?petIds=${petIds}`);
export const fetchUsersData= (userIds) => API.get(`/auth/fetchUsersData?userIds=${userIds}`);

export const applyadoptionuser = (userID, formdata) => API.post(`/auth/updateadoptinglist/${userID}`, formdata)
export const applyadoptionpet = (petID, formdata) => API.post(`/pet/updateappliedby/${petID}`, formdata)
export const rejectapplicant = (formData) => API.put(`/auth/rejectApplicant`, formData)
export const enableChat = (formData) => API.put(`/auth/enableChat`, formData)
