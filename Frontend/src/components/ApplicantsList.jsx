// src/ApplicantsList.js
import React, { useEffect, useState } from 'react';
import './styles/ApplicantsList.css'; // Add this CSS file for styling
import pawprint from '../components/img/icon/pawprint.png';
import w_pawprint from '../components/img/icon/w_pawprint.png';
import accept from './img/icon/accept.png'
import reject from './img/icon/reject.png'
import chat from './img/icon/chat.png'
import { useNavigate, useParams } from 'react-router-dom';
import { enableChat, fetchUsersData, fetchpetonclick, fetchprofiledata, rejectapplicant } from '../API/endpoint';

const ApplicantsList = () => {

  const { id } = useParams();
  const navigate = useNavigate()
  const [appliedBy, setAppliedBy] = useState([]);
  const [applicantsdata, setApplicantsData] = useState([]);
  const [isrejecting, setIsRejecting] = useState(false);

  const fetchApplicantIds = async () => {
    try {
      const response = await fetchpetonclick(id)
      setAppliedBy(response.data.appliedBy);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  const fetchSingleApplicantData = async () => {
    try {
      const res = await fetchprofiledata(appliedBy[0].userid);
      const applicant = [res.data.user]
      setApplicantsData(applicant);
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const fetchApplicantsData = async () => {
    if (appliedBy.length > 1) {
      try {
        const userIds = appliedBy.map(item => item.userid);
        const response = await fetchUsersData(userIds.join(','));
        console.log(response.data.users);
        setApplicantsData(response.data.users);
      } catch (error) {
        console.error("Error fetching applicants data:", error);
      }
    }
  };

  const handleEnableChat = async (applicantId) => {
    try {
      const formData = { petId: id, applicantId: applicantId };
      const response = await enableChat(formData);
      if (response.status === 200) {
        alert('Chat enabled successfully');
      }
    } catch (error) {
      console.error('Error enabling chat:', error);
    }
    fetchApplicantIds()
  };

  const handleAccept = async (applicantId) => {
    try {
      setIsRejecting(true)
      const formData = { petId: id, applicantId: applicantId };
      const res = await rejectapplicant(formData)
      if (res.status == 200) {
        fetchApplicantIds();
        alert("Applicant removed successfully")
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
    finally {
      setIsRejecting(false)
    }
  };

  const handleReject = async (applicantId) => {
    try {
      setIsRejecting(true)
      const formData = { petId: id, applicantId: applicantId };
      const res = await rejectapplicant(formData)
      if (res.status == 200) {
        fetchApplicantIds();
        alert("Applicant removed successfully")
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
    finally {
      setIsRejecting(false)
    }
  };

  useEffect(() => {
    fetchApplicantIds();
  }, []);

  useEffect(() => {
    if (appliedBy.length == 1) {
      fetchSingleApplicantData();
    }
    else {
      fetchApplicantsData();
    }
  }, [appliedBy]);

  const getChatButtonProps = (applicantId) => {
    const applicant = appliedBy.find(applicant => applicant.userid === applicantId);
    if (applicant) {
      if (applicant.chatEnabled === "true") {
        return {
          label: "Resume Chat",
          onClick: () => alert('Chat enabled successfully')
          // onClick: () => handleResumeChat(applicantId)
        };
      } else {
        return {
          label: "Enable Chat",
          onClick: () => handleEnableChat(applicantId)
        };
      }
    }
  };


  return (
    <div className="applicants-list">
      <div className="page-title">
        <h2>Adoption Applications</h2>
        <button className='btn' onClick={() => navigate(`/applyadoption/${id}`)}>Go Back</button>
      </div>
      <div className="row justify-content-center">
        {applicantsdata.length > 0 ? (
          applicantsdata.map(applicant => (
            <div key={applicant._id} className="col-lg-4 col-md-6">
              <div className="applicant-card">

                <div className="applicant-info-container">
                  <div className="upper-area">
                    <div className="card-img">
                      <img src={`https://pet-adoption-server-inrv.onrender.com/${applicant.profilephoto}`} alt={applicant.userName} className="profile-photo" />
                    </div>

                    <div className="applicant-details">
                      <h2>{applicant.userName}</h2>
                      <p><strong>Email:</strong> {applicant.email}</p>
                      <p><strong>Phone:</strong> {applicant.phoneNumber}</p>
                      <p><strong>Location:</strong> {applicant.city}({applicant.state})</p>
                    </div>
                  </div>
                  <div className="applicant-actions">
                    <button className="chat-btn" onClick={getChatButtonProps(applicant._id).onClick}><img src={chat} alt="" />
                      {getChatButtonProps(applicant._id).label}
                    </button>
                  </div>
                  <div className="applicant-actions">
                    <button className="accept-btn" onClick={() => handleAccept(applicant._id)}> <img src={accept} alt="" /> Accept</button>
                    <button className="delete-btn" disabled={isrejecting} onClick={() => handleReject(applicant._id)}> <img src={reject} alt="" /> Reject</button>
                  </div>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="col-md-12 text-center">
            <h3>No applicants found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;
