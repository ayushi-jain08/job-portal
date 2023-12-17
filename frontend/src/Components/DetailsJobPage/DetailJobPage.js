import React, { useEffect, useState } from "react";
import "./DetailJobPage.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ApplyForJob,
  DeleteJob,
  FetchSingleJobDetails,
  FetchUserAppliedForSingleJob,
} from "../../Redux/Slices/Job";

import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Avatar from "@mui/material/Avatar";
import UserCard from "../AllUsers/UserCard";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../Loading/Loading";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";

const DetailJobPage = ({ path = "login" }) => {
  const locations = useLocation();
  const [reason, setReason] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user);
  const { currentUser } = users;
  const jobs = useSelector((state) => state.job);
  const { singleJobDetail, JobApplication, loading } = jobs;
  const {
    title,
    company,
    experience,
    location,
    salary,
    createdAt,
    applications,
    desc,
    type,
    requirements,
    postedBy,
  } = singleJobDetail;
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  useEffect(() => {
    const fetchSingleDetails = async () => {
      await dispatch(FetchSingleJobDetails(jobId));
    };
    fetchSingleDetails();
  }, [dispatch, jobId]);
  const formattedDate = new Date(createdAt).toLocaleDateString();
  useEffect(() => {
    const fetchJobApplication = async () => {
      if (
        storedUserInfo &&
        currentUser?.otherDeatils?.userType === "employer"
      ) {
        await dispatch(FetchUserAppliedForSingleJob(jobId));
      }
    };
    fetchJobApplication();
    // eslint-disable-next-line
  }, [dispatch, jobId, currentUser]);
  const Appliedjobs = applications?.map((appliedItem) => appliedItem.user);
  const isAddedToWishlist = Appliedjobs?.includes(
    currentUser?.otherDeatils?._id
  );
  const handleApplyJobBtn = async () => {
    if (!storedUserInfo || !currentUser) {
      navigate(`/${path}`, {
        state: locations.pathname,
      });
      toast.warning("Please login to apply for this job");
    }
    handleOpen();
  };
  const handleJobApply = async (e) => {
    e.preventDefault();
    await dispatch(ApplyForJob({ whyHireYou: reason, jobId }));
    await dispatch(FetchSingleJobDetails(jobId));
    handleClose();
    setReason("");
  };
  const handleDelete = async () => {
    await dispatch(DeleteJob(jobId));
    navigate(-1);
  };
  return (
    <div style={{ position: "relative" }}>
      <div className="svg-background">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000b76"
            fillOpacity="0.4"
            d="M0,224L30,229.3C60,235,120,245,180,208C240,171,300,85,360,80C420,75,480,149,540,197.3C600,245,660,267,720,277.3C780,288,840,288,900,250.7C960,213,1020,139,1080,106.7C1140,75,1200,85,1260,122.7C1320,160,1380,224,1410,256L1440,288L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="single-job-detail-container">
        {singleJobDetail ? (
          <div className="single-job-card">
            {loading ? (
              <Loading />
            ) : (
              <>
                <h2 className="title">{title}</h2>
                <div className="content">
                  <p>
                    <HomeRepairServiceIcon />
                    {experience} of experience
                  </p>
                  <p>
                    <LocationOnIcon />
                    {location}
                  </p>
                  <p>
                    <AccountBalanceWalletIcon />
                    {salary}
                  </p>
                  <p>
                    <ApartmentIcon />
                    {company}
                  </p>
                </div>
                <div className="posted-detail">
                  <p>posted on : {formattedDate}</p>
                  {applications?.length < 1 ? (
                    <p>job applicant : 0</p>
                  ) : (
                    <p>job applicant : {applications?.length}</p>
                  )}
                </div>
                <hr />
                <div className="job-description">
                  <h3>Job description</h3>
                  <p>{desc}</p>
                  <p>Employment type : {type}</p>
                </div>
                <hr />
                <div className="requirement">
                  <h3>requirements</h3>
                  <p>
                    {requirements?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </p>
                </div>
                <hr />
                <div className="posted-user">
                  <h2>Posted By -</h2>
                  <div className="sub-user-details">
                    <Avatar
                      src="/broken-image.jpg"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <div>
                      <NavLink to={`/user/${postedBy?._id}`}>
                        <h2>{postedBy?.name}</h2>
                        <p>{postedBy?.email}</p>
                      </NavLink>
                    </div>
                  </div>
                </div>
                {currentUser?.otherDeatils?._id !== postedBy?._id &&
                  (isAddedToWishlist ? (
                    <button disabled className="disabled-btn">
                      Already Applied
                    </button>
                  ) : (
                    <div>
                      <Button onClick={handleApplyJobBtn} className="apply-btn">
                        Apply
                      </Button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <div className="box">
                          <div className="application-modal">
                            <h1>Applying for {title}job</h1>
                            <span>Cover letter</span>
                            <p>why Should you be hired for this role ?</p>
                            <form action="">
                              <textarea
                                onChange={(e) => setReason(e.target.value)}
                              ></textarea>
                              <button type="submit" onClick={handleJobApply}>
                                Submit application
                              </button>
                            </form>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  ))}
              </>
            )}
            {!JobApplication?.length < 1 &&
              currentUser?.otherDeatils?._id === postedBy?._id &&
              currentUser?.otherDeatils?.userType === "employer" && (
                <div className="all-applicant">
                  <h2>All Applicants</h2>

                  {JobApplication?.map((users) => (
                    <UserCard user={users.user} key={users._id} />
                  ))}
                </div>
              )}
            {currentUser?.otherDeatils?._id === postedBy?._id &&
              currentUser?.otherDeatils?.userType === "employer" && (
                <div className="group-btn">
                  <button className="delete-btn" onClick={handleDelete}>
                    {" "}
                    <DeleteIcon />
                    Delete
                  </button>
                  <NavLink to={`/edit/${jobId}`}>
                    <button className="edit-btn">
                      <EditIcon />
                      Edit
                    </button>
                  </NavLink>
                </div>
              )}
          </div>
        ) : (
          <h2>This Job Is Deleted By Employeer</h2>
        )}
      </div>
    </div>
  );
};

export default DetailJobPage;
