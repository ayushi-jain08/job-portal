import React, { useEffect } from "react";
import "./SingleUser.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "../../Redux/Slices/User";
import userPic from "../../Images/avtar.png";
import { FetchClickedEmployerCreatedJob } from "../../Redux/Slices/Job";
import VerifiedIcon from "@mui/icons-material/Verified";
import JobCard from "../Jobs/JobCard";
import BadgeIcon from "@mui/icons-material/Badge";
import Skeleton from "@mui/material/Skeleton";
import explogo from "../../Images/exp.png";
import SchoolIcon from "@mui/icons-material/School";
import InventoryIcon from "@mui/icons-material/Inventory";

const SingleUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.job);
  const { ClickedEmployerJob } = jobs;
  const users = useSelector((state) => state.user);
  const { SingleUserDetails, loading } = users;
  const { name, email, userType, about, skill, education, experience } =
    SingleUserDetails;
  useEffect(() => {
    dispatch(fetchSingleUser(userId));
    if (SingleUserDetails && SingleUserDetails?.userType === "employer") {
      dispatch(FetchClickedEmployerCreatedJob(userId));
    }
    // eslint-disable-next-line
  }, [dispatch, userId, SingleUserDetails._id]);

  return (
    <div className="single-user">
      <div className="single-user-container">
        <div className="singleuser-top-info">
          {loading ? (
            <div>
              <Skeleton variant="circular" width={60} height={60} />
              <Skeleton
                variant="rectangular"
                width={80}
                height={10}
                style={{ marginTop: "8px" }}
              />
              <Skeleton
                variant="rectangular"
                width={150}
                height={15}
                style={{ marginTop: "5px" }}
              />
              <Skeleton
                variant="rounded"
                width={150}
                height={15}
                style={{ marginTop: "5px" }}
              />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              {userType !== "employer" ? (
                <>
                  {" "}
                  {SingleUserDetails?.pic?.url ? (
                    <div className="user-image">
                      <img src={SingleUserDetails?.pic.url} alt="userpic" />
                    </div>
                  ) : (
                    <div className="user-image">
                      {" "}
                      <img src={userPic} alt="userpic" />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {SingleUserDetails?.pic?.url ? (
                    <div className="user-image">
                      <img src={SingleUserDetails?.pic.url} alt="" />

                      <VerifiedIcon />
                    </div>
                  ) : (
                    <div className="user-image">
                      {" "}
                      <img src={userPic} alt="userpic" />
                      <VerifiedIcon />
                    </div>
                  )}
                </>
              )}
              <h3 className="name">{name}</h3>
              <span className="email">{email}</span>

              {userType !== "jobSeeker" ? (
                <span
                  style={{
                    textTransform: "capitalize",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                  }}
                  className="usertype"
                >
                  <BadgeIcon style={{ color: "rgb(100, 100, 100)" }} />
                  {userType}
                </span>
              ) : (
                <span
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {userType}
                </span>
              )}
            </div>
          )}

          {about && (
            <div className="about-single-user">
              <h6>About</h6>
              {loading ? (
                <Skeleton
                  variant="text"
                  width={250}
                  sx={{ fontSize: "1rem" }}
                  style={{ marginTop: "5px" }}
                />
              ) : (
                <div className="user-about-card">
                  <span>{about}</span>
                </div>
              )}
            </div>
          )}
          {experience?.length > 0 && (
            <div className="experience-single-user">
              <h6>Experience</h6>
              {loading ? (
                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={50}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              ) : (
                <>
                  {experience?.map((exp) => (
                    <div className="user-experience-card" key={exp?._id}>
                      <img
                        src={explogo}
                        alt="experience"
                        width={"50px"}
                        height={"50px"}
                      />
                      <div>
                        <h3>{exp?.title}</h3>
                        <p>{exp?.company}</p>
                        <span>
                          {exp?.from?.month}&nbsp;
                          {exp?.from?.year} - {exp?.to?.toMonth} &nbsp;
                          {exp?.to?.toYear}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
          {education?.length > 0 && (
            <div className="education-single-user">
              <h6>Education</h6>
              {loading ? (
                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={50}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              ) : (
                <>
                  {education?.map((edu) => (
                    <div className="user-education-card" key={edu?._id}>
                      <span>
                        <SchoolIcon />
                      </span>
                      <div>
                        <h3>{edu?.university}</h3>
                        <p>
                          {edu?.degree}( {edu?.field})
                        </p>
                        <span>
                          {edu.startYear}-{edu?.endYear}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
          {skill && (
            <div className="skill-single-user">
              <h6>Skills</h6>
              {loading ? (
                <Skeleton
                  variant="text"
                  width={350}
                  sx={{ fontSize: "1rem" }}
                  style={{ marginTop: "5px" }}
                />
              ) : (
                <div className="user-skill-card">
                  <span>{skill}</span>
                </div>
              )}
            </div>
          )}
        </div>
        <br />
        <hr />
        {userType !== "jobSeeker" && (
          <>
            <div className="job-created-by-employer">
              <h2>Job created by {name}</h2>
              <div className="job-created">
                {ClickedEmployerJob?.length < 1 ? (
                  <h2
                    style={{
                      marginTop: "30px",
                      color: "black",
                      fontWeight: 700,
                    }}
                  >
                    {" "}
                    <InventoryIcon />
                    &nbsp; No Jobs Created
                  </h2>
                ) : (
                  ClickedEmployerJob?.map((item) => (
                    <JobCard key={item._id} item={item} />
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleUser;
