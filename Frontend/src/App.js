import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, matchPath } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Home from "./components/Home";
import PetList from "./pages/PetList";
import Adoption from "./pages/Adoption";
import Signup from "./components/Signup";
import AdoptionForm from "./components/AdoptionForm"
import ContactUs from "./components/ContactUs";
import ProfilePage from "./pages/ProfilePage";
import ApplyAdoption from "./pages/ApplyAdoption";
import AppliedAdoptions from "./components/AppliedAdoption";
import EditAdoptionForm from "./components/EditAdoptionForm";
import MyPets from "./components/MyPets";
import ApplicantsList from "./components/ApplicantsList";
import ManagePet from "./components/ManagePet";

function App1() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [hideHF, setHideHF] = useState(false);
  const [userid, setUserID] = useState(null);

  useEffect(() => {
    setUserID(localStorage.getItem("userID"));
  }, [token]);

  useEffect(() => {
    const isProfilePage = location.pathname.includes("/profile-page");
    setHideHF(
      location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/forgotpassword" ||
        location.pathname.startsWith("/resetpassword/") ||
        isProfilePage
    );
  }, [location]);

  useEffect(() => {
    if (token) {
      navigate(`/`);
    }
  }, []);

  return (
    <>
      {/* {!hidehdrftr && <Header />} */}
      {hideHF == false && <Header id={userid} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/petlist" element={<PetList userid={userid}/>} />
        <Route path="/adoption" element={<Adoption />} />
        <Route path="/adoptionform" element={<AdoptionForm userid={userid}/>} />
        <Route path="/editadoptionform/:id" element={<EditAdoptionForm userid={userid}/>} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/applyadoption/:id" element={<ApplyAdoption userid={userid} />} />
        <Route path="/managepet/:id" element={<ManagePet userid={userid} />} />
        <Route path="/appliedadoptions" element={<AppliedAdoptions userid={userid} />} />
        <Route path="/mypets" element={<MyPets userid={userid} />} />
        <Route path="/applicantlist/:id" element={<ApplicantsList userid={userid} />} />
        <Route path="/profile-page" element={<ProfilePage id={userid} />} />
      </Routes>
      {hideHF == false && <Footer />}
    </>
  );
}
function App() {
  return (
    <>
      <BrowserRouter>
        <App1></App1>
      </BrowserRouter>
    </>
  );
}

export default App;
