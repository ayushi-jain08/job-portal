import React from "react";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Card } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import { AddToSavedJob } from "../../Redux/Slices/Job";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { fetchUserData } from "../../Redux/Slices/User";
import { toast } from "react-toastify";

const JobCard = ({ item, UserAllDetails, path = "login" }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const { currentUser } = users;
  const locations = useLocation();
  const navigate = useNavigate();
  const storedUserInfo = JSON.parse(localStorage.getItem("userDataInfo"));
  const formattedDate = new Date(item.createdAt).toLocaleDateString();
  const Savedjobs = UserAllDetails?.savedjob;
  const isAddedToSaveList = Savedjobs?.includes(item?._id);

  const handleSaveJob = async (jobId) => {
    if (!storedUserInfo || !currentUser) {
      navigate(`/${path}`, {
        state: locations.pathname,
      });
      toast.warning("Please login to save this job");
      return;
    }
    await dispatch(AddToSavedJob(jobId));
    await dispatch(fetchUserData());
  };

  return (
    <>
      <Card className="job-card">
        <div className="job-card-flex">
          <div className="job-icon">
            <WorkIcon />
          </div>
          <div className="details">
            <span className="co-name">{item?.company}</span>
            <NavLink to={`/jobdetail/${item?._id}`}>
              <h2 className="title">{item?.title}</h2>
            </NavLink>
            <div className="sub-details">
              <p>
                <LocationOnIcon />
                {item.location}
              </p>
              <p>
                <AccessTimeIcon />
                {item?.type}
              </p>
              <p>
                <CurrencyRupeeIcon />
                {item?.salary}
              </p>
              <p>
                <CalendarMonthIcon />
                {formattedDate}
              </p>
            </div>
            <span className="desc">{item?.desc}</span>
          </div>
        </div>

        <button className="save-job" onClick={() => handleSaveJob(item?._id)}>
          {isAddedToSaveList ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </button>
      </Card>
    </>
  );
};

export default JobCard;
